// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import BomFilter from "./dashboard/(routes)/boms/_components/bom-filter";
// import { Suspense } from "react";

// export default function SiteLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const query = new QueryClient()

//   return (
//     // <HydrationBoundary state={dehydrate(query)}>
//       <div className="flex flex-col">

//         {/* Main Content */}
//         <div className="flex-1 flex">{children}</div>
//       </div>
//     // </HydrationBoundary>
//   );
// }
import { AppSidebar } from "@/components/layout/app-sidebar"
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
//import { Provider } from "jotai";
import { cookies } from "next/headers";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    // <Provider>
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <MaxWidthWrapper className="flex flex-1 flex-col p-3">
          <main className='top-0'>
            {children}
          </main>
        </MaxWidthWrapper>
      </SidebarInset>
    </SidebarProvider>
    // </Provider>
  )
}
