"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/hooks";
import { Plus, UserPlus } from "lucide-react";
import { PlayerCard } from "../players/PlayerCard";
import { ScrollArea } from "../ui/scroll-area";

export function PlayersDialog({ teamId }: { teamId: string }) {
  const players = useAppSelector((state) => state.players.players);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <UserPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Players</DialogTitle>
            <DialogDescription>
              You can add player to the team
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {players.map((player) => (
                <div key={player.id} className="relative">
                  <PlayerCard player={player} teamId={teamId} isTeam />
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </form>
    </Dialog>
  );
}
