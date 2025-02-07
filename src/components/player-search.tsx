import React from "react";
import { Input } from "@/components/ui/input";
import { PlayerSearchProps } from "@/types/index";

const PlayerSearch: React.FC<PlayerSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="w-full max-w-md mb-4">
      <Input
        type="text"
        placeholder="Buscar jugador"
        value={searchTerm || ""}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default PlayerSearch;
