// src/api/playersApi.js
import axiosClient from './axiosClient';

const playersApi = {
    async getPlayers(playerName = '') {
        try {
            const response = await axiosClient.get('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });
            if (Array.isArray(response.data)) {
                const uniquePlayers = new Map();
                response.data.forEach(player => {
                    if (player.player_image && player.player_image.trim() !== '' && !uniquePlayers.has(player.player_id)) {
                        uniquePlayers.set(player.player_id, player); // Add player object as value
                    }
                });
                return Array.from(uniquePlayers.values()); // Return unique players
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};

export default playersApi;