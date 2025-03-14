import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const isLoggedIn = await currentUser();
  if (!isLoggedIn) {
    redirect("/login");
  }

  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-[250px]"> {/* Adjust the margin-left to match the sidebar width */}
          <TopBar />
          <main className="flex-1 p-3">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default layout;
