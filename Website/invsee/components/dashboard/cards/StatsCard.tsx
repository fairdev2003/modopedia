import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

import { Cloudinary } from "@cloudinary/url-gen";

const roles_with_access = ["Admin"];

const StatsCard = () => {
  const { language } = usePersistStore();

  const monday = translations[language]["Dashboard"]["Added Chart"]["Monday"];
  const tuesday = translations[language]["Dashboard"]["Added Chart"]["Tuesday"];
  const wednesday =
    translations[language]["Dashboard"]["Added Chart"]["Wednesday"];
  const thursday =
    translations[language]["Dashboard"]["Added Chart"]["Thursday"];
  const friday = translations[language]["Dashboard"]["Added Chart"]["Friday"];
  const saturday =
    translations[language]["Dashboard"]["Added Chart"]["Saturday"];
  const sunday = translations[language]["Dashboard"]["Added Chart"]["Sunday"];

  const modders =
    translations[language]["Dashboard"]["Added Chart"]["Modders added"];
  const items =
    translations[language]["Dashboard"]["Added Chart"]["Items added"];
  const tags = translations[language]["Dashboard"]["Added Chart"]["Tags added"];
  const mods = translations[language]["Dashboard"]["Added Chart"]["Mods added"];

  const cld = new Cloudinary({ cloud: { cloudName: "dzaslaxhw" } });
  const it = cld.image("sample");

  return (
    <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 col-span-2 lg:w-auto md:w-full h-[270px]">
      <CardContent className="flex flex-col gap-y-2">
        <CardTitle className="ml-0">
          {translations[language]["Dashboard"]["Dashboard Stats"]}
        </CardTitle>
        <CardDescription className="ml-0">
          {translations[language]["Dashboard"]["Dashboard Stats desc"]}
        </CardDescription>
        <div className="flex justify-center items-center h-[150px]">
          <Bar
            className="mt-5"
            options={{
              maintainAspectRatio: false,
              backgroundColor: "#3B82F6",
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
            data={{
              labels: [
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
              ],
              datasets: [
                {
                  label: modders,
                  data: [500, 200, 234, 67, 123, 490, 260],
                },
                {
                  label: items,
                  backgroundColor: "#EF4444",
                  data: [420, 120, 280, 50, 110, 310, 190],
                },
                {
                  label: tags,
                  backgroundColor: "#7E22CE",
                  data: [340, 450, 212, 34, 167, 410, 280],
                },
                {
                  label: mods,
                  backgroundColor: "#22C55E",
                  data: [120, 340, 421, 101, 195, 430, 376],
                },
              ],
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
