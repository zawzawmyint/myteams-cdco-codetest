"use client";
import { updatePlayer } from "@/lib/features/players/playersSlice";
import {
  addPlayerToTeam,
  removePlayerFromTeam,
} from "@/lib/features/teams/teamsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Player } from "@/utils/definitations/definitations";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface PlayerCardProps {
  player: Player;
  teamId?: number | null;
  isTeam?: boolean;
}

export function PlayerCard({
  player,
  teamId = null,
  isTeam = false,
}: PlayerCardProps) {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.teams.teams);

  console.log(player);
  const addToTeam = () => {
    // Check if teamId exists and player is not already on a team
    if (!teamId) {
      toast.error("Error", {
        description: "No team selected",
      });
      return;
    }

    if (player.teamId !== null && player.teamId !== undefined) {
      toast.error("Error", {
        description: "Player is already on a team",
      });
      return;
    }

    try {
      // Add player to team
      dispatch(addPlayerToTeam({ teamId, player }));

      // Update player with team assignment
      dispatch(
        updatePlayer({
          ...player,
          teamId: teamId.toString(), // Convert to string for consistency
        })
      );

      toast.success("Success", {
        description: `${player.first_name} ${player.last_name} added to team`,
      });
    } catch (error) {
      console.error("Error adding player to team:", error);
      toast.error("Error", {
        description: "Failed to add player to team",
      });
    }
  };

  // Check if player is already on a team
  const isPlayerOnTeam = player.teamId !== null && player.teamId !== undefined;
  return (
    <div className="border bg-secondary rounded-lg p-4 shadow-sm w-full">
      <div className="flex justify-center mb-4">
        <Image
          src="https://github.com/evilrabbit.png"
          alt={`${player.first_name} ${player.last_name}`}
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          {player.first_name} {player.last_name}
        </h3>
        {isTeam && teamId && (
          <Button
            variant={"outline"}
            onClick={addToTeam}
            disabled={isPlayerOnTeam}
          >
            {isPlayerOnTeam ? `Already in team` : `Add to team`}
          </Button>
        )}
      </div>
    </div>
  );
}
