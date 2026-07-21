import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { CommandMenuButton } from "@/components/CommandMenu";

export default function Home() {
  return (
    <section className="w-full" id="home">
      <Container className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center pb-20 pt-16 sm:pb-24 sm:pt-24">
        <div className="max-w-[42rem]">
          <div className="mb-8 flex items-center gap-2 text-sm text-text-light motion-safe:animate-appear motion-reduce:animate-appear-reduced">
            <MapPin aria-hidden="true" className="size-4" />
            <span>Saarbrücken, Germany</span>
          </div>

          <h1 className="text-[clamp(3rem,10vw,5rem)] font-semibold tracking-tight motion-safe:animate-appear motion-reduce:animate-appear-reduced">
            I build human-centered digital products that feel intuitive, and
            easy to use.
          </h1>

          <p className="mt-8 max-w-[39rem] text-lg leading-[1.75] text-text-light motion-safe:animate-appear motion-reduce:animate-appear-reduced sm:text-xl">
            Today I work as UX Software Engineering Intern at{" "}
            <Link
              className="font-medium text-title-normal underline underline-offset-2 transition-colors hover:text-primary"
              href="https://ergosign.de/de/"
              target="_blank"
              rel="noreferrer"
            >
              Ergosign
            </Link>
            . I like to craft products that people love to use by thinking
            deeply about how it looks, feels and behaves.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 motion-safe:animate-appear motion-reduce:animate-appear-reduced">
            <Suspense>
              <CommandMenuButton className="relative -left-6" />
            </Suspense>
            {/* <Button asChild size="lg" variant="secondary">
              <Link href="/projects">
                See my work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">Start a conversation</Link>
            </Button> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
