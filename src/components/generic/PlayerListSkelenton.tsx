import React from "react";
import { Skeleton } from "../ui/skeleton";

const PlayerListSkelenton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="border p-2 space-y-3 m-2">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[10px] w-full rounded-lg" />
          <Skeleton className="h-[10px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default PlayerListSkelenton;
