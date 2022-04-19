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
    let currentPlayerTurn = player1;
    let xArray = [];
    let oArray = [];
})();


const itemArray = document.querySelectorAll('div.grid-item'); // this gives us all the items as an array.
itemArray.forEach( (item) => {
    item.onclick = (e) =>  {
        console.log(e.currentTarget.id);
    }
})