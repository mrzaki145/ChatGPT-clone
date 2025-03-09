import { AppNavbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import { getChats } from "./_functions/queries";

interface LayoutProps {
  children: React.ReactNode;
}

async function AppLayout({ children }: LayoutProps) {
  const user = await getUser();
  if (!user) return null;
  const chats = await getChats(user?.id);

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <AppNavbar />

        <div className="flex-1 flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
