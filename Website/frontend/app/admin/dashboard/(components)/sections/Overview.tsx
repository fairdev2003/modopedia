import { useUserStore } from "@/stores/user_store";
import { motion } from "framer-motion";
import UsersSnippet from "../OverviewComponents/UsersSnippet";
import ItemsSnippet from "../OverviewComponents/ItemsSnippet";
import ModsSnippet from "../OverviewComponents/ModsSnippet";
import { trpc } from "@/app/_trpc/client";
import { useEffect } from "react";

const Overview = () => {
  const { account_data } = useUserStore();

  const users = trpc.user.getFirstThreeUsers.useQuery();
  const mods = trpc.mods.getFirstThreeMods.useQuery();
  const items = trpc.items.getFirstThreeItems.useQuery();

  return (
    <div>
      {account_data[0] && account_data.length > 0 ? (
        <h1 className="text-xl text-white font-bold">
          Hello {account_data[0].nick} 👋
        </h1>
      ) : null}
      <div className="grid grid-cols-3 gap-x-4 mt-8">
        <UsersSnippet users={users} />
        <ModsSnippet mods={mods} />
        <ItemsSnippet items={items} />
      </div>
    </div>
  );
};

export default Overview;
