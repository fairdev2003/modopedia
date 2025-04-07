"use client";
import { useWorkspaceStore } from "@/app/admin/workspace/stores/workspaceBroswerData";

const testWorkspaces = [
  {
    name: "Workspace #1",
    active: false,
  },
  {
    name: "Unnamed mod workspace #2",
    active: false,
  },
  {
    name: "Unnamed mod workspace #3",
    active: false,
  },
  {
    name: "Unnamed mod workspace #4",
    active: false,
  },
];

const WorksapcesBar = () => {
  const { workspaceIsSelected } = useWorkspaceStore();

  return (
    <div className="h-auto border-[2px] border-gray-500 p-2 pb-5 w-full rounded-xl">
      <h1 className="text-white text-lg font-semibold mb-2 text-center">
        Workspaces
      </h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {testWorkspaces.map((workspace, index) => {
          return (
            <WorkspaceTab
              key={index}
              name={workspace.name}
              active={workspace.active}
            />
          );
        })}
        <WorkspaceTab name="+" active={!workspaceIsSelected} />;
      </div>
    </div>
  );
};

interface WorkspaceTabProps {
  name: string;
  active: boolean;
}

const WorkspaceTab = ({ name, active }: WorkspaceTabProps) => {
  return (
    <button
      className={`min-w-[100px] truncate p-2 h-[30px] ${
        active
          ? "bg-blue-600 hover:bg-blue-500 text-blue"
          : "bg-white text-black hover:bg-gray-200"
      }  cursor-pointer rounded-md transition-colors  gap-4 flex flex-col justify-center items-center`}
    >
      <h1 className="font-mono text-lg">{name}</h1>
    </button>
  );
};

export default WorksapcesBar;
