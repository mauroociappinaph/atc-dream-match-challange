import PlayerList from "@/components/player-list";
import TeamForm from "@/components/teamform";
import TeamList from "@/components/team-list";
import React from "react";

export default function create() {
  return (
    <div className="flex flex-col h-full">
      <TeamForm />
      <PlayerList />
      <TeamList />
    </div>
  );
}
