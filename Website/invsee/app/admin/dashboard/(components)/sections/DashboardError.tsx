import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '../../(stores)/dashboardStore'

type DashboardErrorProps = {
    title?: string
    message?: string
    errorCode?: number
    children?: React.ReactNode
}

const DashboardError = ({
    title = 'No Section Found',
    message = 'This section is still under development',
    errorCode,
    children,
}: DashboardErrorProps) => {
    return (
        <div className="text-white flex flex-col gap-5 items-center justify-center">
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
            >
                <X size={150} color="red" />
            </motion.div>
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <p className="text-md text-center lg:px-auto lg:w-[600px]">
                {message}
            </p>
            {errorCode && (
                <p className="text-md text-center">Error Code: {errorCode}</p>
            )}
            <div>{children}</div>
        </div>
    )
}

export default DashboardError
