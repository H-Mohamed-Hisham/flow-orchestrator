import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

// UI
import { Separator } from "@/components/ui/separator";

// Components
import { DesktopSidebar } from "@/components/common/Sidebar";
import { BreadCrumbHeader } from "@/components/common/BreadCrumbHeader";
import { ThemeModeToggle } from "@/components/common/ThemeModeToggle";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[68px] container">
          <BreadCrumbHeader />
          <div className="gap-1 flex items-center">
            <ThemeModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="over-flow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
