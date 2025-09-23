import VStack from "@/components/VStack";
import { CommandMenuButton } from "@/components/CommandMenu";
import Container from "@/components/Container";
import HeroBlob from "@/components/heroblob/heroblob";
import { Suspense } from "react";
import { description, title } from "../info";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full" id="home">
      <Container fullScreen>
        <HeroBlob />
        <VStack className="items-start pb-8">
          <h1 className="animate-appear">{title}</h1>
          <p className="animate-appear max-w-[35em] leading-relaxed">
            Computer science student at Saarland University obsessed with
            fullstack web development working at{" "}
            <Link href={"https://ergosign.de/de/"}>
              <Button variant="link">Ergosign</Button>
            </Link>
            .
          </p>
          <Suspense>
            <CommandMenuButton />
          </Suspense>
        </VStack>
      </Container>
    </section>
  );
}
