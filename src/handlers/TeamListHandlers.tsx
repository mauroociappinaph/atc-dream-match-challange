import { useState } from "react";
import { usePlayerListStore } from "@/store/store";
import { Team, Player } from "@/types/index";

export const useTeamListHandlers = () => {
  const {
    teams,
    removeTeam,
    updateTeam,
    deletePlayerOfSelectedPlayer,
    replacePlayerInTeam,
    players,
  } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] =
    useState<Player | null>(null);

  const handleDeleteTeam = (team: Team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTeam = () => {
    if (teamToDelete) {
      removeTeam(teamToDelete.id);
      setShowDeleteConfirmation(false);
      setTeamToDelete(null);
    }
  };

  const cancelDeleteTeam = () => {
    setShowDeleteConfirmation(false);
    setTeamToDelete(null);
  };

  const handleEdit = (team: Team) => {
    setTeamToEdit(team);
    setNewTeamName(team.name);
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    if (teamToEdit) {
      const updatedTeam = {
        ...teamToEdit,
        name: newTeamName,
      };
      updateTeam(updatedTeam);
      setShowEditDialog(false);
      setTeamToEdit(null);
      setNewTeamName("");
    }
  };

  const cancelEdit = () => {
    setShowEditDialog(false);
    setTeamToEdit(null);
    setNewTeamName("");
  };

  const handleDeletePlayer = (team: Team, player: string) => {
    setTeamToEdit(team);
    setPlayerToDelete(player);
    setShowReplaceDialog(true);
  };

  const confirmReplacePlayer = () => {
    if (teamToEdit && playerToDelete && selectedReplacementPlayer) {
      replacePlayerInTeam(
        teamToEdit.id,
        playerToDelete,
        selectedReplacementPlayer
      );
      setShowReplaceDialog(false);
      setTeamToEdit(null);
      setPlayerToDelete(null);
      setSelectedReplacementPlayer(null);
    }
  };

  const confirmDeletePlayer = () => {
    if (teamToEdit && playerToDelete) {
      const updatedTeam = {
        ...teamToEdit,
        players: teamToEdit.players.filter((p) => p !== playerToDelete),
      };
      updateTeam(updatedTeam);
      deletePlayerOfSelectedPlayer(
        teams.flatMap((t) => t.players).find((p) => p === playerToDelete)
          ?.player_id ?? 0
      );
      setShowReplaceDialog(false);
      setTeamToEdit(null);
      setPlayerToDelete(null);
    }
  };

  const cancelReplacePlayer = () => {
    setShowReplaceDialog(false);
    setTeamToEdit(null);
    setPlayerToDelete(null);
    setSelectedReplacementPlayer(null);
  };

  const playerOptions = players.map((player) => ({
    value: player.player_id,
    label: player.player_name,
  }));

  const handleSelectChange = (selectedOption: any) => {
    const player = players.find((p) => p.player_id === selectedOption.value);
    setSelectedReplacementPlayer(player || null);
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
