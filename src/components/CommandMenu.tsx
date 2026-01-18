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

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCommandMenu } from "@/provider/CommandMenuContext";
import { navigationItems } from "@/components/navigation";
import { useBlogPosts } from "@/provider/BlogPostsContext";
import { motion } from "framer-motion";
import { socialItems } from "@/socialItems";

export function CommandMenuButton() {
  const { toggle } = useCommandMenu();

  const [action, setAction] = useState("Tap ");
  const [cmd, setCmd] = useState<React.ReactNode>(null);
  const [hotkey, setHotkey] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMac = /(Mac)/i.test(window.navigator.userAgent);
    const isMobile = /iPhone|iPad|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
      setAction("Tap ");
    } else {
      setAction("Press ");
      if (isMac) {
        setCmd(<CommandIcon />);
      } else {
        setCmd(<span>ctrl</span>);
      }
      setHotkey(<span>K</span>);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
    >
      <Button
        variant="ghost"
        className="relative -left-4"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="flex items-center font-medium hover:animate-none motion-safe:animate-in">
          <span>{action}</span>
          {cmd && hotkey && (
            <>
              <div className="mx-2 flex h-5 w-5 items-center">{cmd}</div>
              {hotkey}
            </>
          )}
          <span className="ml-2">for shortcuts</span>
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

export function CommandMenu() {
  const router = useRouter();

  const { open, toggle } = useCommandMenu();

  const { blogPosts } = useBlogPosts();

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
      <CommandDialog open={open} onOpenChange={toggle}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
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
          <CommandGroup heading="Blog">
            {blogPosts.map((post) => (
              <CommandItem
                key={post.slug}
                onSelect={() => handleSelect(`/blog/${post.slug}`, false)}
              >
                <span>{post.metadata.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
