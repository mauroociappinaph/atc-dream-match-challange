// src/api/playersApi.js
import axiosClient from './axiosClient';

const playersApi = {
    async getPlayers(playerName = '') {
        try {
            console.log('getPlayers: playerName =', playerName);

            const response = await axiosClient.get('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });
            console.log('getPlayers: response =', response);

            if (Array.isArray(response.data)) {
                const uniquePlayers = new Map();
                response.data.forEach(player => {
                    console.log('getPlayers: player =', player);
                    if (player.player_image && player.player_image.trim() !== '' && !uniquePlayers.has(player.player_id)) {
                        uniquePlayers.set(player.player_id, player);
                    }
                });
                const players = Array.from(uniquePlayers.values()); // Return unique players
                console.log('getPlayers: players =', players);
                return players;
            }
            return [];
        } catch (error) {
            console.error('getPlayers: error =', error);
            return [];
        }
    }
};

export default playersApi;