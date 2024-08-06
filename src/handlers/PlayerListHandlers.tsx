import { useCallback, useState } from "react";
import { debounce } from "lodash";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player } from "@/types/index";

export const usePlayerListHandlers = () => {
  const {
    selectedPlayers,
    setPlayers,
    addSelectedPlayer,
    removeSelectedPlayer,
    teams,
  } = usePlayerListStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showPlayerTakenDialog, setShowPlayerTakenDialog] = useState(false);

  const debouncedFetchPlayers = useCallback(
    debounce(async (term: string) => {
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
    }, 1000),
    [setPlayers]
  );

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

  return {
    isLoading,
    showPlayerTakenDialog,
    setShowPlayerTakenDialog,
    debouncedFetchPlayers,
    handlePlayerSelect,
  };
};
