"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface WikiContentHandlerProps {
  content: string;
  className?: string;
}

export const WikiContentHandler = ({
  content,
  className,
}: WikiContentHandlerProps) => {
  const escapeHtml = (unsafe: string) => {
    return unsafe.replace(/[&<"']/g, (match) => {
      const escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return escape[match as keyof typeof escape] || match;
    });
  };

  const escapedMessage = escapeHtml(content);

  const formattedMessage = escapedMessage
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\|(.*?)\|/g, "<b class='text-blue-500'>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      "<a href='$2' class='text-blue-500 hover:underline font-bold'>$1</a>",
    )
    .replace(/\_\_(.*?)\_\_/g, "<u>$1</u>")
    .replace(/\-\-(.*?)\-\-/g, "<strike>$1</strike>")
    .replace(/\`(.*?)\`/g, "<code>$1</code>")
    .replace(/\{(.*?)\}\[(.*?)\]/g, "<span class='text-$2-500'>$1</span>")
    .replace(/\n/g, "<br>")
    .replace(/\-\-/g, '<span class="my-5">• </span>')
    .replace(/\#(.*?)\#/g, "<span class='text-xl font-bold my-10'>$1</span>");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedMessage }}
      className={cn(className)}
    />
  );
};
