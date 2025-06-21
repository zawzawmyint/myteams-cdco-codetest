import { fetchAllPlayers } from "@/services/players/playersEndpoints";
import React from "react";
import { PlayerCard } from "./PlayerCard";
import PlayerList from "./PlayerList";

const Players = async () => {
  const res = await fetchAllPlayers();

  return <PlayerList data={res.data} />;
};

export default Players;
