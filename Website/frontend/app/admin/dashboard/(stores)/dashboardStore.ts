"use client";

import { create } from "zustand";
import {
  DashboardStore,
  DashboardActions,
  DashboardTag,
} from "./types/dashboardTypes";
import { persist } from "zustand/middleware";

export const useDashboardStore = create<DashboardActions & DashboardStore>()(
  persist(
    (set) => ({
      selectedDashboardSection: "",
      setSelectedDashboardSection: (value: DashboardTag) =>
        set({ selectedDashboardSection: value }),
      editDashboardStore: (value) => set({ ...value }),
    }),
    { name: "dashboard" },
  ),
);
