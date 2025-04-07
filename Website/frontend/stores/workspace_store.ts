import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkspaceStore {
  workspace: {};
  workspaces: any[];
}

interface WorkspaceActions {
  setWorkspace: (data: any) => void;
  setWorkspaces: (data: any) => void;
  addWorkspace: (data: any) => void;
}

export const useWorkspaceStore = create<WorkspaceActions & WorkspaceStore>()(
  persist(
    (set) => ({
      workspace: {} as any,
      workspaces: [],
      setWorkspace: async (data: any) => set({ workspace: data }),
      setWorkspaces: async (data: any) => set({ workspaces: data }),
      addWorkspace: async (data: any) => set({ workspaces: [...data] }),
    }),
    {
      name: "workspace-store",
    },
  ),
);
