import api from './api';

// Lấy danh sách người chơi
export const getPlayers = async () => {
    try {
        const response = await api.get('/players');
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

// Lấy chi tiết một người chơi theo ID
export const getPlayerById = async (playerId) => {
    try {
        const response = await api.get(`/players/${playerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error;
    }
};
