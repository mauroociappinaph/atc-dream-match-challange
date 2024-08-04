"use client";

import { useState, useEffect } from "react";
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
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player, Team } from "@/types/index";

export default function TeamForm() {
  const {
    players,
    selectedPlayers,
    setPlayers,
    addSelectedPlayer,
    removeSelectedPlayer,
    addTeam,
  } = usePlayerListStore();

  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await playersApi.getPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, [setPlayers]);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handlePlayerSelect = (playerId: number) => {
    const selectedPlayer = players.find(
      (player) => player.player_id === playerId
    );
    if (selectedPlayer && selectedPlayers.length < 5) {
      addSelectedPlayer(selectedPlayer);
    }
  };

  const handlePlayerRemove = (playerId: number) => {
    removeSelectedPlayer(playerId);
  };

  const handleSaveChanges = () => {
    if (teamName.trim() === "" || selectedPlayers.length === 0) {
      alert("Please enter a team name and select at least one player.");
      return;
    }

    const newTeam: Team = {
      id: Date.now(), // Using timestamp as a simple ID
      name: teamName,
      players: selectedPlayers.map((player) => player.player_name),
    };

    addTeam(newTeam);

    setTeamName("");
    alert("Team saved successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crea tu equipo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Nombre del Equipo</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              placeholder="Ingrese nombre del equipo"
            />
          </div>
          <div className="space-y-2">
            <Label>Jugadores Seleccionados</Label>
            <div className="flex items-center justify-between">
              <Select
                onValueChange={(value) => handlePlayerSelect(parseInt(value))}
                className="w-full"
              >
                <SelectContent>
                  <SelectGroup>
                    {players.map((player) => (
                      <SelectItem
                        key={player.player_id}
                        value={player.player_id.toString()}
                      >
                        {player.player_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center justify-between">
              <div className="flex w-full gap-2">
                {selectedPlayers.map((player) => (
                  <div
                    key={player.player_id}
                    className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md"
                  >
                    {player.player_name}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePlayerRemove(player.player_id)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button onClick={handleSaveChanges}>Crea tu equipo</Button>
      </CardFooter>
    </Card>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
