"use client";

import { useDashboardStore } from "../(stores)/dashboardStore";
import type { PermissionLevel } from "@/lib/types/userTypes";
import { Section } from "../(stores)/types/dashboardTypes";
import { motion } from "framer-motion";

type SectionSelectionComponentProps = {
  sections: Section[];
  className?: string;
  permissionWithAccess: PermissionLevel[];
};

type SectionTileComponentProps = {
  name: string;
  active: boolean;
  onClick: () => void;
};

const SectionSelection = ({
  sections,
  className,
  permissionWithAccess,
}: SectionSelectionComponentProps) => {
  const { setSelectedDashboardSection, selectedDashboardSection } =
    useDashboardStore();

  return (
    <div className="w-full h-auto flex gap-5 justify-start items-end p-4 pb-0 px-10">
      {sections.map((section) => {
        return (
          <>
            {permissionWithAccess.includes(section.accessLevel) ? (
              <SectionTile
                key={section.id}
                name={section.name}
                active={section.tag === selectedDashboardSection}
                onClick={() => setSelectedDashboardSection(section.tag)}
              />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

const SectionTile = ({ name, active, onClick }: SectionTileComponentProps) => {
  const variants = {
    hidden: { width: "0px" },
    visible: { width: "100%", transition: { duration: 0.2 } },
    initial: { width: "0px" },
  };

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="visible"
      className="cursor-pointer group select-none"
      onClick={onClick}
    >
      <h1
        className={`text-2xl font-bold group-hover:text-blue-500 transition-colors  ${
          active ? "text-blue-500" : "text-white"
        }`}
      >
        {name}
      </h1>
      {!active ? (
        <motion.div
          variants={variants}
          exit={{ width: "0px" }}
          className={`h-1 mt-2 w-full mb-1 group-hover:bg-blue-500 transition-opacity bg-blue-500 `}
        ></motion.div>
      ) : (
        <div
          className={`h-1 mt-2 w-full mb-1 group-hover:bg-blue-500 transition-opacity bg-blue-500 `}
        ></div>
      )}
    </motion.div>
  );
};

export default SectionSelection;
