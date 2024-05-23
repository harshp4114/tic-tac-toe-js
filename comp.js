let btnGame = document.querySelectorAll(".game-btn");
let rstBtn = document.querySelector(".reset-btn");
let turnO = true; //playerO turn if true
let win = false;
let winnerHd = document.querySelector("#winnerHd");
let corners = [0, 2, 6, 8];
let turnXnum=0;
let first = 0, second = 1, third = 2;
let firstTurn = true;
let gameDraw = 0;
let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function compTurn(btn) {
    if (win == false) {
        gameDraw++;
        turnXnum++;
        if (firstTurn) {
            let ind = 0;
            let randomCorner = Math.floor(Math.random() * 4);
            for (let i = 0; i < 9; i++) {
                if (btnGame[i] == btn) {
                    ind = i;
                }
            }
            do {
                randomCorner = Math.floor(Math.random() * 4);
            } while (corners[randomCorner] == ind);
            btnGame[corners[randomCorner]].innerText = "X";
            turnO = true;
            btn.disabled = true;
            firstTurn = false;
        } else {
            for (let l = 0; l < 8; l++) {
                if (btnGame[winningPatterns[l][first]].innerText != "O" && btnGame[winningPatterns[l][second]].innerText != "O" && btnGame[winningPatterns[l][third]].innerText != "O") {
                    if (btnGame[winningPatterns[l][first]].innerText == "X" && btnGame[winningPatterns[l][second]].innerText == "X") {
                        btnGame[winningPatterns[l][third]].innerText = "X";
                        // console.log("check for win");

                        turnO = true;
                        btn.disabled = true;
                        break;
                    } else if (btnGame[winningPatterns[l][second]].innerText == "X" && btnGame[winningPatterns[l][third]].innerText == "X") {
                        btnGame[winningPatterns[l][first]].innerText = "X";
                        // console.log("check for win");

                        turnO = true;
                        btn.disabled = true;
                        break;
                    } else if (btnGame[winningPatterns[l][first]].innerText == "X" && btnGame[winningPatterns[l][third]].innerText == "X") {
                        btnGame[winningPatterns[l][second]].innerText = "X";
                        turnO = true;
                        // console.log("check for win");

                        btn.disabled = true;
                        break;
                    }
                }
            }
            if (turnO == false) {
                for (let l = 0; l < 8; l++) {
                    if (btnGame[winningPatterns[l][first]].innerText != "X" && btnGame[winningPatterns[l][second]].innerText != "X" && btnGame[winningPatterns[l][third]].innerText != "X") {
                        if (btnGame[winningPatterns[l][first]].innerText == "O" && btnGame[winningPatterns[l][second]].innerText == "O") {
                            btnGame[winningPatterns[l][third]].innerText = "X";
                            // console.log("check for oppo win");
                            turnO = true;
                            btn.disabled = true;
                            break;
                        } else if (btnGame[winningPatterns[l][second]].innerText == "O" && btnGame[winningPatterns[l][third]].innerText == "O") {
                            btnGame[winningPatterns[l][first]].innerText = "X";
                            // console.log("check for oppo win");
                            turnO = true;
                            btn.disabled = true;
                            break;
                        } else if (btnGame[winningPatterns[l][first]].innerText == "O" && btnGame[winningPatterns[l][third]].innerText == "O") {
                            btnGame[winningPatterns[l][second]].innerText = "X";
                            // console.log("check for oppo win");
                            turnO = true;
                            btn.disabled = true;
                            break;
                        }
                    }
                }
            }

            if (turnO == false) {
                // console.log("intelligent");
                let i = 0;
                let putX = 0;
                let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let bt of btnGame) {
                    if (bt.innerText == "X") {
                        arr[i] = 1;
                    } else if (bt.innerText == "O") {
                        arr[i] = 2;
                    }
                    i++;
                }
                for (let index = 0; index < 9; index++) {
                    if (arr[index] == 0) {
                        arr[index] = 1;
                        for (let l = 0; l < 8; l++) {
                            // console.log(index);
                            if (winningPatterns[l][first] == index || winningPatterns[l][second] == index || winningPatterns[l][third] == index) {
                                // console.log("inside intelligent");
                                if ((arr[winningPatterns[l][first]] == arr[winningPatterns[l][second]] && arr[winningPatterns[l][third]] == 0) || (arr[winningPatterns[l][first]] == arr[winningPatterns[l][third]] && arr[winningPatterns[l][second]] == 0) || (arr[winningPatterns[l][second]] == arr[winningPatterns[l][third]] && arr[winningPatterns[l][first]] == 0)) {
                                    // console.log(`winning pattern : ${winningPatterns[l]}`);
                                    // console.log(`arr : ${arr[winningPatterns[l][first]]}, ${arr[winningPatterns[l][first]]}, ${arr[winningPatterns[l][first]]}`);
                                    putX++;
                                }
                            }
                        }
                        arr[index] = 0;
                        if (putX > 1) {
                            // console.log("intelligent placement");
                            btnGame[index].innerText = "X";
                            btn.disabled = true;
                            turnO = true;
                            break;
                        }

                    }

                }
            }

            if (turnO == false) {
                // console.log("making win");
                for (let l = 0; l < 8; l++) {
                    if (btnGame[winningPatterns[l][first]] != "O" && btnGame[winningPatterns[l][second]] != "O" && btnGame[winningPatterns[l][third]] != "O") {
                        let num = 0;
                        if (btnGame[winningPatterns[l][first]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                                // console.log("hiiii1");
                            } while (num == first);
                            // console.log(winningPatterns[l][num]);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            btn.disabled = true;
                            // console.log("making win");
                            turnO = true;
                            break;
                        } else if (btnGame[winningPatterns[l][second]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                                // console.log("hiiii2");
                            } while (num == second);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            // console.log("making win");
                            btn.disabled = true;
                            turnO = true;
                            break;
                        } else if (btnGame[winningPatterns[l][third]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                                // console.log("hiiii3");
                            } while (num == third);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            // console.log("making win");
                            btn.disabled = true;
                            turnO = true;
                            break;
                        }
                    }
                }
            }

            if(turnO==false){
                // console.log("random");
                for(let a=0;a<9;a++){
                    if(btnGame[a].innerText==""){
                        btnGame[a].innerText="X";
                        turnO=true;
                        btnGame[a].disabled=true;
                        break;
                    }
                }
            }
        }
    }

}


