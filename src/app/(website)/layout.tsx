import "@/styles/globals.css";
import Header from "@/components/header";
import { CommandMenuProvider } from "@/provider/CommandMenuContext";
import { CommandMenu } from "@/components/CommandMenu";
import Footer from "@/components/Footer";
// import { unstable_ViewTransition as ViewTransition } from "react";
import { Toaster } from "@/components/ui/sonner";
import { commandSearchData } from "@/lib/command-search.server";

export const dynamic = "force-static";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommandMenuProvider>
      <CommandMenu searchData={commandSearchData} />
      <Header />
      {/* <ViewTransition name="page"> */}
      <main className="flex flex-col items-center justify-between pt-header">
        {children}
      </main>
      <Toaster />
      {/* </ViewTransition> */}
      <Footer />
    </CommandMenuProvider>
  );
}
