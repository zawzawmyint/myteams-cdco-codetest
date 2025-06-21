"use client";
import { LoginDialog } from "@/components/generic/LoginDialog";
import Login from "@/components/generic/LoginPage";
import Logo from "@/components/generic/Logo";
import { NavMenus } from "@/components/generic/NavMenus";
import { PlayerProfile } from "@/components/generic/PlayerProfile";
import { Button } from "@/components/ui/button";
import {
  loadLoginFromStorageRedu,
  logout,
} from "@/lib/features/login/loginSlice";
import { loadPlayersFromStorageRedu } from "@/lib/features/players/playersSlice";
import { loadTeamsFromStorageRedu } from "@/lib/features/teams/teamsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { name, isAuthenticated } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  // Load login state on app initialization
  useEffect(() => {
    dispatch(loadLoginFromStorageRedu());
    dispatch(loadTeamsFromStorageRedu());
    dispatch(loadPlayersFromStorageRedu());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };
  return (
    <div className="bg-background sticky z-50 top-0">
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-2">
        <div className="flex gap-3 items-center">
          <Logo />
          <NavMenus />
        </div>
        <div className="flex justify-between items-center gap-5">
          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-3">
              <PlayerProfile name={name} />
              <Button variant={"ghost"} size={"icon"} onClick={handleLogout}>
                <LogOutIcon />
              </Button>
            </div>
          ) : (
            <LoginDialog setIsOpenDialog={setOpen} isOpenDialog={open}>
              <Login setIsOpenDialog={setOpen} />
            </LoginDialog>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
