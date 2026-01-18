"use client";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FolderKanban, House, Newspaper, User, Wrench } from "lucide-react";
import MenuButton from "./MenuButton";

export const navigationItems = [
  {
    href: "/",
    title: "Home",
    icon: <House className="h-full w-full" />,
  },
  {
    href: "/about",
    title: "About",
    icon: <User className="h-full w-full" />,
  },
  {
    href: "/projects",
    title: "Projects",
    icon: <FolderKanban className="h-full w-full" />,
  },
  {
    href: "/uses",
    title: "Uses",
    icon: <Wrench className="h-full w-full" />,
  },
  {
    href: "/blog",
    title: "Blog",
    icon: <Newspaper className="h-full w-full" />,
  },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const pathname = usePathname();

  const [hoveredTab, setHoveredTab] = useState<string>(pathname);
  const clipPathContainerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const container = clipPathContainerRef.current;
    if (!container) return;

    if (!hoveredTab) {
      container.style.clipPath = `inset(0 100% 0 100% round 8px)`;
      return;
    }

    const activeTabElement = activeTabElementRef.current;
    if (!activeTabElement) return;

    const { offsetLeft, offsetWidth } = activeTabElement;
    const clipLeft = offsetLeft;
    const clipRight = offsetLeft + offsetWidth;
    const insetRight = Number(
      100 - (clipRight / container.offsetWidth) * 100,
    ).toFixed();
    const insetLeft = Number(
      (clipLeft / container.offsetWidth) * 100,
    ).toFixed();

    container.style.clipPath = `inset(0 ${insetRight}% 0 ${insetLeft}% round 8px)`;
  }, [hoveredTab]);

  const activeClass = "text-primary";

  return (
    <>
      <NavigationMenu
        className={cn(
          "fixed left-0 right-0 top-0 max-w-full -translate-y-full rounded-b-2xl bg-background p-0 px-6 pb-12 pt-24 opacity-0 shadow-xl backdrop-blur-3xl duration-300 ease-out-expo md:relative md:max-w-fit md:translate-y-0 md:rounded-none md:p-0 md:opacity-100 md:shadow-none md:duration-0",
          "text-title-normal",
          menuOpen ? "translate-y-0 opacity-100 md:relative" : null,
        )}
      >
        <NavigationMenuList
          className={cn(
            "grid w-screen grid-cols-3 gap-x-4 gap-y-4 px-4 md:flex md:w-fit md:gap-0 md:space-x-1 md:p-0",
          )}
        >
          {navigationItems.map((item, index) => (
            <NavigationMenuItem
              key={item.href}
              className="m-0 flex flex-col items-center bg-transparent"
              onMouseEnter={() => setHoveredTab(item.href)}
              onMouseLeave={() => setHoveredTab("")}
              onFocus={() => setHoveredTab(item.href)}
              onBlur={() => setHoveredTab("")}
              aria-hidden={hoveredTab !== item.href}
            >
              <NavigationMenuLink
                href={item.href}
                className={cn([
                  navigationMenuTriggerStyle(),
                  pathname == item.href ? activeClass : null,
                  "flex h-fit flex-col gap-2 bg-transparent",
                ])}
                onClick={() => (menuOpen ? toggleMenu() : null)}
                tabIndex={-1}
              >
                <div className="size-4 sm:size-6 md:hidden">{item.icon}</div>
                {item.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <div
          ref={clipPathContainerRef}
          className={cn(
            "hidden md:block",
            "absolute z-20 w-full overflow-hidden",
            "transition-[clip-path] duration-300 ease-in-out-quad",
          )}
          style={{
            clipPath: "inset(100% 100% 100% 100% round 8px)",
          }}
        >
          <NavigationMenuList
            className={cn(
              "grid w-screen grid-cols-3 gap-x-4 gap-y-4 px-4 md:flex md:w-fit md:gap-0 md:space-x-1 md:p-0",
              "w-full bg-card-foreground",
            )}
          >
            {navigationItems.map((item) => (
              <NavigationMenuItem
                key={item.href}
                className="relative m-0 flex flex-col items-center bg-transparent"
                onMouseEnter={() => setHoveredTab(item.href)}
                onMouseLeave={() => setHoveredTab("")}
                onFocus={() => setHoveredTab(item.href)}
                onBlur={() => setHoveredTab("")}
                ref={hoveredTab === item.href ? activeTabElementRef : null}
                aria-hidden={hoveredTab !== item.href}
              >
                <NavigationMenuLink
                  href={item.href}
                  className={cn([
                    navigationMenuTriggerStyle(),
                    "flex h-fit flex-col gap-2 bg-transparent",
                    "text-primary-foreground underline-offset-4",
                    pathname == item.href ? activeClass : "underline",
                  ])}
                  onClick={() => (menuOpen ? toggleMenu() : null)}
                >
                  <div className="size-4 sm:size-6 md:hidden">{item.icon}</div>
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
}
