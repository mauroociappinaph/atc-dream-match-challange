import { useState, useEffect } from "react";
import playersApi from "@/app/api/playersApi";
import { usePlayerListStore } from "@/store/store";
import { Player, Team } from "@/types/index";

export const useTeamListHandlers = () => {
  const {
    setPlayers,
    players,
    teams,

    updateTeam,
    removeTeam,
    replacePlayerInTeam,
    addAnotherPlayerAfterDelete,
  } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [playerOptions, setPlayerOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    setPlayerOptions(
      players.map((player) => ({
        value: player.player_id,
        label: player.player_name,
      }))
    );
  }, [players]);

  const handleDeleteTeam = (team: Team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTeam = () => {
    if (teamToDelete) {
      removeTeam(teamToDelete.id);
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteTeam = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (team: Team) => {
    setTeamToEdit(team);
    setNewTeamName(team.name);
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    if (teamToEdit) {
      updateTeam({ ...teamToEdit, name: newTeamName });
    }
    setShowEditDialog(false);
  };

  const cancelEdit = () => {
    setShowEditDialog(false);
  };

  const handleDeletePlayer = (team: Team, player: string) => {
    setTeamToEdit(team);
    setPlayerToDelete(player);
    setShowReplaceDialog(true);
  };

  const confirmReplacePlayer = () => {
    if (teamToEdit && playerToDelete && selectedReplacementPlayer) {
      const replacementPlayer = players.find(
        (player) => player.player_id === selectedReplacementPlayer.value
      );

      if (replacementPlayer) {
        replacePlayerInTeam(teamToEdit.id, playerToDelete, replacementPlayer);
      }
    }
    setShowReplaceDialog(false);
  };

  const confirmDeletePlayer = () => {
    if (teamToEdit && playerToDelete) {
      const updatedTeam = {
        ...teamToEdit,
        players: teamToEdit.players.filter(
          (player) => player.player_name !== playerToDelete
        ),
      };

      updateTeam(updatedTeam);
    }
    setShowReplaceDialog(false);
  };
  const cancelReplacePlayer = () => {
    setShowReplaceDialog(false);
  };

  const handleSelectChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
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
    setPlayerOptions,
    handleSelectChange,
  };
};
