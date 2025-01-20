"use client";

import { usePersistStore } from "@/stores/persist_store";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as style } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { translations } from "@/utils/translations";

import "./mainpage_styles.css";

const ApiComponent = () => {
  const { language } = usePersistStore();
  return (
    <div
      className="mt-10 flex flex-col items-center justify-center gap-3 md:scale-[75%] lg:scale-100 w-full"
      id="api_section"
    >
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        {translations[language]["Mainpage"]["ApiSection"]["ApiSectionTitle"]}
      </h1>
      <p className="text-white text-center max-w-[500px]">
        {
          translations[language]["Mainpage"]["ApiSection"][
            "ApiSectionDescription"
          ]
        }
      </p>
      <div className="flex flex-col items-center justify-center gap-y-7">
        <div>
          <h3 className="text-white font-[500]">
            1.{" "}
            {
              translations[language]["Mainpage"]["ApiSection"][
                "Retrieve Player Data"
              ]
            }
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/server/player?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&player_uuid=<PLAYER_UUID>"
            }
          </SyntaxHighlighter>
        </div>
        <div>
          <h3 className="text-white font-[500]">
            2.{" "}
            {
              translations[language]["Mainpage"]["ApiSection"][
                "All players data"
              ]
            }{" "}
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/server/player?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&action=get_all"
            }
          </SyntaxHighlighter>
        </div>
        <div>
          <h3 className="text-white font-[500]">
            3.{" "}
            {
              translations[language]["Mainpage"]["ApiSection"][
                "Get Logistical Storage (AE2, Refined Storage)"
              ]
            }{" "}
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/server/storage?token=<YOUR_TOKEN>&server_token=<SERVER_TOKEN>&player_uuid=<PLAYER_UUID>"
            }
          </SyntaxHighlighter>
        </div>
        <div>
          <h3 className="text-white font-[500]">
            4.{" "}
            {translations[language]["Mainpage"]["ApiSection"]["Get item info"]}{" "}
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/item?token=<YOUR_TOKEN>&item_tag=minecraft:stick"
            }
          </SyntaxHighlighter>
        </div>
        <div>
          <h3 className="text-white font-[500]">
            5.{" "}
            {
              translations[language]["Mainpage"]["ApiSection"][
                "Get author info"
              ]
            }{" "}
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/user.ts?token=<YOUR_TOKEN>&modder_name=thetechnici4n"
            }
          </SyntaxHighlighter>
        </div>
        <div>
          <h3 className="text-white font-[500]">
            6.{" "}
            {translations[language]["Mainpage"]["ApiSection"]["Get mod info"]}{" "}
          </h3>
          <SyntaxHighlighter language="bash" style={style}>
            {
              "https://www.inv-see.com/api/mod?token=<YOUR_TOKEN>&mod_name=applied-energistics-2"
            }
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ApiComponent;
