import { MapPin } from "lucide-react";
import Link from "next/link";

import Container from "@/components/Container";
import { Suspense } from "react";
import { CommandMenuButton } from "@/components/CommandMenu";

export default function Home() {
  return (
    <section className="w-full overflow-hidden" id="home">
      <Container className="flex h-auto flex-col justify-center py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-light motion-safe:animate-appear motion-reduce:animate-appear-reduced">
            <MapPin aria-hidden="true" className="size-4" />
            <span>Saarbrücken, Germany</span>
          </div>
          <h1 className="text-4xl font-semibold leading-none text-title-normal motion-safe:animate-appear motion-reduce:animate-appear-reduced md:text-5xl md:text-6xl lg:text-7xl">
            I build digital products
            <br />
            that feel intuitive and are easy to use.
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-text-normal motion-safe:animate-appear motion-reduce:animate-appear-reduced sm:text-lg sm:leading-8 md:text-base">
            <span>Today I work as a UX Software Engineering Intern at </span>
            <Link
              className="font-medium text-title-normal underline underline-offset-2 transition-colors hover:text-primary"
              href="https://ergosign.de/de/"
              target="_blank"
              rel="noreferrer"
            >
              Ergosign
            </Link>
            . I enjoy crafting digital products that people love to use, which
            involves thinking deeply about how they look, feel and behave.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 motion-safe:animate-appear motion-reduce:animate-appear-reduced">
            <Suspense>
              <CommandMenuButton className="px-0 text-text-light" />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
