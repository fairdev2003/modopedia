import { useWorkspaceStore } from "../../stores/workspaceBroswerData";

const ModWorkspace = () => {
  const { setItemWorkspaceState } = useWorkspaceStore();

  return (
    <div>
      <h1 className="text-white">Mod Workspace</h1>
    </div>
  );
};

export default ModWorkspace;
