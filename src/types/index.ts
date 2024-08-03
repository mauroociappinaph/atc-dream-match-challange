export interface Player {
    player_id: string;
    player_name: string;
    player_type: string;
    player_image: string;
}

export interface PlayerListStore {
    players: Player[];
    selectedPlayers: Player[];
    searchTerm: string;
    currentPage: number;
    setPlayers: (players: Player[]) => void;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    addSelectedPlayer: (player: Player) => void;
    removeSelectedPlayer: (player: Player) => void;

}
