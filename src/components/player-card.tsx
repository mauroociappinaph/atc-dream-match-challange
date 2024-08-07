// components/player-card.js

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerCardProps } from "@/types/index";

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  onSelect,
}) => {
  return (
    <Card className="player-card">
      <CardContent>
        <h2 className="player-name">{player.player_name}</h2>
        <p className="player-position">{player.player_type}</p>
        <Button onClick={() => onSelect(player)} className="player-button">
          {isSelected ? "Deseleccionar" : "Seleccionar"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
