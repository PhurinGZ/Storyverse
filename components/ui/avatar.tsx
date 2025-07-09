"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// 🟦 แสดงตัวอักษรแรกของชื่อ หรือชื่อเต็มใน fallback
const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? "";
  return (words[0][0] + words[1][0]).toUpperCase();
};

interface CustomAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  name?: string;
  role?: string;
  imageUrl?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  CustomAvatarProps
>(({ className, name, role, imageUrl, ...props }, ref) => (
  <div className="flex items-center gap-3">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      {imageUrl ? (
        <AvatarPrimitive.Image
          src={imageUrl}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center text-sm font-medium text-white bg-blue-500">
          {getInitials(name || "")}
        </AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>

    {/* เพิ่มชื่อและบทบาท */}
    {(name || role) && (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{name}</span>
        {role && <span className="text-xs text-gray-500">{role}</span>}
      </div>
    )}
  </div>
));
Avatar.displayName = "Avatar";

export { Avatar };
