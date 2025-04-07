"use client";

import { sections } from "./(stores)/types/dashboardTypes";
import { PermissionLevel } from "@/lib/types/userTypes";
import type { DashboardTag } from "./(stores)/types/dashboardTypes";

export type ReturnTypePermissions = {
  tag: string | boolean;
  returnType: string;
  args: PermissionLevel[];
};

export class Auth {
  state: DashboardTag;
  permissions: PermissionLevel[];
  private permissionNeeded: PermissionLevel[] = [];
  private tags: string[] = sections.map((s) => s.tag);

  constructor(state: DashboardTag, permissions: PermissionLevel[]) {
    this.state = state;
    this.permissions = permissions;
  }

  // This function is used to check if the user.ts has the correct permissions to access the dashboard
  // If the user.ts does not have the correct permissions, the user.ts will be redirected to the dashboard_auth_error page
  // If the user.ts does have the correct permissions, the user.ts will be able to access the dashboard
  // Further impelmentation is needed to check if the user.ts has the correct permissions to access the dashboard
  handleNormalSection() {
    console.log(this.tags);

    return this.state;
  }

  // This is core function for other index.ts functions based on PermissionLevel[]
  // If Permission is too low it will return "dashboard_auth_error"
  // If Permission is high enough it will return the section that the user.ts is trying to access filtered by the tag
  checkPermission(section: string, permissions: PermissionLevel[]) {
    if (!section) return false;

    for (const permission of permissions) {
      if (this.permissionNeeded.includes(permission)) {
        permissions.push(permission);
      }
    }

    const dashboard_tag = permissions.includes(
      sections.filter((s) => s.tag === section)[0]?.accessLevel,
    );

    const tag = this.tags.includes(section)
      ? dashboard_tag
      : "dashboard_auth_error";

    return tag;
  }

  // This function is always returning "dashboard_auth_error" as the user.ts does not have the correct permissions to access the dashboard
  // function is based on unauthorized access based on checkPermission() function
  handleAbstractSection() {
    return "dashboard_auth_error";
  }
}
