import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAnimationDelay } from "./Section";

export type itemsType = {
  href?: string;
  title: string;
  description: string;
}[];

const ItemList = ({
  title,
  items,
  startIndex,
}: {
  title: string;
  items: itemsType;
  startIndex: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3
        className="motion-reduce:animate-appear-reduced motion-safe:animate-appear"
        style={{ animationDelay: getAnimationDelay(startIndex, 0.03) }}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="motion-reduce:animate-appear-reduced motion-safe:animate-appear"
            style={{
              animationDelay: getAnimationDelay(1 + startIndex + index, 0.03),
            }}
          >
            {item.href ? (
              <Link href={item.href} target="_blank">
                <Button
                  variant={"link"}
                  className="ml-auto whitespace-normal break-words text-left"
                >
                  <b>{item.title}</b>
                </Button>
              </Link>
            ) : (
              <b>{item.title}</b>
            )}{" "}
            - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
