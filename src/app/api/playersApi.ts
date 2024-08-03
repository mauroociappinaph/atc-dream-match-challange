// src/api/playersApi.ts
import axiosClient from './axiosClient';
import { PlayerApi, PlayersApiResponse } from "../../../src/types/index";

// Definir la interfaz para el tipo de jugador

const playersApi = {
    async getPlayers(playerName: string = ''): Promise<PlayerApi[]> {
        try {
            console.log('getPlayers: playerName =', playerName);

            const response = await axiosClient.get<PlayersApiResponse>('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });

            const uniquePlayers = new Map<number, PlayerApi>();
            for (const player of response.data) {
                if (player.player_image && player.player_image.trim() !== '') {
                    uniquePlayers.set(player.player_id, player);
                }
            }
            return Array.from(uniquePlayers.values());
        } catch (error) {
            console.error('getPlayers: error =', error);
            return [];
        }
    }
};

export default playersApi;