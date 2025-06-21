"use client";
import { Player } from "@/utils/definitations/definitations";
import React, { useEffect } from "react";
import { PlayerCard } from "./PlayerCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPlayers } from "@/lib/features/players/playersSlice";

const PlayerList = ({ data }: { data: Player[] }) => {
  // The `state` arg is correctly typed as `RootState` already
  const players = useAppSelector((state) => state.players.players);
  const dispatch = useAppDispatch();

  // Dispatch the data to the Redux store when component mounts or data changes
  useEffect(() => {
    if (data && data.length > 0 && !players) {
      dispatch(setPlayers(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Now displaying data from Redux store instead of props */}
        {players.map((player) => (
          <div key={player.id} className="relative">
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
