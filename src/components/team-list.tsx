"use client";

import { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { usePlayerListStore } from "@/store/store";

import playersApi from "@/app/api/playersApi";
import { useTeamListHandlers } from "@/handlers/TeamListHandlers";

export default function TeamList() {
  const { teams, players, setPlayers } = usePlayerListStore();

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

  return (
    <div className="flex  justify-center items-center">
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
                      Editar
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
                  Editar Nombre del Equipo
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTeam(team)}
                >
                  Borrar
                </Button>
              </div>
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
                  ¿Estás seguro que quieres borrar el equipo "
                  {teamToDelete?.name}"?
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
                <DialogTitle>Remplazar Jugador o Eliminar Jugador</DialogTitle>
                <DialogDescription>
                  {`Selecciona un nuevo jugador para reemplazar a ${playerToDelete}`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Select options={playerOptions} onChange={handleSelectChange} />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={cancelReplacePlayer}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={confirmReplacePlayer}>
                  Reemplazar
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