//O for playerO and X for playerX
for (let btn of btnGame) {
    btn.addEventListener("click", () => {
        if (turnO) {
            btn.innerText = "O";
            turnO = false;
            winnerHd.innerText = "Player X's turn";
            if(turnXnum<4){
                setTimeout(()=>{compTurn(btn)},1000);
            }
        }
        btn.disabled = true;
        gameDraw++;
        if (gameDraw == 9) {
            if (win == false) {
                winnerHd.innerText = "Game is resulted in a draw";
                for(let singleBtn of btnGame){
                    singleBtn.disabled=true;
                }
            }
        }
    })
}
let intervalID = setInterval(checkResult, 1);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//reset button implementation
rstBtn.addEventListener("click", () => {
    for (let btn of btnGame) {
        btn.innerText = "";
        btn.disabled = false;
        winnerHd.innerText = "Player O's turn";
        gameDraw = 0;
        turnO = true;
        win = false;
    }
})

//disabling all buttons once one player wins
function disableAll() {
    for (let btn of btnGame) {
        btn.disabled = true;
    }
}

//function to check for winner
function checkResult() {
    // console.log("hiii");
    let i = 0;
    while (win != true && i < 8) {
        // console.log("inside");
        if (btnGame[winningPatterns[i][first]].innerText != "" && btnGame[winningPatterns[i][second]].innerText != "" && btnGame[winningPatterns[i][third]].innerText != "") {
            if (btnGame[winningPatterns[i][first]].innerText == btnGame[winningPatterns[i][second]].innerText && btnGame[winningPatterns[i][second]].innerText == btnGame[winningPatterns[i][third]].innerText) {
                win = true;
                // console.log("inside if condition of check result");
                winnerHd.innerText = "Winner is player " + btnGame[winningPatterns[i][first]].innerText;
                disableAll();
            }
            else {
                i++;
            }
        } else {
            i++;
        }
    }
}
