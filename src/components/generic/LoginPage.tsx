"use client";

import DialogBtnWrapper from "@/components/generic/DialogBtnWrapper";
import DialogCancelButton from "@/components/generic/DialogCancelButton";
import SubmitButton from "@/components/generic/SubmitButton";
import { Form } from "@/components/ui/form";
import { login } from "@/lib/features/login/loginSlice";
import { useAppDispatch } from "@/lib/hooks";
import { createLoginFormValidationSchema } from "@/utils/validation-schema/LoginFormValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoginRenderArea from "../login/LoginRenderArea";
const Login = ({
  setIsOpenDialog,
}: {
  setIsOpenDialog?: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginFormValidationSchema = createLoginFormValidationSchema();
  const form = useForm<z.infer<typeof LoginFormValidationSchema>>({
    resolver: zodResolver(LoginFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
    },
  });

  // Solution 1: Generate ID in the component
  const onLoginSubmit = async (
    data: z.infer<typeof LoginFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { name } = data;
      try {
        dispatch(login(name));
        toast.success("Success", {
          description: "Login successfully",
        });
        setIsOpenDialog?.(false);
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to login please try again later",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)}>
          {/* login render area  */}
          <LoginRenderArea form={form} />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default Login;
