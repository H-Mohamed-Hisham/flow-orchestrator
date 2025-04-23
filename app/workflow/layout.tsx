import React from "react";

// UI
import { Separator } from "@/components/ui/separator";

// Components
import { Logo } from "@/components/common/Logo";
import { ThemeModeToggle } from "@/components/common/ThemeModeToggle";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ThemeModeToggle />
      </footer>
    </div>
  );
}

export default layout;
