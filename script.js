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
    let board = Array(9).fill(null);
    let gridItemsFilled = 0;
    let currentPlayerTurn = player1;
    let xArray = [];
    let oArray = [];

    const getCurrentPlayer = () => {
        return currentPlayerTurn;
    }

    const changePlayerTurn = () => {
        currentPlayerTurn === player1 ? currentPlayerTurn = player2 : currentPlayerTurn = player1;
    }

    const incrementGridItemsFilled = () => {
        gridItemsFilled++;
    }

    const resetGame = () => {
        xArray = [];
        oArray = [];
        board.fill(null);
    }

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let currentArray;
        if(currentPlayerTurn.getSign() === 'x') {
            currentArray = xArray;
        } else {
            currentArray = oArray;
        }

        for(let i = 0; i < winningCombinations.length; i++) {
            const result = winningCombinations[i].every(val => currentArray.includes(val));
            if(result) {
                return true;
            }
        }

        return false;
    }

    const checkDraw = () => {
        if(gridItemsFilled === 9 && !checkWin()) {
            return true;
        }
        return false;
    }

    const placeMarker = (index, player) => {
        if(board[index] != null) {
            alert("This box is already filled!");
            return;
        }
        board[index] = player.getSign();
        player.getSign() === 'x' ? xArray.push(index) : oArray.push(index);
        incrementGridItemsFilled();
        let gridItemDiv = document.querySelector(`#box${index}`);
        gridItemDiv.innerHTML = getCurrentPlayer().getSign();
        if(checkDraw()) {
            alert("It's a draw!");
        }
        if(checkWin()) {
            alert(`${currentPlayerTurn.getName()} has won the game!`)
        }
        changePlayerTurn();
        // console.log(board);
        // renderArray(board);
    }

    // const renderArray = (board) => {
    //     for(let i = 0; i < board.length; i++) {
    //         if(board[i] != null) {
    //             let gridItemDiv = document.querySelector(`#box${i}`);
    //             gridItemDiv.innerHTML = getCurrentPlayer().getSign();
    //         }
    //     }
    // }

    return {
        getCurrentPlayer,
        changePlayerTurn,
        placeMarker,
        checkWin,
        checkDraw
    }
})();


const itemArray = document.querySelectorAll('div.grid-item'); // this gives us all the items as an array.
itemArray.forEach( (item) => {
    item.onclick = (e) =>  {
        /* the reason we have to take the charAt(3) is because we can't just have the div
        id as a number eg. 1, 2, 3 etc etc. So instead we need to name them box1-box8, and
        we just want the number. Have to cast it to an integer too with parseInt, otherwise
        it'll try find the array index with a character and that'll probably result in something grim.*/
        gameController.placeMarker(parseInt(e.currentTarget.id.charAt(3)), gameController.getCurrentPlayer());
    }
})