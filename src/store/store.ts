// Crea el store de zustand
import create from "zustand";

interface Player {
    player_id: string;
    player_name: string;
    player_type: string;
    player_image: string;
}

interface PlayerListStore {
    players: Player[];
    addPlayer: (player: Player) => void;
    removePlayer: (player: Player) => void;
}

export default PlayerListStore;

// Crea el store de zustand
export const usePlayerListStore = create<PlayerListStore>((set) => ({
    players: [],
    addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
    removePlayer: (player) => set((state) => ({ players: state.players.filter((p) => p !== player) })),
}));

// Crea el store de zustand


