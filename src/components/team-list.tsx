"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Importar el componente Input
import { usePlayerListStore } from "@/store/store";
import { Team } from "@/types/index";

export default function TeamList() {
  const { teams, removeTeam, updateTeam } = usePlayerListStore(); // Añadir updateTeam
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false); // Estado para el diálogo de edición
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null); // Estado para el equipo a editar
  const [newTeamName, setNewTeamName] = useState(""); // Estado para el nuevo nombre del equipo

  const handleDelete = (team: Team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (teamToDelete) {
      removeTeam(teamToDelete.id);
      setShowDeleteConfirmation(false);
      setTeamToDelete(null);
    }
  };

  const cancelDelete = () => {
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
      updateTeam(updatedTeam); // Actualizar el equipo
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

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold mb-4">Team List</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  onClick={() => handleDelete(team)}
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
                <Button variant="outline" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
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
      </div>
    </div>
  );
}
