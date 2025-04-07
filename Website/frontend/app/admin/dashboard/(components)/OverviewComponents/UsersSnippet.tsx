import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { useDashboardStore } from "../../(stores)/dashboardStore";

const UsersSnippet = ({ users }: { users: any }) => {
  const { setSelectedDashboardSection } = useDashboardStore();

  const loadingBlur = {
    initial: { opacity: 1 },
    animate: { opacity: [0, 100, 0] },
  };

  const { data } = users;

  return (
    <motion.div
      onClick={() => setSelectedDashboardSection("user_roles")}
      variants={loadingBlur}
      initial="initial"
      animate="initial"
      transition={{ repeat: Infinity, duration: 2 }}
      className={cn(
        users.isLoading
          ? `bg-slate-500/20 blur-lg cursor-pointer text-white p-5 rounded-xl`
          : `bg-slate-500/20 cursor-pointer text-white p-5 rounded-xl`,
      )}
    >
      <div className="flex flex-col justify-start gap-3">
        <div className="flex gap-2 items-center">
          <FaUser size={20} />
          <h1 className="font-bold text-2xl">Users</h1>
        </div>
        <div className="flex flex-col gap-y-3 mt-2">
          {data?.map((user) => {
            return (
              <UserRecord
                image={user.image}
                email={user.email}
                firstName={user.firstName}
                nick={user.nick}
              />
            );
          })}
          {users.isLoading &&
            Array.from({ length: 3 }).map((_, index) => {
              return (
                <UserRecord
                  image="https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                  email="marcel@gmail.com"
                  firstName="Marcello"
                  nick="Marcel"
                />
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

const UserRecord = ({
  firstName,
  nick,
  email,
  image,
  children,
}: Pick<User, "firstName" | "nick" | "email" | "image"> & {
  children?: ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3 bg-slate-500/20 p-4 rounded-lg">
      {image && (
        <Image alt={`pfp-${nick}`} src={image} width={45} height={45} />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-md">{firstName}</h1>
        <p className="text-gray-400 text-sm">{email}</p>
      </div>
      {children}
    </div>
  );
};

export default UsersSnippet;
