import { tool } from 'ai';
import { z } from 'zod';
import { LeaveBalanceResponse, LeaveBalance, LeaveEntitlements, LeaveTypeDefinition, LeaveTypeCode, AttendanceResponse, AttendanceRecord } from '@/lib/types';

const getWeather = tool({
    description: "Get the weather for a location",
    parameters: z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        city: z.string().describe("The city to get the weather for")
    }),
    execute: async ({ latitude, longitude, city }) => {
        try {
            if (!process.env.WEATHER_API_KEY) {
                throw new Error("Missing WEATHER_API_KEY")
            }

            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            })

            if (!response.ok) {
                throw new Error(`Failed to get weather for ${city} , Error Code: ${response.status} , Error Message: ${JSON.stringify(await response.json())}`)
            }

            const data = await response.json();
            console.log(data)

            return data;
        }

        catch (e: any) {

            console.error(e);

            return { "Error": e.message }


        }
    }


})

const getCurrentTime = tool({
    description: "Get the current time",
    parameters: z.object({}),
    execute: async ({ }) => {

        return new Date().toISOString();

    }
})

function generateLeaveEntitlements(maxTotal: number, hasFixed = false): LeaveEntitlements {
    const total = hasFixed ? maxTotal : Math.floor(Math.random() * maxTotal) + 1;
    const used = Math.floor(Math.random() * (total * 0.8));
    const pending = Math.floor(Math.random() * (total * 0.3));
    const reserved = Math.floor(Math.random() * (total * 0.1));
    const available = total - used - pending - reserved;

    return {
        total,
        used,
        pending,
        reserved,
        available: available > 0 ? available : 0
    };
}


const allLeaveTypes: LeaveTypeDefinition[] = [
    {
        externalCode: LeaveTypeCode.ANNUAL,
        timeAccountTypeName: "Annual Leave",
        maxDays: 30,
        isFixed: true
    },
    {
        externalCode: LeaveTypeCode.SICK,
        timeAccountTypeName: "Sick Leave",
        maxDays: 14,
        isFixed: true
    },
    {
        externalCode: LeaveTypeCode.COMPENSATORY,
        timeAccountTypeName: "Compensatory Leave",
        maxDays: 5,
        isFixed: false
    },
    {
        externalCode: LeaveTypeCode.PATERNITY,
        timeAccountTypeName: "Paternity Leave",
        maxDays: 14,
        isFixed: true
    },
    {
        externalCode: LeaveTypeCode.COMPASSIONATE,
        timeAccountTypeName: "Compassionate Leave",
        maxDays: 5,
        isFixed: true
    },
    {
        externalCode: LeaveTypeCode.WORK_FROM_HOME,
        timeAccountTypeName: "Work From Home",
        unlimited: true
    },
    {
        externalCode: LeaveTypeCode.UNPAID,
        timeAccountTypeName: "Unpaid Leave",
        unlimited: true
    },
    {
        externalCode: LeaveTypeCode.STUDY,
        timeAccountTypeName: "Study Leave",
        maxDays: 5,
        isFixed: false
    }
];

const getLeaves = tool({
    description: "Retrieves leave balances and entitlements for an employee from SuccessFactors. Returns leave information including total, used, pending, and available balances for each leave type.",
    parameters: z.object({
        employeeId: z.string().describe("The unique identifier of the employee in SuccessFactors system for whom to retrieve leave balances"),
        leaveTypes: z.array(z.enum([
            'AL', 'SL', 'CL', 'PL', 'COMP', 'WFH', 'UPAL', 'SDY'
        ])).optional().describe(
            "Optional array of leave type codes to filter the results. Available codes are:" +
            "\n- AL: Annual Leave (regular vacation time, typically 30 days per year)" +
            "\n- SL: Sick Leave (for medical appointments and illness, typically 14 days per year)" +
            "\n- CL: Compensatory Leave (time off in lieu of overtime work, typically up to 5 days)" +
            "\n- PL: Paternity Leave (for new fathers, fixed 14 days)" +
            "\n- COMP: Compassionate Leave (for family emergencies or bereavement, typically 5 days)" +
            "\n- WFH: Work From Home (remote work arrangement, unlimited but tracked)" +
            "\n- UPAL: Unpaid Leave (leave without pay, unlimited duration)" +
            "\n- SDY: Study Leave (for examinations or professional development, up to 5 days)" +
            "\nIf not provided, all leave types will be returned." +
            "\nExample: ['AL', 'SL'] will return only Annual and Sick leave balances." +
            "\nNote: Some leave types like WFH and UPAL are unlimited and won't show total/available balances.")
    }),
    execute: async ({ employeeId, leaveTypes }): Promise<LeaveBalanceResponse | { Error: string }> => {

        console.log("employeeId", employeeId);
        console.log("leaveTypes", leaveTypes);

        try {
            const currentDate = new Date();
            const effectiveDate = currentDate.toISOString().split('T')[0];


            const selectedLeaveTypes = leaveTypes && leaveTypes.length > 0
                ? allLeaveTypes.filter(leave => leaveTypes.includes(leave.externalCode))
                : allLeaveTypes;


            const results = selectedLeaveTypes.map(leaveType => {
                const baseLeave: Omit<LeaveBalance, 'entitlements'> = {
                    externalCode: leaveType.externalCode,
                    timeAccountTypeName: leaveType.timeAccountTypeName,
                    bookingEndDate: "2025-12-31",
                    bookingStartDate: "2025-01-01",
                    balanceEffectiveDate: effectiveDate,
                    balance: null,
                    employee: {
                        userId: employeeId
                    },
                    accountClosed: false,
                    timeUnit: "DAYS"
                };

                if (leaveType.unlimited) {
                    return {
                        ...baseLeave,
                        entitlements: {
                            total: null,
                            used: Math.floor(Math.random() * 20),
                            pending: Math.floor(Math.random() * 5),
                            reserved: 0,
                            available: null
                        }
                    };
                } else {
                    return {
                        ...baseLeave,
                        entitlements: generateLeaveEntitlements(leaveType.maxDays!, leaveType.isFixed)
                    };
                }
            });

            console.log(results);

            return {
                d: {
                    results,
                    metadata: {
                        __count: String(results.length)
                    }
                },
            };
        } catch (e: any) {
            console.error(e);
            return { Error: e.message };
        }
    }
});



