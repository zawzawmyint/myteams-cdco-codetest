"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player, Team } from "@/utils/definitations/definitations";
import { useState } from "react";
import { AddEditDialog } from "../generic/AddEditDialog";
import TeamActions from "./team-acitons/TeamActions";
import TeamEdit from "./team-edit/TeamEdit";
import { PlayersDialog } from "../generic/PlayersDialog";
import { Button } from "../ui/button";
import { Delete, Trash } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { removePlayerFromTeam } from "@/lib/features/teams/teamsSlice";
import { updatePlayer } from "@/lib/features/players/playersSlice";
import { toast } from "sonner";
import { PlayerProfile } from "../generic/PlayerProfile";
import { ScrollArea } from "../ui/scroll-area";

type TeamCardProps = {
  team: Team;
};

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const removeFromTeam = (player: Player) => {
    try {
      // Add player to team
      dispatch(removePlayerFromTeam({ teamId: team.id, playerId: player.id }));

      // Update player with team assignment
      dispatch(
        updatePlayer({
          ...player,
          teamId: null, // Convert to string for consistency
        })
      );

      toast.success("Success", {
        description: `${player.first_name} ${player.last_name} removed from team`,
      });
    } catch (error) {
      console.error("Error removeing player from team:", error);
      toast.error("Error", {
        description: "Failed to remove player from team",
      });
    }
  };
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>
          Region: {team.region} | Country: {team.country}
        </CardDescription>
        <CardAction>
          <AddEditDialog isOpenDialog={open} setIsOpenDialog={setOpen} isEdit>
            <TeamEdit team={team} setIsOpenDialog={setOpen} />
          </AddEditDialog>
        </CardAction>
      </CardHeader>
      <hr />

      <CardContent>
        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="mb-2 font-medium">Players ({team.playerCount}):</p>
          <PlayersDialog teamId={team.id} />
        </div>

        <ScrollArea className="max-h-[200px] h-[200px] w-full overf">
          <ul className=" list-inside space-y-1.5 list-none ">
            {team.players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg"
              >
                <PlayerProfile
                  name={`${player.first_name} ${player.last_name} – ${player.position}`}
                  profile="https://github.com/evilrabbit.png"
                />
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => removeFromTeam(player)}
                >
                  <Trash className="text-red-400" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground flex flex-wrap justify-between items-center gap-3">
        Total Drafted:{" "}
        {team.players.filter((p) => p.draft_year !== null).length}
        <div>
          <TeamActions teamId={team.id} teamPlayers={team.players} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
