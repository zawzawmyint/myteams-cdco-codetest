import PlayerListSkelenton from "@/components/generic/PlayerListSkelenton";
import BaseContainer from "@/components/global/BaseContainer";
import Players from "@/components/players/Players";
import { Suspense } from "react";

export default function Home() {
  return (
    <BaseContainer>
      <Suspense key={"players"} fallback={<PlayerListSkelenton />}>
        <Players />
      </Suspense>
    </BaseContainer>
  );
}
