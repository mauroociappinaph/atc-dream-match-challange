import create from "zustand";
import { Player, Team, PlayerListStore } from "../types/index";

export const usePlayerListStore = create<PlayerListStore>((set) => ({
    players: [],
    selectedPlayers: [],
    teams: [],
    searchTerm: "",
    currentPage: 1,
    setPlayers: (players: Player[]) => set({ players }),
    setSearchTerm: (term: string) => set({ searchTerm: term }),
    setCurrentPage: (page: number) => set({ currentPage: page }),
    addSelectedPlayer: (player: Player) =>
        set((state) => {
            // Verifica si el jugador ya está en alguno de los equipos
            const isPlayerInTeams = state.teams.some(team => team.players.includes(player.player_name));
            if (state.selectedPlayers.length >= 5 || isPlayerInTeams) {
                return state;
            }
            return {
                selectedPlayers: [...state.selectedPlayers, player],
            };
        }),
    removeSelectedPlayer: (playerId: number) =>
        set((state) => ({
            selectedPlayers: state.selectedPlayers.filter((p) => p.player_id !== playerId),
        })),
    addTeam: (team: Team) =>
        set((state) => {
            if (state.teams === null) {
                throw new Error("Teams state is null");
            }

            if (state.teams.length >= 2) {
                console.error("Solo puedes crear dos equipos");
                return state;
            }

            if (team.players.length < 5) {
                console.error("Un equipo debe tener al menos 5 jugadores");
                return state;
            }

            return {
                teams: [...state.teams, team],
                selectedPlayers: [],
            };
        }),
    removeTeam: (teamId: number) =>
        set((state) => ({
            teams: state.teams.filter((team) => team.id !== teamId),
        })),
    clearSelectedPlayers: () => set({ selectedPlayers: [] }),
    updateTeam: (updatedTeam: Team) =>
        set((state) => ({
            teams: state.teams.map((team) =>
                team.id === updatedTeam.id ? updatedTeam : team
            ),
        })),
}));