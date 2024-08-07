import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player, PlayerOption, Team } from "@/types/index";

export const useTeamListHandlers = () => {
  const {
    setPlayers,
    players,
    teams,
    addSelectedPlayer,
    removeSelectedPlayer,
  } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showPlayerTakenDialog, setShowPlayerTakenDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null); // Cambiar a Player
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] =
    useState<PlayerOption | null>(null);
  const [playerOptions, setPlayerOptions] = useState<PlayerOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPlayerOptions(
      players.map((player) => ({
        value: player.player_id,
        label: player.player_name,
      }))
    );
  }, [players]);

  const handleDeleteTeam = useCallback((team: Team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  }, []);

  const confirmDeleteTeam = useCallback(() => {
    // Lógica para borrar el equipo
    setShowDeleteConfirmation(false);
  }, []);

  const cancelDeleteTeam = useCallback(() => {
    setShowDeleteConfirmation(false);
  }, []);

  const handleEdit = useCallback((team: Team) => {
    setTeamToEdit(team);
    setNewTeamName(team.name);
    setShowEditDialog(true);
  }, []);

  const saveEdit = useCallback(() => {
    // Lógica para guardar el nombre editado del equipo
    setShowEditDialog(false);
  }, []);

  const cancelEdit = useCallback(() => {
    setShowEditDialog(false);
  }, []);

  const handleDeletePlayer = useCallback((team: Team, player: Player) => {
    setPlayerToDelete(player);
    setShowReplaceDialog(true);
  }, []);

  const confirmReplacePlayer = useCallback(() => {
    // Lógica para reemplazar el jugador
    setShowReplaceDialog(false);
  }, []);

  const confirmDeletePlayer = useCallback(() => {
    if (playerToDelete && teamToEdit) {
      // Lógica para eliminar el jugador
      teamToEdit.players = teamToEdit.players.filter(
        (player) => player.player_id !== playerToDelete.player_id
      );
      setShowReplaceDialog(false);
      setPlayerToDelete(null);
      setTeamToEdit(null);
    }
  }, [playerToDelete, teamToEdit]);

  const cancelReplacePlayer = useCallback(() => {
    setShowReplaceDialog(false);
  }, []);

  const handleSelectChange = useCallback((selectedOption: PlayerOption) => {
    setSelectedReplacementPlayer(selectedOption);
  }, []);

  const debouncedFetchPlayers = useCallback(
    debounce(async (playerName: string) => {
      setIsLoading(true);
      try {
        const playersData = await playersApi.getPlayers(playerName);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handlePlayerSelect = useCallback(
    (player: Player) => {
      const isSelected = teams.some((team) =>
        team.players.some((p) => p.player_id === player.player_id)
      );

      if (isSelected) {
        setShowPlayerTakenDialog(true);
        return;
      }

      if (player) {
        addSelectedPlayer(player);
      }
    },
    [teams, addSelectedPlayer]
  );

  return {
    isLoading,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    showEditDialog,
    setShowEditDialog,
    showReplaceDialog,
    setShowReplaceDialog,
    showPlayerTakenDialog,
    setShowPlayerTakenDialog,
    teamToDelete,
    teamToEdit,
    playerToDelete,
    newTeamName,
    setNewTeamName,
    selectedReplacementPlayer,
    setSelectedReplacementPlayer,
    handleDeleteTeam,
    confirmDeleteTeam,
    cancelDeleteTeam,
    handleEdit,
    saveEdit,
    cancelEdit,
    handleDeletePlayer,
    confirmReplacePlayer,
    confirmDeletePlayer,
    cancelReplacePlayer,
    playerOptions,
    setPlayerOptions,
    handleSelectChange,
    debouncedFetchPlayers,
    handlePlayerSelect,
  };
};
