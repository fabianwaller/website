"use client";

import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialItems } from "@/socialItems";
import { getAnimationDelay } from "./Section";

const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname == "/") {
    return null;
  }

  return (
    <footer
      className="relative mt-8 animate-appear-reduced"
      style={{ animationDelay: getAnimationDelay(8) }}
    >
      <div className="rounded-t-xl border-t-1 border-solid py-16">
        <Container className="grid gap-y-14">
          {/* <div>
            <Logo />
          </div>

          <div className="grid grid-cols-2-max gap-x-16">
            <div className="flex flex-col gap-y-4">
              <span className="mb-4 block text-lg font-semibold">Links</span>
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="hover:text-primary hover:underline">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex gap-6 text-xl">
              {socialItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.blank ? "_blank" : "_self"}
                  className="h-8 w-8 hover:text-primary"
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            <span className="text-left text-sm text-text-light">
              &#169; Fabian Waller. All rights reserved.
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
