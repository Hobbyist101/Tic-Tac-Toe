(function(){
    const gameboard = document.querySelector('#gameboard');
    const resetBtn = document.querySelector('#resetBtn');
    const buttons = document.querySelector('.buttons');
    const boxes = document.querySelectorAll('.boxes');
    
    let playerChoice;
    let opponentChoice;
    let currentPlayer;
    let playerInput = [];
    let opponentInput = [];
    let round = 1;
    
    const WINNING_COMBINATIONS = [
        [ '0', '1', '2' ],
        [ '3', '4', '5' ],
        [ '6', '7', '8' ],
        [ '0', '3', '6' ],
        [ '2', '4', '7' ],
        [ '3', '5', '8' ],
        [ '0', '4', '8' ],
        [ '2', '4', '6' ],
    ]
    
    const choice = (input) => {
        playerChoice = input.target.dataset.key;
        if (playerChoice == 'circle') {
            opponentChoice = 'cross';
        } else {
            opponentChoice = 'circle';
        }
        buttons.style.display = 'none';
    }

    const game = (input) => {
        //checkAvailable
        if (playerChoice != undefined && input.target.dataset.number >= 0 && input.target.dataset.number <= 8){
            showSymbol(input); 
        } 
    }

    const showSymbol = (input) => {
       // Player Serve
       if (currentPlayer == 'Player 1'){
            player1.style.backgroundColor = 'lightblue';
            player2.style.backgroundColor = '';
            currentPlayer = 'Player 2';
            player(input,currentPlayer);
        } else {
            player2.style.backgroundColor = 'lightblue';
            player1.style.backgroundColor = '';
            currentPlayer = 'Player 1';
            player(input,currentPlayer);
        }
        checkWinner(input,currentPlayer);
        input.target.dataset.number -= 9;
       
    }
    function player(input,player){
        if (playerChoice == 'cross' && player == 'Player 1' || opponentChoice == 'cross' && player == 'Player 2'){
            input.target.children[0].style.display = 'block';
        } else if (playerChoice == 'circle' && player == 'Player 1' || opponentChoice == 'circle' && player == 'Player 2'){
            input.target.children[1].style.display = 'block';
        } 
        round++;
        gameboard.textContent = 'Round ' + round;
    }

    const checkWinner = (currentInput,currentPlayer) => {   
            if (currentPlayer == 'Player 1'){
                playerInput.push(currentInput.target.dataset.number);
            } else {
                opponentInput.push(currentInput.target.dataset.number);
            } 
            for(let [index, combo] of WINNING_COMBINATIONS.entries()) {
                // Winner Found, Refresh
                if (combo.every(elem => playerInput.indexOf(elem) > -1) || combo.every(elem => opponentInput.indexOf(elem) > -1)) {
                    gameboard.textContent = 'Congratulation, ' + currentPlayer + ' won!';
                    gameboard.style.backgroundColor = 'blue';
                    player1.style.backgroundColor = '';
                    player2.style.backgroundColor = '';
                    resetBtn.style.display = 'block';
                    boxes.forEach(box => box.dataset.number -= 9)
                    resetBtn.addEventListener('click', endgame);
                }
            }
    } 
    const endgame = () => {
        window.location.reload(false);
    }

    player1.style.backgroundColor = 'lightblue'
    circleBtn.addEventListener('click', choice, {once:true});
    crossBtn.addEventListener('click', choice, {once:true});
    boxes.forEach(box => {
        box.addEventListener('click', game);
    });
    resetBtn.addEventListener('click', endgame);
})()
