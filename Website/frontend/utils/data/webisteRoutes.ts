type WebsiteRoute<TData> = {
  id: TData;
  name: string;
  url: string;
  description: string;
};

export const websiteroutes: Partial<WebsiteRoute<number>[]> = [
  {
    id: 1,
    name: "Home",
    url: "/",
    description: "",
  },
  {
    id: 2,
    name: "Admin Dashboard",
    url: "/admin/dashboard",
    description: "",
  },
  {
    id: 3,
    name: "Workspace",
    url: "/admin/workspace",
    description: "",
  },
  {
    id: 3,
    name: "Depreciated Dashboard",
    url: "dashboard?section=overview",
    description: "",
  },
];
