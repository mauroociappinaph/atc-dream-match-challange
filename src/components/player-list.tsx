// src/components/PlayerList.tsx
"use client";

import React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import playersApi from "@/app/api/playersApi";

interface Player {
  player_id: string;
  player_name: string;
  player_type: string;
  player_image: string;
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 6;

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(players.length / playersPerPage);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await playersApi.getPlayers(searchTerm);
        setPlayers(playersData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, [searchTerm]);

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Buscar jugador"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {players.slice(0, 6).map((player) => {
          if (!player) {
            return null;
          }
          const { player_id, player_name, player_type, player_image } = player;
          return (
            <React.Fragment key={player_id}>
              <Card className="player-card">
                <CardContent>
                  <img
                    src={player_image}
                    alt={player_name}
                    className="player-image"
                  />
                  <h2 className="player-name">{player_name}</h2>
                  <p className="player-position">{player_type}</p>
                  <Button
                    onClick={() => handlePlayerSelect(player)}
                    className="player-button"
                  >
                    {selectedPlayers.includes(player)
                      ? "Deseleccionar"
                      : "Seleccionar"}
                  </Button>
                </CardContent>
              </Card>
            </React.Fragment>
          );
        })}
        <button onClick={handlePreviousPage}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
}
