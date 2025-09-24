"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VStack from "@/components/VStack";
import HStack from "@/components/HStack";
import Link from "next/link";
import { Calendar, ExternalLink, GitFork, Globe, Star } from "lucide-react";

import { FaGithub as Github } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Glow, GlowArea } from "@/components/glow";
import { getAnimationDelay } from "@/components/Section";

const formatDate = (date: Date) => {
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
};

const ProjectCards = ({ data }: { data: any[] }) => {
  return (
    <GlowArea className={"flex grid-cols-2 flex-col gap-6 md:grid"}>
      {data.map((repo, index) => {
        const topics: any[] = repo.topics;
        return (
          <Glow
            key={repo.full_name}
            color="hsl(var(--foreground))"
            className="motion-reduce:animate-appear-reduced h-full rounded-lg motion-safe:animate-appear"
            style={{
              animationDelay: getAnimationDelay(2 + Math.floor(index / 2)),
            }}
          >
            <Card className="h-full">
              <CardHeader>
                <VStack className="items-start">
                  <div className="pt-2 text-sm text-text-light">
                    {repo.type != "closed" ? (
                      <HStack className="mb-0 gap-2 text-sm">
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </HStack>
                    ) : (
                      <HStack className="mb-0 gap-2 text-sm">
                        <Globe className="h-4 w-4" />
                        <span>Web</span>
                      </HStack>
                    )}
                  </div>
                  <VStack className="items-start" narrow>
                    <CardTitle>{repo.full_name}</CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </VStack>
                  {topics.length > 0 && (
                    <HStack className="gap-2">
                      {topics.map((topic) => (
                        <Badge key={topic} variant={"uncolored"}>
                          {topic}
                        </Badge>
                      ))}
                    </HStack>
                  )}
                </VStack>
              </CardHeader>
              <CardFooter>
                <HStack className="mb-0 h-full w-full items-end">
                  <HStack className="w-full items-center justify-between">
                    <HStack className="gap-4 text-sm text-text-light">
                      {repo.type != "closed" && (
                        <HStack className="gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </HStack>
                      )}
                      {repo.pushed_at && (
                        <HStack className="gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(new Date(repo.pushed_at))}
                        </HStack>
                      )}
                      {repo.fork && (
                        <HStack className="gap-1">
                          <GitFork className="h-4 w-4" />
                        </HStack>
                      )}
                    </HStack>
                    <Link href={repo.html_url} target="_blank">
                      <Button variant={"ghost"} className="left-2 ml-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </HStack>
                </HStack>
              </CardFooter>
            </Card>
          </Glow>
        );
      })}
    </GlowArea>
  );
};

export default ProjectCards;
