import Link from "next/link";
import React from "react";

type LogoProps = {
  white?: boolean;
};

const Logo: React.FC<LogoProps> = ({ white }) => {
  return (
    <Link href="/">
      <span className="text-sm font-semibold tracking-normal text-title-normal">
        Fabian Waller
      </span>
    </Link>
  );
};

export default Logo;
