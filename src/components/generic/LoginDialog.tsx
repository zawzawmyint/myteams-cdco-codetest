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

export function LoginDialog({
  children,
  isOpenDialog,
  setIsOpenDialog,
}: {
  children: React.ReactNode;
  isOpenDialog: boolean;
  setIsOpenDialog: (val: boolean) => void;
}) {
  const players = useAppSelector((state) => state.players.players);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size={"default"}>
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Please login to your account to add player to the team or create
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
