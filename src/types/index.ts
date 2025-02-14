export interface Player {
    player_id: number;
    player_name: string;
    player_type: string;
    player_image: string;
}

export interface PlayerListStore {
    players: Player[];
    selectedPlayers: Player[];
    teams: Team[];
    searchTerm: string;
    currentPage: number;
    setPlayers: (players: Player[]) => void;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    addSelectedPlayer: (player: Player) => void;
    removeSelectedPlayer: (playerId: number) => void;
    addTeam: (team: Team) => void;
    removeTeam: (teamId: number) => void;
    clearSelectedPlayers: () => void;
    updateTeam: (updatedTeam: Team) => void;
    deletePlayerOfSelectedPlayer: (playerId: number) => void;
    replacePlayerInTeam: (teamId: number, oldPlayer: string, newPlayer: Player) => void;
    addAnotherPlayerAfterDelete: (teamId: number, oldPlayer: string, newPlayer: Player) => void;
}

export interface PlayerApi {
    player_id: number;
    player_name: string;
    player_type: string;
    player_image: string;
    [key: string]: any;
}

export interface PlayersApiResponse {
    data: PlayerApi[];
}

export interface Team {
    id: number;
    name: string;
    players: Player[];
}

export interface PlayerPaginationProps {
    currentPage: number;
    totalPages: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

export interface PlayerSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export interface PlayerCardProps {
    player: Player;
    isSelected: boolean;
    onSelect: (player: Player) => void;
}

export interface PlayerOption {
    value: number;
    label: string;
}