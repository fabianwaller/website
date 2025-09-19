import { Button } from "@/components/ui/button";
import Link from "next/link";
import EnterAnimated from "./EnterAnimation";

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
      <EnterAnimated index={startIndex} type="fast">
        <h3>{title}</h3>
      </EnterAnimated>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <EnterAnimated key={index} index={startIndex + 1 + index} type="fast">
            <li>
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
          </EnterAnimated>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
