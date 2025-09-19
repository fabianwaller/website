import VStack from "@/components/VStack";
import { CommandMenuButton } from "@/components/CommandMenu";
import Container from "@/components/Container";
import HeroBlob from "@/components/heroblob/heroblob";
import { Suspense } from "react";
import { description, title } from "../info";
import EnterAnimated from "@/components/EnterAnimation";

export default function Home() {
  return (
    <section className="w-full" id="home">
      <Container fullScreen>
        <EnterAnimated>
          <HeroBlob />
        </EnterAnimated>
        <VStack className="items-start pb-8">
          <EnterAnimated index={1}>
            <h1>{title}</h1>
          </EnterAnimated>
          <EnterAnimated index={2}>
            <p className="max-w-[35em] leading-relaxed">{description}</p>
          </EnterAnimated>
          <Suspense>
            <EnterAnimated index={3}>
              <CommandMenuButton />
            </EnterAnimated>
          </Suspense>
        </VStack>
      </Container>
    </section>
  );
}
