"use server";

import axiosClient from "@/api/fetchClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const FetchMe = (token: string) => {
  return useMutation({
    mutationFn: () => {
      return axiosClient.get("/private/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
