"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePlayerListStore } from "@/store/store";
import { Team, Player } from "@/types/index";

export default function TeamList() {
  const {
    teams,
    removeTeam,
    updateTeam,
    deletePlayerOfSelectedPlayer,
    replacePlayerInTeam,
    players,
    setPlayers,
  } = usePlayerListStore();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [playerToReplace, setPlayerToReplace] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedReplacementPlayer, setSelectedReplacementPlayer] =
    useState<Player | null>(null);

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
    setPlayerToReplace(player);
    setShowReplaceDialog(true);
  };

  const confirmReplacePlayer = () => {
    if (teamToEdit && playerToReplace && selectedReplacementPlayer) {
      replacePlayerInTeam(
        teamToEdit.id,
        playerToReplace,
        selectedReplacementPlayer
      );
      setShowReplaceDialog(false);
      setTeamToEdit(null);
      setPlayerToReplace(null);
      setSelectedReplacementPlayer(null);
    }
  };

  const confirmDeletePlayer = () => {
    if (teamToEdit && playerToReplace) {
      const updatedTeam = {
        ...teamToEdit,
        players: teamToEdit.players.filter((p) => p !== playerToReplace),
      };
      updateTeam(updatedTeam);
      deletePlayerOfSelectedPlayer(
        teams.flatMap((t) => t.players).find((p) => p === playerToReplace)
          ?.player_id ?? 0
      );
      setShowReplaceDialog(false);
      setTeamToEdit(null);
      setPlayerToReplace(null);
      setSelectedReplacementPlayer(null);
    }
  };

  const cancelReplacePlayer = () => {
    setShowReplaceDialog(false);
    setTeamToEdit(null);
    setPlayerToReplace(null);
    setSelectedReplacementPlayer(null);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold mb-4">Team List</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.id} className="p-4">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>{team.players.length} players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {team.players.map((player, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt={player} />
                      <AvatarFallback>{player.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{player}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePlayer(team, player)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(team)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTeam(team)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        {showDeleteConfirmation && (
          <Dialog open={showDeleteConfirmation}>
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Delete Team</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the team "{teamToDelete?.name}
                  "?
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelDeleteTeam}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteTeam}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {showEditDialog && (
          <Dialog open={showEditDialog}>
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Edit Team</DialogTitle>
                <DialogDescription>Edit the team name.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Input
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Team Name"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={saveEdit}>
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {showReplaceDialog && (
          <Dialog open={showReplaceDialog}>
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Replace Player</DialogTitle>
                <DialogDescription>
                  {`Replace the player "${playerToReplace}" or confirm deletion.`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <select
                  onChange={(e) => {
                    const player = players.find(
                      (p) => p.player_id === Number(e.target.value)
                    );
                    setSelectedReplacementPlayer(player || null);
                  }}
                  value={selectedReplacementPlayer?.player_id || ""}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Replacement Player</option>
                  {players.map((player) => (
                    <option key={player.player_id} value={player.player_id}>
                      {player.player_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelReplacePlayer}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmReplacePlayer}>
                  Replace
                </Button>
                <Button variant="destructive" onClick={confirmDeletePlayer}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
