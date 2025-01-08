import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Briefcase, HeartPulseIcon as Heartbeat, Home, Book, Heart, Coffee, DollarSign, GraduationCap, Smile } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { LeaveBalanceResponse, LeaveBalance } from "@/lib/types"

function LoadingSkeleton() {
    return (
        <div className="container mx-auto p-6">
            <motion.div
                className="h-9 w-64 bg-neutral-800 rounded mb-6"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Card className="mb-6 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border-neutral-700/50">
                <CardHeader>
                    <CardTitle className="text-zinc-200">Leave Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.div
                                className="h-7 w-20 bg-neutral-800 rounded mb-2"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-5 w-24 bg-neutral-800 rounded"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                        <motion.div
                            className="w-2/3 h-4 bg-neutral-800 rounded-full"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border-neutral-700/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <motion.div
                                className="h-5 w-24 bg-neutral-800 rounded"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-6 w-6 bg-neutral-800 rounded"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </CardHeader>
                        <CardContent>
                            <motion.div
                                className="h-8 w-16 bg-neutral-800 rounded mb-2"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="h-4 w-full bg-neutral-800 rounded mb-4"
                                animate={{ opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="grid grid-cols-2 gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-4 w-full bg-neutral-800 rounded"
                                        animate={{ opacity: [0.3, 0.5, 0.3] }}
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
    "Annual Leave": <Briefcase className="h-6 w-6 text-sky-400" />,
    "Sick Leave": <Heartbeat className="h-6 w-6 text-red-400" />,
    "Compensatory Leave": <Coffee className="h-6 w-6 text-amber-400" />,
    "Paternity Leave": <Heart className="h-6 w-6 text-pink-400" />,
    "Compassionate Leave": <Heart className="h-6 w-6 text-purple-400" />,
    "Work From Home": <Home className="h-6 w-6 text-green-400" />,
    "Unpaid Leave": <DollarSign className="h-6 w-6 text-orange-400" />,
    "Study Leave": <Book className="h-6 w-6 text-blue-400" />,
}

export function LeaveDashboard({ data, isLoading }: { data: LeaveBalanceResponse | null, isLoading: boolean }) {
    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (!data) {
        return <div className="text-zinc-200">No data available</div>
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
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-6 text-zinc-200"
                >
                </motion.div>
                <Card className="mb-6 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-neutral-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-5px_rgba(0,0,0,0.4)]">
                    <CardHeader>
                        <CardTitle className="text-zinc-200">Leave Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-zinc-200">{usedLeaves} / {totalLeaves}</p>
                                <p className="text-sm text-zinc-400">Days Used</p>
                            </div>
                            <div className="w-2/3 bg-neutral-800 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-sky-500"
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

const LeaveCard = motion.create(({ leave }: { leave: LeaveBalance }) => {
    const { total, used, pending, reserved, available } = leave.entitlements
    const progress = total ? (used / total) * 100 : 0

    return (
        <Card className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border border-neutral-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-5px_rgba(0,0,0,0.4)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-200">
                    {leave.timeAccountTypeName}
                </CardTitle>
                {iconMap[leave.timeAccountTypeName] || <Smile className="h-6 w-6 text-zinc-400" />}
            </CardHeader>
            <CardContent>
                <motion.div
                    className="text-2xl font-bold text-zinc-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {available ?? "∞"}
                </motion.div>
                <p className="text-xs text-zinc-400">Available Days</p>
                {total !== null && (
                    <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-800">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progress > 75 ? "bg-red-500/70" :
                                    progress > 50 ? "bg-yellow-500/70" :
                                        "bg-green-500/70"
                                    }`}
                            ></motion.div>
                        </div>
                    </div>
                )}
                <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-zinc-400">
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