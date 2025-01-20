"use client";

import LogCard from "../cards/LogCard";
import QuickStatsCard from "../cards/QuickStatsCard";
import StatsCard from "../cards/StatsCard";
import { UsersWithAccess } from "../cards/UsersWithAccess";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import UsersCount from "../cards/UsersCount";
import { trpc } from "@/app/_trpc/client";
import { useUserStore } from "@/stores/user_store";
import TrafficCard from "../cards/TrafficCard";
import Notification from "@/app/dashboard/(components)/Notification";

export default function Overview() {
  const { language } = usePersistStore();

  const { account_data } = useUserStore();

  const data = trpc.getOverviewStats.useQuery();
  console.log("trpc", data.data);

  const user = trpc.user.getSingleUser.useMutation({
    onSuccess: () => {
      console.log("User", user.data);
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl text-white font-[600]">
          {translations[language]["Dashboard"]["Hello"]},{" "}
          {account_data && account_data.length > 0
            ? account_data[0].first_name
            : null}{" "}
          👋
        </h1>
      </div>
      <div className="flex flex-col gap-y-3 mt-8">
        <Notification
          title="Happy Hours Out!"
          message="Most waited thing is finally out. Now you are able to not use mobile voice data in hours: 00:00-08:00. Kinda great, isn't it? Get on and get out our happy hour bundle right now!"
          type="success"
        ></Notification>
        <Notification
          title="Database is exploded!"
          message="Unknown intern person just dropped production database. All data from it exploded. At least database managers has other 2 production databases but customers are mad at this moment. There is 3000+ victims in this situation. What happened?. This is i guess, database drop. Why database managers give access to dropping to intern people? i dont know!"
          type="error"
        ></Notification>
      </div>

      <div className="flex flex-col gap-y-5 gap-5 mt-5">
        {!data.isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 place-content-center justify-center flex-wrap w-[100%] gap-5">
            <UsersCount
              card_name="Users"
              count={data.data?.users}
              link="allies"
              animation_duration={0.1}
            />
            <UsersCount
              card_name="Items"
              count={data.data?.items}
              link="items"
              animation_duration={0.2}
            />
            <UsersCount
              card_name="Mods"
              count={data.data?.mods}
              link="mods"
              animation_duration={0.3}
            />
            <UsersCount
              card_name="Wiki Pages"
              count={data.data?.wiki_pages}
              link="allies"
              animation_duration={0.4}
            />
            <UsersCount
              card_name="Authors"
              count={data.data?.users}
              link="allies"
              animation_duration={0.5}
            />
            <UsersCount
              card_name="Tags"
              count={data.data?.tags}
              link="tags"
              animation_duration={0.6}
            />
            <UsersCount
              card_name="Music"
              count={data.data?.music}
              link="allies"
              animation_duration={0.7}
            />
            <UsersCount
              card_name="Crafting"
              count={data.data?.crafting}
              link="crafting"
              animation_duration={0.8}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-x-5">
          <UsersWithAccess />
          <LogCard />
        </div>

        <div className="grid grid-cols-4 gap-x-5">
          <StatsCard />
          <QuickStatsCard />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <TrafficCard />
        </div>
      </div>
    </div>
  );
}
