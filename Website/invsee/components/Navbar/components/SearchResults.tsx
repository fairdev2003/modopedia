import { AnimatePresence } from "framer-motion";
import ItemRecord from "./ItemRecord";
import ModRecord from "./ModRecord";
import WorkspaceRecord from "./WorkspaceRecord";
import LinkRecord from "./LinkRecord";
import "./externalcss/scrollbar.css";
import { useEffect } from "react";

interface SearchResultsProps {
  data: any;
}

const SearchResults = ({ data }: SearchResultsProps) => {
  useEffect(() => {
    console.log("Component mounted");
  });

  return (
    <div
      className="text-white flex flex-col gap-2 h-[800px] overflow-y-scroll p-2 mb-2"
      id="modal"
    >
      {data && data && data.mods && data.mods.length > 0 && (
        <AnimatePresence>
          <p className="text-gray-400 font-semibold text-lg pl-2">
            Mods Results:
          </p>
          {data.data.mods.map((mod: any, index: number) => {
            return <ModRecord key={mod.id} index={index} mod={mod} />;
          })}
        </AnimatePresence>
      )}

      {data.items && data.items.data && data.items.data.length > 0 && (
        <AnimatePresence>
          <p className="text-gray-400 font-semibold text-lg pl-2">
            Items Results:
          </p>
          {data.items.data.map((item: any, index: number) => {
            return <ItemRecord key={item.id} index={index} item={item} />;
          })}
        </AnimatePresence>
      )}

      {data && data.data && data.data.links && data.data.links.length > 0 && (
        <AnimatePresence>
          <p className="text-gray-400 font-semibold text-lg pl-2">
            Links Results:
          </p>
          {data.data.links.map((link: any, index: number) => {
            return <LinkRecord key={link.id} index={index} link={link} />;
          })}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SearchResults;
