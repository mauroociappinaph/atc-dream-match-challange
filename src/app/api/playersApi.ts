import axiosClient from './axiosClient';
import { PlayersApiResponse, Player } from "../../../src/types/index";

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

            console.log('getPlayers: response.data =', response.data);

            // Asegúrate de que la estructura de datos es correcta
            if (!Array.isArray(response.data)) {
                console.error('getPlayers: response.data is not an array');
                return [];
            }

            const uniquePlayers = new Map<number, Player>();
            for (const player of response.data) {
                if (player.player_image && player.player_image.trim() !== '') {
                    uniquePlayers.set(player.player_id, {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        player_type: player.player_type,
                        player_image: player.player_image
                    });
                }
            }

            const playersArray = Array.from(uniquePlayers.values());
            console.log('getPlayers: uniquePlayers =', playersArray);

            return playersArray;
        } catch (error) {
            console.error('getPlayers: error =', error);
            return [];
        }
    }
};

export default playersApi;