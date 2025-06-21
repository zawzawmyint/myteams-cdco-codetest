"use client";
import React, { useState } from "react";
import { AddEditDialog } from "./AddEditDialog";
import TeamAdd from "../teams/team-add/TeamAdd";

const PageTopSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between gap-4 items-center h-20">
      <h1>Teams</h1>
      <div>
        <AddEditDialog isOpenDialog={open} setIsOpenDialog={setOpen}>
          <TeamAdd setIsOpenDialog={setOpen} />
        </AddEditDialog>
      </div>
    </div>
  );
};

export default PageTopSection;
