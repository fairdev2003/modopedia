const PermissionLevels = [
  {
    pName: "Admin",
    pCode: "ADMIN",
    pDescription: "Can do anything",
  },
  {
    pName: "Can View",
    pCode: "CAN_VIEW",
    pDescription: "Can view the data but cannot edit or delete",
  },
  {
    pName: "Can Edit",
    pCode: "CAN_EDIT",
    pDescription: "Can view and edit the data but cannot delete",
  },
  {
    pName: "Can Delete",
    pCode: "CAN_DELETE",
    pDescription: "Can view, edit and delete the data",
  },
  {
    pName: "Access Overview",
    pCode: "ACCESS_OVERVIEW",
    pDescription: "Access to the overview page",
  },
  {
    pName: "Access Mods",
    pCode: "ACCESS_MODS",
    pDescription: "Access to the mods page",
  },
  {
    pName: "Access Workspaces",
    pCode: "ACCESS_WORKSPACES",
    pDescription: "Access to the workspaces page",
  },
  {
    pName: "Access Pending",
    pCode: "ACCESS_PENDING",
    pDescription: "Access to the pending page",
  },
  {
    pName: "Access User Roles",
    pCode: "ACCESS_USER_ROLES",
    pDescription: "Access to the user.ts roles page",
  },
  {
    pName: "Access Items",
    pCode: "ACCESS_ITEMS",
    pDescription: "Access to the items page",
  },
  {
    pName: "Access Settings",
    pCode: "ACCESS_SETTINGS",
    pDescription: "Access to the settings page",
  },
  {
    pName: "Access Profile",
    pCode: "ACCESS_PROFILE",
    pDescription: "Access to the profile page",
  },
  {
    pName: "Access Notification",
    pCode: "ACCESS_NOTIFICATION",
    pDescription: "Access to the notification page",
  },
  {
    pName: "Access Logs",
    pCode: "ACCESS_LOGS",
    pDescription: "Access to the logs page",
  },
  {
    pName: "Access Reports",
    pCode: "ACCESS_REPORTS",
    pDescription: "Access to the reports page",
  },
  {
    pName: "Access Dashboard",
    pCode: "ACCESS_DASHBOARD",
    pDescription: "Access to the dashboard page",
  },
  {
    pName: "Access Chat",
    pCode: "ACCESS_CHAT",
    pDescription: "Access to the chat page",
  },
  {
    pName: "Access Calendar",
    pCode: "ACCESS_CALENDAR",
    pDescription: "Access to the calendar page",
  },
  {
    pName: "Access Inbox",
    pCode: "ACCESS_INBOX",
    pDescription: "Access to the inbox page",
  },
  {
    pName: "Access File Manager",
    pCode: "ACCESS_FILE_MANAGER",
    pDescription: "Access to the file manager page",
  },
  {
    pName: "Access E-commerce",
    pCode: "ACCESS_E_COMMERCE",
    pDescription: "Access to the e-commerce page",
  },
] as const;

type PermissionLevel = (typeof PermissionLevels)[number]["pCode"];

type User = {
  id: number;
  name: string;
  email: string;
  role: Role[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updatedBy: User;
  isDeleted: boolean;
};

type Role = {
  id: number;
  name: string;
  description: string;
  createdBy: User;
  permissions: PermissionLevel[];
};

export type { PermissionLevel, User, Role };
