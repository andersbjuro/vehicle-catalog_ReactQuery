import { AppSidebar } from "@/components/layout/app-sidebar"
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <MaxWidthWrapper className="flex flex-1 flex-col p-3" large>
          <main className='top-0'>
            {children}
          </main>
        </MaxWidthWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}
