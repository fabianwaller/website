import VStack from "@/components/VStack";
import { CommandMenuButton } from "@/components/CommandMenu";
import Container from "@/components/Container";
import HeroBlob from "@/components/heroblob/heroblob";
import { Suspense } from "react";
import { description, title } from "../info";

export default function Home() {
  return (
    <section className="w-full" id="home">
      <Container fullScreen>
        <HeroBlob />
        <VStack className="animate-enter items-start pb-8">
          <h1>{title}</h1>
          <p className="max-w-[35em] leading-relaxed">{description}</p>
          <Suspense>
            <CommandMenuButton />
          </Suspense>
        </VStack>
      </Container>
    </section>
  );
}
