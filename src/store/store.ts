// Crea el store de zustand
import create from "zustand";
import { PlayerListStore } from "../types/index";

// Crea el store de zustand
export const usePlayerListStore = create<PlayerListStore>((set) => ({
    players: [],
    selectedPlayers: [],
    searchTerm: "",
    currentPage: 1,
    setPlayers: (players) => set({ players }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setCurrentPage: (page) => set({ currentPage: page }),
    addSelectedPlayer: (player) =>
        set((state) => ({
            selectedPlayers: [...state.selectedPlayers, player],
        })),
    removeSelectedPlayer: (player) =>
        set((state) => ({
            selectedPlayers: state.selectedPlayers.filter((p) => p !== player),
        })),
}));

// Crea el store de zustand


