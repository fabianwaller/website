import { Glow, GlowArea } from "@/components/glow";
import HStack from "@/components/HStack";
import { getAnimationDelay } from "@/components/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import VStack from "@/components/VStack";
import { socialItems } from "@/socialItems";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function Linkpage() {
  const items = [
    ...socialItems,
    {
      href: "/",
      title: "Website",
      icon: <Globe className="h-full w-full" />,
    },
  ];

  return (
    <VStack className="p-8 py-12">
      <div
        className="animate-appear-reduced"
        style={{ animationDelay: getAnimationDelay(items.length) }}
      >
        <Avatar className="mb-8 h-32 w-32 shadow-2xl lg:h-56 lg:w-56">
          <AvatarImage
            src="/images/avatar-zoomed.jpeg"
            className="object-cover"
            alt="@fabianwaller"
          />
          <AvatarFallback>FW</AvatarFallback>
        </Avatar>
      </div>
      <GlowArea
        className={
          "flex w-full flex-col items-center justify-center gap-4 lg:gap-8"
        }
      >
        {items.map((item, index) => (
          <Glow
            key={item.href}
            color="hsl(var(--foreground))"
            className="h-full w-full max-w-lg rounded-lg motion-safe:animate-appear motion-reduce:animate-appear-reduced"
            style={{ animationDelay: getAnimationDelay(index) }}
          >
            <Link href={item.href}>
              <Card className="h-full py-4 shadow-custom-soft hover:shadow-custom-outline lg:py-4">
                <CardContent>
                  <HStack className="items-center">
                    <span className="h-8 w-8">{item.icon}</span>
                    <CardTitle className="m-0">{item.title}</CardTitle>
                  </HStack>
                </CardContent>
              </Card>
            </Link>
          </Glow>
        ))}
      </GlowArea>
    </VStack>
  );
}
