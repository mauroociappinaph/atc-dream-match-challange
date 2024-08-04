// src/store/store.ts
import create from "zustand";
import { PlayerListStore } from "../types/index";

export const usePlayerListStore = create<PlayerListStore>((set) => ({
    players: [],
    selectedPlayers: [],
    teams: [],
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
            if (state.teams === null) {
                throw new Error("Teams state is null");
            }

            if (state.teams.length >= 2) {
                alert("Solo Puedes crear dos equipos");
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
    updateTeam: (updatedTeam) => set((state) => ({
        teams: state.teams.map((team) =>
            team.id === updatedTeam.id ? updatedTeam : team
        ),
    })),
}));