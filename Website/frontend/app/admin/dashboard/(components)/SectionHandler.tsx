import DashboardError from "./sections/DashboardError";
import { useEffect } from "react";
import sectionList from "../components";

type SectionHandlerComponentProps = {
  section: string;
};

const SectionHandler = ({ section }: SectionHandlerComponentProps) => {
  useEffect(() => {
    console.log(section);
  });

  const dashboardComponent = sectionList.find(
    (s) => s.name === section,
  )?.component;

  return (
    <div className="section-handler text-white mt-5 p-10 px-20">
      {dashboardComponent ? (
        dashboardComponent
      ) : (
        <DashboardError
          title="Component is not defined in the code"
          message="This section is not defined in the code. Please contact the developer."
        />
      )}
    </div>
  );
};

export default SectionHandler;
