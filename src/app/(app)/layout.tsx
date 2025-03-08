import { AppNavbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getChats } from "./_functions/queries";

interface LayoutProps {
  children: React.ReactNode;
}

async function AppLayout({ children }: LayoutProps) {
  const { chats } = await getChats();

  return (
    <SidebarProvider>
      <AppSidebar chats={chats || []} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <AppNavbar />

        <div className="flex-1 flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
