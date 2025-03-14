"use client"
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type Props ={
    children: React.ReactNode;
}
const layout = ({
children
}: Props) => {
   const [collapsed, setCollapsed] = useState(false);
   const router = useRouter()
    const isLoggedIn = useCurrentUser()
  if(!isLoggedIn){
    router.push("/login")
  }

  return (
    <>
    <div className="min-h-screen  flex ">
      <Sidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main 
          className={cn(
                "flex-1 p-3",
                collapsed ? "md:ml-[70px]" : "md:ml-[250px]"
              )}
      
        >
          {children}
        </main>
      </div>
    </div>
    </>
  )
}

export default layout