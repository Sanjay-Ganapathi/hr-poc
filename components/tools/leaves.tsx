import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Briefcase, HeartPulseIcon as Heartbeat, Home, Book, Heart, Coffee, DollarSign, GraduationCap, Smile } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { LeaveBalanceResponse, LeaveBalance } from "@/lib/types"

function LoadingSkeleton() {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                className="h-9 w-64 bg-gray-200 rounded mb-6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Leave Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.div
                                className="h-7 w-20 bg-gray-200 rounded mb-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-5 w-24 bg-gray-200 rounded"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                        <motion.div
                            className="w-2/3 h-4 bg-gray-200 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <motion.div
                                className="h-5 w-24 bg-gray-200 rounded"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-6 w-6 bg-gray-200 rounded"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </CardHeader>
                        <CardContent>
                            <motion.div
                                className="h-8 w-16 bg-gray-200 rounded mb-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-4 w-full bg-gray-200 rounded mb-4"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="grid grid-cols-2 gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-4 w-full bg-gray-200 rounded"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


const iconMap: Record<string, React.ReactNode> = {
    "Annual Leave": <Briefcase className="h-6 w-6" />,
    "Sick Leave": <Heartbeat className="h-6 w-6" />,
    "Compensatory Leave": <Coffee className="h-6 w-6" />,
    "Paternity Leave": <Heart className="h-6 w-6" />,
    "Compassionate Leave": <Heart className="h-6 w-6" />,
    "Work From Home": <Home className="h-6 w-6" />,
    "Unpaid Leave": <DollarSign className="h-6 w-6" />,
    "Study Leave": <Book className="h-6 w-6" />,
}

export function LeaveDashboard({ data, isLoading }: { data: LeaveBalanceResponse | null, isLoading: boolean }) {
    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (!data) {
        return <div>No data available</div>
    }

    const leaveTypes = data.d.results

    const totalLeaves = leaveTypes.reduce((acc, leave) => acc + (leave.entitlements.total || 0), 0)
    const usedLeaves = leaveTypes.reduce((acc, leave) => acc + (leave.entitlements.used || 0), 0)

    return (
        <AnimatePresence>
            <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto p-6"
            >
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-6"
                >
                    Leave Dashboard
                </motion.h1>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Leave Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">{usedLeaves} / {totalLeaves}</p>
                                <p className="text-sm text-muted-foreground">Days Used</p>
                            </div>
                            <div className="w-2/3 bg-gray-200 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(usedLeaves / totalLeaves) * 100}%` }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {leaveTypes.map((leave) => (
                        <LeaveCard key={leave.externalCode} leave={leave} />
                    ))}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

const LeaveCard = motion(({ leave }: { leave: LeaveBalance }) => {
    const { total, used, pending, reserved, available } = leave.entitlements
    const progress = total ? (used / total) * 100 : 0

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {leave.timeAccountTypeName}
                </CardTitle>
                {iconMap[leave.timeAccountTypeName] || <Smile className="h-6 w-6" />}
            </CardHeader>
            <CardContent>
                <motion.div
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {available ?? "∞"}
                </motion.div>
                <p className="text-xs text-muted-foreground">Available Days</p>
                {total !== null && (
                    <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progress > 75 ? "bg-red-500" :
                                    progress > 50 ? "bg-yellow-500" :
                                        "bg-green-500"
                                    }`}
                            ></motion.div>
                        </div>
                    </div>
                )}
                <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                    <div>Total: {total ?? "∞"}</div>
                    <div>Used: {used}</div>
                    <div>Pending: {pending}</div>
                    <div>Reserved: {reserved}</div>
                </div>
            </CardContent>
        </Card>
    )
})

LeaveCard.displayName = 'LeaveCard'

