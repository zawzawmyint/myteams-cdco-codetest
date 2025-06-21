"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamFormValues } from "@/utils/validation-types/ValidationTypes";
import { UseFormReturn } from "react-hook-form";

const TeamRenderArea = ({
  form,
  isEdit = false,
}: {
  form: UseFormReturn<TeamFormValues>;
  isEdit?: boolean;
}) => {
  return (
    <div className="space-y-3">
      {/* name  */}
      <FormField
        control={form.control}
        name="name"
        disabled={isEdit}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Team Name"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* region  */}
      <FormField
        control={form.control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Region"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* country  */}
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Country"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TeamRenderArea;
