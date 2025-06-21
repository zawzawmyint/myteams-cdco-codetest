"use client";
import { DeleteActionsAlert } from "@/components/generic/DeleteActionAlert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updatePlayer } from "@/lib/features/players/playersSlice";
import { removeTeam } from "@/lib/features/teams/teamsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Player } from "@/utils/definitations/definitations";
import { MoreHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const TeamActions = ({
  teamId,
  teamPlayers,
}: {
  teamId: number;
  teamPlayers: Player[];
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        teamPlayers.forEach((player) => {
          dispatch(
            updatePlayer({
              ...player,
              teamId: null,
            })
          );
        });

        dispatch(removeTeam(teamId));
        toast.success("Success Delete", {
          description: "The team has been successfully deleted.",
        });
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Something went wrong.",
        });
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="h-8 w-8 p-0">
          <p className="sr-only">Open menu</p>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:text-destructive"
          asChild
        >
          <DeleteActionsAlert
            name={"Delete Team"}
            title={"Delete Team"}
            description={"Are you sure you want to delete this team?"}
            handleDelete={handleDelete}
            isPending={isPending}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TeamActions;
