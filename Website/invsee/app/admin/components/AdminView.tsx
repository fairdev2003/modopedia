import { motion } from 'framer-motion'
import { UserType } from '@/types/types'
import { protectedContext } from '@/app/admin/components/context/ProtectedContext'
import { useContext } from 'react'
import { useUserStore } from '@/stores/user_store'

const AdminView = () => {
    const { account_data } = useUserStore()

    if (account_data?.role !== 'Admin') {
        return null
    }

    return (
        <motion.div>
            <div className="flex justify-between gap-4 items-center py-3 w-full bg-blue-800 text-white px-10 text-sm">
                <div className="flex gap-4 items-center">
                    <p className="text-lg font-semibold">
                        {AdminView.displayName}
                    </p>
                    <p className="bg-gray-600 p-1 px-4 rounded-md text-gray-300">
                        {account_data.role} View
                    </p>
                </div>
                <div>
                    <p className="flex gap-2 p-1 px-4 rounded-md text-gray-300 items-center">
                        <p>Your current role is</p>
                        <span className="bg-green-500 p-1 rounded-md">
                            {account_data.role}
                        </span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

AdminView.displayName = 'Admin View'

export default AdminView
