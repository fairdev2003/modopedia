import { Mod } from "@prisma/client";

type WorkspaceActions = {
  setItemWorkspaceState: <WorkspaceKey extends keyof ItemWorkspaceProps>(
    key: WorkspaceKey,
    value: ItemWorkspaceProps[WorkspaceKey],
  ) => void;
  setpage: (data: number | string) => void;
  setErrorExplaination: (message: string, description: string) => void;
  setErrorState: (data: boolean) => void;
  addNewWikiElement: (wikiElement: WikiElement) => void;
  editWikiElement: (index: number, wikiElement: any) => void;
  deleteWikiElement: (index: number) => void;
};

type WorksapceErorr = {
  error: boolean;
  description: string;
  message: string;
};

type ItemTag = {
  id: number;
  tagName: string;
};

type ItemWorkspaceProps = {
  workspaceErorr: WorksapceErorr;
  workspaceName: string;
  itemName: string;
  itemTag: string;
  itemImage: any;
  gallery: string[];
  itemDescription: string;
  materialValue: string;
  wikiElements: WikiElement[];
  modTag?: string;
  itemType: string;
  step: number;
  stackSize: string;
  mod: Omit<Mod, "createdAt" | "updatedAt"> | null;
  itemTags: ItemTag[];
};

enum WorkspaceType {
  Item = "Item",
  Mod = "Mod",
  Wiki = "Wiki",
}

export type WikiElement = {
  title?: string;
  content: string;
  image: string;
  links?: string[];
  id: number;
};

type Workspaces = {
  itemWorkspace: ItemWorkspaceProps;
  page: string;
};

type Workspace = {
  workspace: ItemWorkspaceProps;
  name?: string;
  type: WorkspaceType;
  page: number;
};

export type { WorkspaceActions, ItemWorkspaceProps, Workspace, Workspaces };
