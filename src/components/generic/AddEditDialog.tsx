import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

export function AddEditDialog({
  children,
  isEdit = false,
  isOpenDialog,
  setIsOpenDialog,
}: {
  children: React.ReactNode;
  isEdit?: boolean;
  isOpenDialog: boolean;
  setIsOpenDialog: (val: boolean) => void;
}) {
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <form>
        <DialogTrigger asChild>
          {isEdit ? (
            <Button variant="outline" size={"icon"}>
              <Edit />
            </Button>
          ) : (
            <Button variant="default">Create Team</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> {isEdit ? "Edit Team" : "Create Team"} </DialogTitle>
            <DialogDescription>
              Make changes to your team here. Click submit when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
