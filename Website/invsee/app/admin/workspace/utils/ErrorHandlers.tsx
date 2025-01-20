"use client";

export const ItemTagError = (tag: string) => {
  return {
    error: true,
    message: "Item Tag Error",
    description: `The item tag ${tag} already exists`,
  };
};

export const ItemNameError = (name: string) => {
  return {
    error: true,
    message: "Item Name Error",
    description: `The item name ${name} already exists`,
  };
};
