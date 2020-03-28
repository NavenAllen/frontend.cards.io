import socket from '../../socket-api/socket-api';

export const createGameConstants = {
    CREATE_GAME_REQUEST: 'CREATE_GAME_REQUEST',
};
export const createGameActions = {
    createGame,
};
function createGame(user) {
    socket.emit('create', {
        name: user.name,
        position: user.position,
    });
    return {type: createGameConstants.CREATE_GAME_REQUEST, user: user};
}
