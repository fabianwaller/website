import React from "react";
import Container from "./Container";
import Subtitle from "./ui/Subtitle";
import { cn } from "@/lib/utils";

type SectionProps = {
  name: string;
  title: string;
  subtitle?: string;
  size?: "small" | "normal";
  description?: string;
  headerClassName?: string;
  headerAlign?: "left" | "center";
  children?: React.ReactNode;
  animationIndex?: number;
  disableAnimations?: boolean;
};

export const getAnimationDelay = (index: number, duration = 0.06) => {
  return `${index * duration}s`;
};

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section
      className={cn(
        "w-full py-12 sm:py-16",
        props.size !== "small" &&
          "min-h-[calc(100vh-var(--header-height)-15.25rem)] lg:min-h-[calc(100vh-var(--header-height)-12rem)]",
      )}
      id={props.name}
    >
      <Container className={"mb-10 sm:mb-12"}>
        <div
          className={cn(
            "flex flex-col gap-3",
            props.headerAlign == "left"
              ? "items-start text-left"
              : "items-center text-center",
          )}
        >
          <div
            className={
              props.disableAnimations
                ? ""
                : "motion-safe:animate-appear motion-reduce:animate-appear-reduced"
            }
            style={{
              animationDelay: getAnimationDelay(props.animationIndex ?? 0),
            }}
          >
            {props.size == "small" ? (
              <h3
                className={cn(
                  "mb-0 max-w-2xl text-2xl font-semibold leading-tight text-title-normal sm:text-3xl",
                  props.headerClassName,
                )}
              >
                {props.title}
              </h3>
            ) : (
              <h2
                className={cn(
                  "mb-0 max-w-3xl text-4xl font-semibold leading-tight text-title-normal sm:text-5xl",
                  props.headerClassName,
                )}
              >
                {props.title}
              </h2>
            )}
          </div>
          {props.subtitle && (
            <div
              className={
                props.disableAnimations
                  ? ""
                  : "motion-safe:animate-appear motion-reduce:animate-appear-reduced"
              }
              style={{
                animationDelay: getAnimationDelay(
                  (props.animationIndex ?? 0) + 1,
                ),
              }}
            >
              <Subtitle>{props.subtitle}</Subtitle>
            </div>
          )}
          <div
            className={
              props.disableAnimations
                ? ""
                : "motion-safe:animate-appear motion-reduce:animate-appear-reduced"
            }
            style={{
              animationDelay: getAnimationDelay(
                (props.animationIndex ?? 0) + (props.subtitle ? 2 : 1),
              ),
            }}
          >
            {props.description && (
              <p className="max-w-2xl text-base leading-7 text-text-light">
                {props.description}
              </p>
            )}
          </div>
        </div>
      </Container>

      <Container>{props.children}</Container>
    </section>
  );
};

export default Section;
