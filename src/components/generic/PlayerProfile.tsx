import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PlayerProfile({
  name,
  profile = "https://github.com/shadcn.png",
}: {
  name: string;
  profile?: string;
}) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-3">
      <Avatar className="rounded-full">
        <AvatarImage src={profile} alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <p className="text-sm">{name}</p>
    </div>
  );
}
