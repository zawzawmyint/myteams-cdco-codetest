"use client";

import DialogBtnWrapper from "@/components/generic/DialogBtnWrapper";
import DialogCancelButton from "@/components/generic/DialogCancelButton";
import SubmitButton from "@/components/generic/SubmitButton";
import { Form } from "@/components/ui/form";
import { createTeamFormValidationSchema } from "@/utils/validation-schema/team/TeamFormValidationSchema";
// import { createLibraryFormValidationSchema } from "@/utils/validation-schema/library/LibraryFormValidationSchema";
import { addTeam } from "@/lib/features/teams/teamsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Team } from "@/utils/definitations/definitations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TeamRenderArea from "../team-render-area/TeamRenderArea";
// import LibraryRenderArea from "../library-render-area/LibraryRenderArea";
const TeamAdd = ({
  setIsOpenDialog,
}: {
  setIsOpenDialog?: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const teams = useAppSelector((state) => state.teams.teams);

  const TeamFormValidationSchema = createTeamFormValidationSchema();
  const form = useForm<z.infer<typeof TeamFormValidationSchema>>({
    resolver: zodResolver(TeamFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      region: "",
      country: "",
    },
  });

  // Solution 1: Generate ID in the component
  const onTeamAddSubmit = async (
    data: z.infer<typeof TeamFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { name, region, country } = data;
      const index = teams.findIndex(
        (team) => team.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      if (index !== -1) {
        console.log("Team already exists");
        toast.error("Error", {
          description: "Team already exists",
        });
        return;
      }
      try {
        // Generate a unique ID (you can use uuid, timestamp, or any other method)
        const newTeam: Team = {
          id: Date.now(), // or crypto.randomUUID() if available
          name,
          region,
          country,
          playerCount: 0,
          players: [], // Initialize empty players array if needed
        };

        dispatch(addTeam(newTeam));

        toast.success("Success", {
          description: "Team added successfully",
        });
        setIsOpenDialog?.(false);
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to add team",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onTeamAddSubmit)}>
          {/* tema render area  */}
          <TeamRenderArea form={form} />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default TeamAdd;
