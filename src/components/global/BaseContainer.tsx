import React from "react";

const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return <section className="max-w-7xl mx-auto my-5 p-3">{children}</section>;
};

export default BaseContainer;
