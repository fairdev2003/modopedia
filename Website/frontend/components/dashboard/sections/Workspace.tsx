import { useWorkspaceStore } from "@/stores/workspace_store";
import WorkspaceTabs from "../cards/WorkspaceTabs";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useState } from "react";

export default function Workspace() {
  const { workspace, workspaces, setWorkspaces, setWorkspace }: any =
    useWorkspaceStore();

  const [saveIndicator, setSaveIndicator] = useState<string>("Saved");

  const handleWorkspaceChange = async (value: string, name: string) => {
    setSaveIndicator("Not saved yet...");

    setTimeout(async () => {
      setSaveIndicator("Saved");
    }, 2000);

    const workspace_copy = { ...workspace };

    workspace_copy[name] = value;

    await setWorkspace(workspace_copy);

    const workspaces_copy = workspaces.map((w: any) => {
      return w.index === workspace.index ? workspace_copy : w;
    });

    await setWorkspaces(workspaces_copy);
  };

  return (
    <div>
      <h1 className="text-3xl text-white font-[600] ml-1">Workspace</h1>
      <div>
        <WorkspaceTabs></WorkspaceTabs>
        <div className="border-gray-800 border-[1px] h-[100%] w-[100%] mt-5 rounded-md overflow-y-scroll">
          <h1 className="text-white text-2xl font-[600] h-[570px]">
            <div className="flex items-center justify-between m-5">
              <div className="flex gap-4 items-center">
                <h1 className="">
                  {workspaces.length !== 0
                    ? `${workspace.name ? workspace.name : "No workspace selected"}`
                    : "No Workspace Selected"}
                </h1>
                <p
                  className={`${saveIndicator !== "Not saved yet..." ? "text-emerald-600" : "text-red-500"} text-sm flex gap-x-1 items-center`}
                >
                  {saveIndicator !== "Not saved yet..." ? (
                    <Check className="text-emerald-600" />
                  ) : (
                    <X className="text-red-500" />
                  )}{" "}
                  {workspace.name ? saveIndicator : null}
                </p>
              </div>
              <div>
                {workspace.name ? (
                  <X
                    className="cursor-pointer"
                    onClick={async () => {
                      console.log(workspaces);
                      const new_workspaces = workspaces.filter(
                        (w: any) => w.name !== workspace.name,
                      );
                      await setWorkspaces(new_workspaces);
                      await setWorkspace(0);
                    }}
                  />
                ) : null}
              </div>
            </div>
            <Separator orientation="horizontal" className="bg-gray-800" />
            <h1 className="text-white text-[20px] m-5">
              {workspace.description}
            </h1>
            <div className="flex flex-col ml-5 gap-4 text-sm">
              <input
                maxLength={30}
                value={workspace.name}
                placeholder="name"
                className="text-black w-[300px]"
                onChange={(s) => {
                  handleWorkspaceChange(s?.currentTarget?.value, "name");
                }}
              ></input>
              <input
                maxLength={60}
                value={workspace.description}
                placeholder="description"
                className="text-black w-[300px]"
                onChange={(s) => {
                  handleWorkspaceChange(s?.currentTarget?.value, "description");
                }}
              ></input>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
