const player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;

    return {
        getName,
        getSign
    }
};

const gameController = (() => {
    const player1 = player('player1', 'x');
    const player2 = player('player2', 'o');
    let board = Array(9);
    console.log(player1.getName());
    let players = [player1, player2];
    let currentTurn = player1;
    let xArray = [];
    let oArray = [];
})();

