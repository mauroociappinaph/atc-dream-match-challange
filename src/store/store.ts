// src/store/store.ts
import create from "zustand";
import { PlayerListStore } from "../types/index";

export const usePlayerListStore = create<PlayerListStore>((set) => ({
    players: [],
    selectedPlayers: [],
    teams: [], // Agregamos el estado de equipos
    searchTerm: "",
    currentPage: 1,
    setPlayers: (players) => set({ players }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setCurrentPage: (page) => set({ currentPage: page }),
    addSelectedPlayer: (player) =>
        set((state) => {
            if (state.selectedPlayers.length >= 5) {
                return state;
            }
            return {
                selectedPlayers: [...state.selectedPlayers, player],
            };
        }),
    removeSelectedPlayer: (player) =>
        set((state) => ({
            selectedPlayers: state.selectedPlayers.filter((p) => p !== player),
        })),
    addTeam: (team: Team) =>
        set((state) => {
            if (state.teams.length >= 2) {
                alert("You can only create a maximum of two teams.");
                return state;
            }
            return { teams: [...state.teams, team], selectedPlayers: [] }; // Clear selected players after adding a team
        }),
    removeTeam: (teamId: number) =>
        set((state) => ({
            teams: state.teams.filter((team) => team.id !== teamId),
        })),
}));