const getAttendance = tool({
    description: "Retrieves employee attendance records for a specified date range from SuccessFactors. Always use getCurrentTime tool to get the current date and time for accurate results.",
    parameters: z.object({
        employeeId: z.string().describe("The unique identifier of the employee"),
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z.string().describe("End date in YYYY-MM-DD format")
    }),
    execute: async ({ employeeId, startDate, endDate }): Promise<AttendanceResponse | { Error: string }> => {
        try {

            const start = new Date(startDate);
            const end = new Date(endDate);
            const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff > 31) {
                throw new Error("Date range cannot exceed 31 days");
            }

            const results: AttendanceRecord[] = [];
            const currentDate = new Date(start);

            // Generate attendance records for each day
            while (currentDate <= end) {
                const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
                const randomStatus = Math.random();

                let status: AttendanceRecord['status'];
                let checkIn: string | null = null;
                let checkOut: string | null = null;
                let duration: number | null = null;

                if (isWeekend) {
                    status = 'ABSENT';
                } else if (randomStatus < 0.7) { // 70% Present
                    status = 'PRESENT';
                    // Generate random check-in between 8 AM and 10 AM
                    const checkInHour = 8 + Math.floor(Math.random() * 2);
                    const checkInMinute = Math.floor(Math.random() * 60);
                    checkIn = `${String(checkInHour).padStart(2, '0')}:${String(checkInMinute).padStart(2, '0')}`;

                    // Generate random check-out between 4 PM and 7 PM
                    const checkOutHour = 16 + Math.floor(Math.random() * 3);
                    const checkOutMinute = Math.floor(Math.random() * 60);
                    checkOut = `${String(checkOutHour).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')}`;

                    // Calculate duration in minutes
                    duration = (checkOutHour - checkInHour) * 60 + (checkOutMinute - checkInMinute);
                } else if (randomStatus < 0.8) { // 10% Half-day
                    status = 'HALF_DAY';
                    // Only morning check-in
                    const checkInHour = 8 + Math.floor(Math.random() * 2);
                    const checkInMinute = Math.floor(Math.random() * 60);
                    checkIn = `${String(checkInHour).padStart(2, '0')}:${String(checkInMinute).padStart(2, '0')}`;
                    checkOut = '13:00';
                    duration = 240; // 4 hours
                } else if (randomStatus < 0.9) { // 10% WFH
                    status = 'WFH';
                    // Regular timing for WFH
                    checkIn = '09:00';
                    checkOut = '17:00';
                    duration = 480; // 8 hours
                } else { // 10% Absent or On Leave
                    status = Math.random() < 0.5 ? 'ABSENT' : 'ON_LEAVE';
                }

                results.push({
                    date: currentDate.toISOString().split('T')[0],
                    checkIn,
                    checkOut,
                    duration,
                    status,
                    isLate: checkIn ? parseInt(checkIn.split(':')[0]) >= 10 : false,
                    isEarlyDeparture: checkOut ? parseInt(checkOut.split(':')[0]) <= 16 : false,
                    employee: {
                        userId: employeeId
                    }
                });

                // Move to next day
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return {
                d: {
                    results,
                    metadata: {
                        __count: String(results.length)
                    }
                }
            };
        } catch (e: any) {
            console.error(e);
            return { Error: e.message };
        }
    }
});


export const tools = {
    getWeather,
    getCurrentTime,
    getLeaves,
    getAttendance

}
