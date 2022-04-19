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
    let gridItemsFilled = 0;
    console.log(player1.getName());
    let players = [player1, player2];
    let currentPlayerTurn = player1;
    let xArray = [];
    let oArray = [];

    const getCurrentPlayer = () => {
        return currentPlayerTurn;
    }

    const changePlayerTurn = () => {
        currentPlayerTurn === player1 ? currentPlayerTurn = player2 : currentPlayerTurn = player1;
    }

    const addGridItemsFilled = () => {
        gridItemsFilled++;
    }

    const placeMarker = (index, player) => {
        board[index] = player.getSign();
        player.getSign() === 'x' ? xArray.push(index) : oArray.push(index);
        addGridItemsFilled();
        console.log(board);
    }

    return {
        getCurrentPlayer,
        changePlayerTurn,
        placeMarker
    }
})();


const itemArray = document.querySelectorAll('div.grid-item'); // this gives us all the items as an array.
itemArray.forEach( (item) => {
    item.onclick = (e) =>  {
        // console.log(e.currentTarget.id);
        // console.log(gameController.getCurrentPlayer().getSign());
        /* the reason we have to take the charAt(3) is because we can't just have the div
        id as a number eg. 1, 2, 3 etc etc. So instead we need to name them box1-box8, and
        we just want the number. Have to cast it to an integer too with parseInt, otherwise
        it'll try find the array index with a character and that'll probably result in something grim.*/
        gameController.placeMarker(parseInt(e.currentTarget.id.charAt(3)), gameController.getCurrentPlayer());
        gameController.changePlayerTurn();
    }
})