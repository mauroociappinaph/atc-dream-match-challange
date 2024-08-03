"use client";

import React, { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player } from "@/types/index";

export default function PlayerList() {
  const {
    players,
    selectedPlayers,
    searchTerm,
    currentPage,
    setPlayers,
    setSearchTerm,
    setCurrentPage,
    addSelectedPlayer,
    removeSelectedPlayer,
  } = usePlayerListStore();
  const playersPerPage = 6;

  const debouncedFetchPlayers = useCallback(
    debounce(async (term) => {
      if (term.trim() === "") {
        setPlayers([]);
        return;
      }
      try {
        const playersData = await playersApi.getPlayers(term);
        setPlayers(playersData || []);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [setPlayers]
  );

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      debouncedFetchPlayers(searchTerm);
    }
  }, [searchTerm, debouncedFetchPlayers]);

  const handlePlayerSelect = (player: Player) => {
    const index = selectedPlayers.findIndex(
      (p) => p.player_id === player.player_id
    );
    if (index !== -1) {
      removeSelectedPlayer(selectedPlayers[index]);
    } else {
      addSelectedPlayer(player);
    }
  };

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer =
    Math.min(indexOfLastPlayer, players.length) - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);

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
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {players && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentPlayers.map((player) => {
            if (!player) {
              return null;
            }
            const { player_id, player_name, player_type, player_image } =
              player;
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
        </div>
      )}
      <div className="flex justify-between mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
