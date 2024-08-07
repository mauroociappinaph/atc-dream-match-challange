import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player, PlayerOption, Team } from "@/types/index";

export const useTeamListHandlers = () => {
  const { setPlayers, players, teams } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] =
    useState<PlayerOption | null>(null);
  const [playerOptions, setPlayerOptions] = useState<PlayerOption[]>([]);

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

  const handleDeletePlayer = useCallback((team: Team, player: string) => {
    setPlayerToDelete(player);
    setShowReplaceDialog(true);
  }, []);

  const confirmReplacePlayer = useCallback(() => {
    // Lógica para reemplazar el jugador
    setShowReplaceDialog(false);
  }, []);

  const confirmDeletePlayer = useCallback(() => {
    // Lógica para eliminar el jugador
    setShowReplaceDialog(false);
  }, []);

  const cancelReplacePlayer = useCallback(() => {
    setShowReplaceDialog(false);
  }, []);

  const handleSelectChange = useCallback((selectedOption: PlayerOption) => {
    setSelectedReplacementPlayer(selectedOption);
  }, []);

  return {
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    showEditDialog,
    setShowEditDialog,
    showReplaceDialog,
    setShowReplaceDialog,
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
  };
};
