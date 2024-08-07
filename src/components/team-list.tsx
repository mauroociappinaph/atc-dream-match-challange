"use client";

import { useEffect, useState } from "react";
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
import Select from "react-select";
import { usePlayerListStore } from "@/store/store";
import playersApi from "@/app/api/playersApi";
import { useTeamListHandlers } from "@/handlers/TeamListHandlers";

export default function TeamList() {
  const { teams, setPlayers } = usePlayerListStore();
  const [noPlayersDialog, setNoPlayersDialog] = useState(false);

  const {
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
    handleDeleteTeam,
    confirmDeleteTeam,
    cancelDeleteTeam,
    handleEdit,
    saveEdit,
    cancelEdit,
    handleDeletePlayer,
    confirmDeletePlayer,
    cancelReplacePlayer,
    playerOptions,
    setPlayerOptions,
    handleSelectChange,
  } = useTeamListHandlers();

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

  useEffect(() => {
    if (showReplaceDialog) {
      const fetchPlayerOptions = async () => {
        try {
          const playersData = await playersApi.getPlayers();
          if (playersData.length === 0) {
            setNoPlayersDialog(true);
          } else {
            const options = playersData.map((player) => ({
              value: player.player_id,
              label: player.player_name,
            }));
            setPlayerOptions(options);
          }
        } catch (error) {
          console.error("Error fetching player options:", error);
        }
      };

      fetchPlayerOptions();
    }
  }, [showReplaceDialog, setPlayerOptions]);

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="grid gap-4 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.id} className="p-4 w-full bg-gray-200">
            <CardHeader>
              <CardTitle className="text-customRed">{team.name}</CardTitle>
              <CardDescription>{team.players.length} players</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2 justify-center items-center">
                {team.players.map((player, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row md:flex-row items-center justify-center gap-2"
                  >
                    <div className="bg-gray-300 p-2 rounded-full">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt={player} />
                        <AvatarFallback>{player.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="bg-gray-300 p-2 rounded-md text-center">
                      <span>{player}</span>
                    </div>
                    <div className="bg-gray-300 p-2 rounded-md text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePlayer(team, player)}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(team)}
              >
                Editar Nombre del Equipo
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteTeam(team)}
              >
                Borrar
              </Button>
            </CardFooter>
          </Card>
        ))}
        {showDeleteConfirmation && (
          <Dialog
            open={showDeleteConfirmation}
            onOpenChange={setShowDeleteConfirmation}
          >
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Borrar Equipo</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que quieres borrar el equipo &quot;
                  {teamToDelete?.name}&quot;?
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelDeleteTeam}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={confirmDeleteTeam}>
                  Borrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {showEditDialog && (
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Edita el equipo</DialogTitle>
                <DialogDescription>
                  Edita el nombre del equipo.
                </DialogDescription>
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
                  Cancelar
                </Button>
                <Button variant="primary" onClick={saveEdit}>
                  Guardar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {showReplaceDialog && (
          <Dialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
            <DialogContent className="p-6 grid gap-4">
              <DialogHeader>
                <DialogTitle>Eliminar Jugador</DialogTitle>
                <DialogDescription>
                  {`¿Estás seguro que quieres eliminar el jugador ${playerToDelete}?`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelReplacePlayer}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={confirmDeletePlayer}>
                  Eliminar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
