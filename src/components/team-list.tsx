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

export default function TeamList() {
  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      players: ["John Doe", "Jane Smith", "Bob Johnson", "Sarah Lee"],
    },
    {
      id: 2,
      name: "Team Beta",
      players: [
        "Michael Brown",
        "Emily Davis",
        "David Wilson",
        "Olivia Taylor",
      ],
    },
    {
      id: 3,
      name: "Team Gamma",
      players: [
        "Jessica Anderson",
        "Christopher Perez",
        "Samantha Flores",
        "Daniel Ramirez",
      ],
    },
  ];
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const handleDelete = (team) => {
    setTeamToDelete(team);
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = () => {
    console.log(`Deleting team: ${teamToDelete.name}`);
    setShowDeleteConfirmation(false);
    setTeamToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setTeamToDelete(null);
  };
  return (
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
            <Button variant="outline" size="sm">
              View
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
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
                Are you sure you want to delete the team "{teamToDelete?.name}"?
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
    </div>
  );
}
