import React from "react";
import Container from "./Container";
import Subtitle from "./ui/Subtitle";
import { get } from "http";

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
};

export const getAnimationDelay = (index: number) => {
  return `${index * 0.06}s`;
};

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section className="w-full py-8" id={props.name}>
      <Container className={"mb-12"}>
        <div
          className={props.headerAlign == "left" ? "text-left" : "text-center"}
        >
          <div
            className="animate-enter"
            style={{
              animationDelay: getAnimationDelay(props.animationIndex ?? 0),
            }}
          >
            {props.size == "small" ? (
              <h3 className={props.headerClassName}>{props.title}</h3>
            ) : (
              <h2 className={props.headerClassName}>{props.title}</h2>
            )}
          </div>
          <div
            className="animate-enter"
            style={{
              animationDelay: getAnimationDelay(
                (props.animationIndex ?? 0) + 1,
              ),
            }}
          >
            {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
          </div>
          <div
            className="animate-enter"
            style={{
              animationDelay: getAnimationDelay(
                (props.animationIndex ?? 0) + 2,
              ),
            }}
          >
            {props.description && <p>{props.description}</p>}
          </div>
        </div>
      </Container>

      <Container>{props.children}</Container>
    </section>
  );
};

export default Section;
