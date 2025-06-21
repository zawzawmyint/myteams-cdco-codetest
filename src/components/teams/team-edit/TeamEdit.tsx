"use client";

import DialogBtnWrapper from "@/components/generic/DialogBtnWrapper";
import DialogCancelButton from "@/components/generic/DialogCancelButton";
import SubmitButton from "@/components/generic/SubmitButton";
import { Form } from "@/components/ui/form";
import { createTeamFormValidationSchema } from "@/utils/validation-schema/team/TeamFormValidationSchema";
// import { createLibraryFormValidationSchema } from "@/utils/validation-schema/library/LibraryFormValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { updateTeam } from "@/lib/features/teams/teamsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Team } from "@/utils/definitations/definitations";
import { toast } from "sonner";
import { z } from "zod";
import TeamRenderArea from "../team-render-area/TeamRenderArea";
// import LibraryRenderArea from "../library-render-area/LibraryRenderArea";
const TeamEdit = ({
  setIsOpenDialog,
  team,
}: {
  setIsOpenDialog?: (val: boolean) => void;
  team: Team;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const TeamFormValidationSchema = createTeamFormValidationSchema();
  const form = useForm<z.infer<typeof TeamFormValidationSchema>>({
    resolver: zodResolver(TeamFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: team.name,
      region: team.region,
      country: team.country,
    },
  });

  const onTeamEditSubmit = async (
    data: z.infer<typeof TeamFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { name, region, country } = data;

      try {
        // Create the updated team object
        const updatedTeam: Team = {
          id: team.id,
          name,
          region,
          country,
          playerCount: team.playerCount,
          players: team.players, // You might want to preserve existing players
          // Add any other required Team properties
        };

        dispatch(updateTeam(updatedTeam));

        toast.success("Success", {
          description: "Team updated successfully",
        });
        setIsOpenDialog?.(false);
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to update team",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onTeamEditSubmit)}>
          {/* tema render area  */}
          <TeamRenderArea form={form} isEdit />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default TeamEdit;
