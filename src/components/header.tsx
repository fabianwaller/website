"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Container from "./Container";
import Logo from "@/components/logo";
import { Navigation } from "@/components/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [headerScroll, setHeaderScroll] = useState(false);
  const ticking = useRef(false);

  const breakpoint = 1;

  const updateHeaderScroll = useCallback(() => {
    setHeaderScroll(window.scrollY >= breakpoint);
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateHeaderScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateHeaderScroll]);

  return (
    <header
      className={cn(
        "fixed z-50 w-screen bg-background opacity-95",
        headerScroll && "shadow-sm",
      )}
      id="header"
    >
      <Container>
        <nav className="flex h-header-height items-center justify-between">
          <Logo />

          <Navigation />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
