import { MapPin } from "lucide-react";
import Link from "next/link";

import Container from "@/components/Container";
import { Suspense } from "react";
import { CommandMenuButton } from "@/components/CommandMenu";

export default function Home() {
  return (
    <section className="w-full overflow-hidden" id="home">
      <Container className="flex h-auto flex-col justify-center py-16 md:py-24">
        <div className="max-w-4xl space-y-4 md:space-y-5 lg:space-y-6">
          <div className="text-text-light motion-safe:animate-appear motion-reduce:animate-appear-reduced inline-flex items-center gap-2 text-sm font-medium">
            <MapPin aria-hidden="true" className="size-4" />
            <span>Saarbrücken, Germany</span>
          </div>
          <h1 className="text-title-normal motion-safe:animate-appear motion-reduce:animate-appear-reduced text-3xl leading-none font-semibold md:text-4xl lg:text-5xl">
            I build digital products
            <br />
            that feel intuitive and are easy to use.
          </h1>
          <p className="text-text-normal motion-safe:animate-appear motion-reduce:animate-appear-reduced max-w-2xl text-sm leading-7 sm:text-lg sm:leading-8 md:text-base">
            <span>Today I work as a UX Software Engineering Intern at </span>
            <Link
              className="text-title-normal hover:text-primary font-medium underline underline-offset-2 transition-colors"
              href="https://ergosign.de/de/"
              target="_blank"
              rel="noreferrer"
            >
              Ergosign
            </Link>
            . I enjoy crafting digital products that people love to use, which
            involves thinking deeply about how they look, feel and behave.
          </p>
          <div className="motion-safe:animate-appear motion-reduce:animate-appear-reduced flex flex-wrap items-center gap-4">
            <Suspense>
              <CommandMenuButton className="text-text-light px-0" />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
