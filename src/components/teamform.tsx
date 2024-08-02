"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function TeamForm() {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  const handlePlayerSelect = (player) => {
    if (selectedPlayers.length < 5) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };
  const handlePlayerRemove = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  };
  const handleSaveChanges = () => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arma tu formación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              placeholder="Enter team name"
            />
          </div>
          <div className="space-y-2">
            <Label>Players</Label>
            <div className="flex items-center justify-between">
              <Select onValueChange={handlePlayerSelect} className="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Select players" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="player1">Player 1</SelectItem>
                    <SelectItem value="player2">Player 2</SelectItem>
                    <SelectItem value="player3">Player 3</SelectItem>
                    <SelectItem value="player4">Player 4</SelectItem>
                    <SelectItem value="player5">Player 5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="ml-4 font-medium">
                {selectedPlayers.length}/5 players
              </div>
            </div>
            <div className="flex gap-2">
              {selectedPlayers.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md"
                >
                  {player}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlayerRemove(player)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
