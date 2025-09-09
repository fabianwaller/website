import "@/styles/globals.css";
import Header from "@/components/header";
import { CommandMenuProvider } from "@/provider/CommandMenuContext";
import { Suspense } from "react";
import { CommandMenu } from "@/components/CommandMenu";
import Footer from "@/components/Footer";
import { BlogPostsProvider } from "@/provider/BlogPostsContext";
// import { unstable_ViewTransition as ViewTransition } from "react";
import { getBlogPosts } from "./blog/utils";
import { Toaster } from "@/components/ui/sonner";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogPosts = await getBlogPosts();
  return (
    <CommandMenuProvider>
      <BlogPostsProvider blogPosts={blogPosts}>
        <Suspense>
          <CommandMenu />
        </Suspense>
        <Header />
        {/* <ViewTransition name="page"> */}
        <main className="flex flex-col items-center justify-between pt-header">
          {children}
        </main>
        <Toaster />
        {/* </ViewTransition> */}
        <Footer />
      </BlogPostsProvider>
    </CommandMenuProvider>
  );
}
