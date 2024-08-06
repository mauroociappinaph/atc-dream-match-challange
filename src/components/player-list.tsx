"use client";

import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "lodash";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player } from "@/types/index";
import LoadingSpinner from "./ui/loadingspinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PlayerCard from "../components/player-card";
import PlayerSearch from "../components/player-search";
import PlayerPagination from "../components/player-pagination";

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
    clearSelectedPlayers,
    teams,
  } = usePlayerListStore();
  const playersPerPage = 6;

  const [isLoading, setIsLoading] = useState(false);
  const [showPlayerTakenDialog, setShowPlayerTakenDialog] = useState(false);

  const debouncedFetchPlayers = useCallback(
    debounce(async (term) => {
      if (term.trim() === "") {
        setPlayers([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const playersData = await playersApi.getPlayers(term);
        setPlayers(playersData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000), // Cambiado a 1000 ms
    [setPlayers]
  );

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      debouncedFetchPlayers(searchTerm);
    } else {
      setPlayers([]);
    }
  }, [searchTerm, debouncedFetchPlayers]);

  const handlePlayerSelect = (player: Player) => {
    const isSelected = selectedPlayers.some(
      (p) => p.player_id === player.player_id
    );
    if (isSelected) {
      removeSelectedPlayer(player.player_id);
    } else {
      const isPlayerInTeams = teams.some((team) =>
        team.players.includes(player.player_name)
      );
      if (isPlayerInTeams) {
        setShowPlayerTakenDialog(true);
        return;
      }
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
    <div className="flex flex-col justify-center items-center p-4">
      <PlayerSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {players.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentPlayers.map((player) => {
                if (!player) {
                  return null;
                }
                return (
                  <PlayerCard
                    key={player.player_id}
                    player={player}
                    isSelected={selectedPlayers.some(
                      (p) => p.player_id === player.player_id
                    )}
                    onSelect={handlePlayerSelect}
                  />
                );
              })}
            </div>
          )}
          <PlayerPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      )}

      {/* Player Taken Error Dialog */}
      <Dialog
        open={showPlayerTakenDialog}
        onOpenChange={setShowPlayerTakenDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              Este jugador ya ha sido seleccionado por otro equipo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowPlayerTakenDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
