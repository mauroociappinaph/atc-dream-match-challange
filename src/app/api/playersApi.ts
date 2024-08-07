// src/api/playersApi.ts

import axiosClient from './axiosClient';
import { PlayersApiResponse, Player } from "../../../src/types/index";

// Definir la interfaz para el tipo de jugador

const playersApi = {
    async getPlayers(playerName: string = ''): Promise<Player[]> {
        try {
            console.log('getPlayers: playerName =', playerName);

            const response = await axiosClient.get<PlayersApiResponse>('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });

            const uniquePlayers = new Map<number, Player>();
            for (const player of response.data.data) {
                if (player.player_image && player.player_image.trim() !== '') {
                    uniquePlayers.set(player.player_id, {
                        player_id: player.player_id.toString(),
                        player_name: player.player_name,
                        player_type: player.player_type,
                        player_image: player.player_image
                    });
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