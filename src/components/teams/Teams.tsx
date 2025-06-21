"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TeamCard from "./TeamCard";
import { useEffect } from "react";
import { loadTeamsFromStorageRedu } from "@/lib/features/teams/teamsSlice";

const Teams = () => {
  const teams = useAppSelector((state) => state.teams.teams);
  const { isAuthenticated } = useAppSelector((state) => state.login);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/");
    toast.error("You must be logged in to view this page");
  }

  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Now displaying data from Redux store instead of props */}
      {teams.map((team) => (
        <div key={team.id} className="relative">
          <TeamCard team={team} />
        </div>
      ))}
    </div>
  );
};

export default Teams;
