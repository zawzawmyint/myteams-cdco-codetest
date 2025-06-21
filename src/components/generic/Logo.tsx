import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="text-xl italic font-medium">
      <Link href={"/"}>MyTeam</Link>
    </div>
  );
};

export default Logo;
