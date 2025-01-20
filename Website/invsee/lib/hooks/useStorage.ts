"use server";

export const getStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const setStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
