import { PermissionLevel } from "@/lib/types/userTypes";

export type Section = {
  id: number;
  name: string;
  tag: string;
  accessLevel: PermissionLevel;
  description: string;
  active: boolean;
};

const sections: Section[] = [
  {
    id: 1,
    name: "Overview",
    tag: "overview",
    accessLevel: "ACCESS_OVERVIEW",
    description: "This is section 1",
    active: false,
  },
  {
    id: 2,
    name: "Mods",
    tag: "mods",
    accessLevel: "ACCESS_MODS",
    description: "This is section 2",
    active: true,
  },
  {
    id: 3,
    tag: "items",
    name: "Items",
    accessLevel: "ACCESS_ITEMS",
    description: "This is section 3",
    active: false,
  },
  {
    id: 3,
    name: "Workspaces",
    tag: "workspaces",
    accessLevel: "ACCESS_WORKSPACES",
    description: "This is section 3",
    active: false,
  },
  {
    id: 3,
    name: "Pending",
    tag: "pending",
    accessLevel: "ACCESS_PENDING",
    description: "This is section 3",
    active: false,
  },
  {
    id: 3,
    name: "User & Roles",
    tag: "user_roles",
    accessLevel: "ACCESS_USER_ROLES",
    description: "This is section 3",
    active: false,
  },
] as const;

type SectionListType = {
  id: number;
  name: string;
  component: JSX.Element;
};

type DashboardTag = (typeof sections)[number]["tag"];

type DashboardActions = {
  setSelectedDashboardSection: (
    value: (typeof sections)[number]["tag"],
  ) => void;

  editDashboardStore: (value: any) => void;
};

type DashboardStore = {
  selectedDashboardSection: string;
};

export type { DashboardActions, DashboardStore, DashboardTag, SectionListType };
export { sections };
