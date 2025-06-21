"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LoginFormValues,
  TeamFormValues,
} from "@/utils/validation-types/ValidationTypes";
import { UseFormReturn } from "react-hook-form";

const LoginRenderArea = ({
  form,
}: {
  form: UseFormReturn<LoginFormValues>;
}) => {
  return (
    <div className="space-y-3">
      {/* name  */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"User Name"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LoginRenderArea;
