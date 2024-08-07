import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player } from "@/types/index";

export const useTeamListHandlers = () => {
  const { setPlayers, players, teams } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] =
    useState(null);
  const [playerOptions, setPlayerOptions] = useState([]);

  useEffect(() => {
    setPlayerOptions(
      players.map((player) => ({
        value: player.player_id,
        label: player.player_name,
      }))
    );
  }, [players]);

  const handleDeleteTeam = (team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTeam = () => {
    // Lógica para borrar el equipo
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteTeam = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (team) => {
    setTeamToEdit(team);
    setNewTeamName(team.name);
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    // Lógica para guardar el nombre editado del equipo
    setShowEditDialog(false);
  };

  const cancelEdit = () => {
    setShowEditDialog(false);
  };

  const handleDeletePlayer = (team, player) => {
    setPlayerToDelete(player);
    setShowReplaceDialog(true);
  };

  const confirmReplacePlayer = () => {
    // Lógica para reemplazar el jugador
    setShowReplaceDialog(false);
  };

  const confirmDeletePlayer = () => {
    // Lógica para eliminar el jugador
    setShowReplaceDialog(false);
  };

  const cancelReplacePlayer = () => {
    setShowReplaceDialog(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedReplacementPlayer(selectedOption);
  };

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
    handleSelectChange,
  };
};
