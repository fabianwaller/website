"use client";

import { ArrowRight, CommandIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCommandMenu } from "@/provider/CommandMenuContext";
import { navigationItems } from "@/components/navigation";
import { motion } from "framer-motion";
import { socialItems } from "@/socialItems";
import type { CommandSearchData } from "@/lib/command-search";
import {
  loadCommandSearchIndex,
  searchCommandDocuments,
} from "@/lib/command-search";

type InputMode = "mobile" | "mac" | "other";

const subscribeToInputMode = () => () => {};

function getInputMode(): InputMode {
  if (/iPhone|iPad|Android/i.test(window.navigator.userAgent)) return "mobile";
  if (/Mac/i.test(window.navigator.userAgent)) return "mac";
  return "other";
}

const getServerInputMode = (): InputMode => "mobile";

export function CommandMenuButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { toggle } = useCommandMenu();
  const inputMode = useSyncExternalStore(
    subscribeToInputMode,
    getInputMode,
    getServerInputMode,
  );
  const isMobile = inputMode === "mobile";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
    >
      <Button variant="ghost" size="lg" {...props}>
        <div
          className="flex items-center font-medium hover:animate-none motion-safe:animate-in"
          onClick={toggle}
        >
          <span>{isMobile ? "Tap" : "Press"}</span>
          {!isMobile && (
            <>
              <div className="mx-2 flex h-5 w-5 items-center">
                {inputMode === "mac" ? <CommandIcon /> : <span>ctrl</span>}
              </div>
              <span>K</span>
            </>
          )}
          <span className="ml-2">to interact</span>
          <span className="ml-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
            >
              <ArrowRight />
            </motion.div>
          </span>
        </div>
      </Button>
    </motion.div>
  );
}

export function CommandMenu({ searchData }: { searchData: CommandSearchData }) {
  const router = useRouter();

  const { open, toggle } = useCommandMenu();

  const [search, setSearch] = useState("");
  const trimmedSearch = search.trim();

  const commandSearchIndex = useMemo(
    () => loadCommandSearchIndex(searchData),
    [searchData],
  );

  const rankedDocuments = useMemo(
    () => searchCommandDocuments(commandSearchIndex, trimmedSearch),
    [commandSearchIndex, trimmedSearch],
  );
  const rankedBlogPosts = rankedDocuments.filter(
    (document) => document.type === "blog",
  );
  const rankedProjects = rankedDocuments.filter(
    (document) => document.type === "project",
  );

  const handleSelect = (path: string, external: boolean | undefined) => {
    toggle();
    if (external) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(path);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return (
    <div className="space-y-4">
      <CommandDialog open={open} onOpenChange={toggle} shouldFilter={false}>
        <CommandInput
          placeholder="Search for anything"
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!trimmedSearch && (
            <>
              <CommandGroup heading="Links">
                {navigationItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => handleSelect(item.href, false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="External">
                {socialItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => handleSelect(item.href, item.blank)}
                  >
                    {item.icon}
                    <span>{item.titleShort ?? item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {rankedBlogPosts.length > 0 && (
            <CommandGroup heading="Blog">
              {rankedBlogPosts.map((post) => (
                <CommandItem
                  key={post.href}
                  value={post.title}
                  onSelect={() => handleSelect(post.href, post.external)}
                >
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {rankedProjects.length > 0 && (
            <>
              <CommandGroup heading="Projects">
                {rankedProjects.map((project) => (
                  <CommandItem
                    key={project.href}
                    value={project.title}
                    onSelect={() =>
                      handleSelect(project.href, project.external)
                    }
                  >
                    <span>{project.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
