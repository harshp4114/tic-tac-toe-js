let btnGame = document.querySelectorAll(".game-btn");
let rstBtn = document.querySelector(".reset-btn");
let winnerHd = document.querySelector("#winnerHd");
let transitionDiv=document.querySelector(".transition");
let homeBtn=document.querySelector(".home-btn");
let turnO = true; //playerO turn if true
let win = false;
let corners = [0, 2, 6, 8];
let turnXnum=0;
let first = 0, second = 1, third = 2;
let firstTurn = true;
let gameDraw = 0;
let intervalID = setInterval(checkResult, 1);
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

function updateTextWithTransition(text) {
    transitionDiv.style.opacity = 0;
    setTimeout(() => {
        winnerHd.innerText = text;
        transitionDiv.style.opacity = 1;
    }, 300);
}

rstBtn.addEventListener("mouseover",()=>{
    rstBtn.style.backgroundColor="#A9927D";
    rstBtn.style.color="black";
    rstBtn.style.borderColor="#292F36";
});

rstBtn.addEventListener("mouseout",()=>{
    rstBtn.style.backgroundColor="#292F36";
    rstBtn.style.color="#F7FFF7";
    rstBtn.style.borderColor="#A9927D";
});

homeBtn.addEventListener("mouseover",()=>{
    homeBtn.style.backgroundColor="#A9927D";
    homeBtn.style.color="black";
    homeBtn.style.borderColor="#292F36";
});

homeBtn.addEventListener("mouseout",()=>{
    homeBtn.style.backgroundColor="#292F36";
    homeBtn.style.color="#F7FFF7";
    homeBtn.style.borderColor="#A9927D";
});

homeBtn.addEventListener("click",()=>{
    window.location.href="home.html";
});

//reset button implementation
rstBtn.addEventListener("click", () => {
    for (let btn of btnGame) {
        btn.innerText = "";
        btn.disabled = false;
        updateTextWithTransition("Player O's turn");
        gameDraw = 0;
        turnO = true;
        win = false;
        turnXnum=0;
        firstTurn = true;
    }
})

//function implementing computer turn every 1 sec
function compTurn(btn) {
    if (win == false) {
        gameDraw++;
        turnXnum++;
        //implementing first move of computer that is playing in any random corner
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
            //checking for possible win of computer
            for (let l = 0; l < 8; l++) {
                if (btnGame[winningPatterns[l][first]].innerText != "O" && btnGame[winningPatterns[l][second]].innerText != "O" && btnGame[winningPatterns[l][third]].innerText != "O") {
                    if (btnGame[winningPatterns[l][first]].innerText == "X" && btnGame[winningPatterns[l][second]].innerText == "X") {
                        btnGame[winningPatterns[l][third]].innerText = "X";
                        turnO = true;
                        btn.disabled = true;
                        break;
                    } else if (btnGame[winningPatterns[l][second]].innerText == "X" && btnGame[winningPatterns[l][third]].innerText == "X") {
                        btnGame[winningPatterns[l][first]].innerText = "X";
                        turnO = true;
                        btn.disabled = true;
                        break;
                    } else if (btnGame[winningPatterns[l][first]].innerText == "X" && btnGame[winningPatterns[l][third]].innerText == "X") {
                        btnGame[winningPatterns[l][second]].innerText = "X";
                        turnO = true;
                        btn.disabled = true;
                        break;
                    }
                }
            }
            //checking for possible win of player
            if (turnO == false) {
                for (let l = 0; l < 8; l++) {
                    if (btnGame[winningPatterns[l][first]].innerText != "X" && btnGame[winningPatterns[l][second]].innerText != "X" && btnGame[winningPatterns[l][third]].innerText != "X") {
                        if (btnGame[winningPatterns[l][first]].innerText == "O" && btnGame[winningPatterns[l][second]].innerText == "O") {
                            btnGame[winningPatterns[l][third]].innerText = "X";
                            turnO = true;
                            btn.disabled = true;
                            break;
                        } else if (btnGame[winningPatterns[l][second]].innerText == "O" && btnGame[winningPatterns[l][third]].innerText == "O") {
                            btnGame[winningPatterns[l][first]].innerText = "X";
                            turnO = true;
                            btn.disabled = true;
                            break;
                        } else if (btnGame[winningPatterns[l][first]].innerText == "O" && btnGame[winningPatterns[l][third]].innerText == "O") {
                            btnGame[winningPatterns[l][second]].innerText = "X";
                            turnO = true;
                            btn.disabled = true;
                            break;
                        }
                    }
                }
            }
            //making intelligent move by trying to make conmbination of two winning pattern
            if (turnO == false) {
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
                            if (winningPatterns[l][first] == index || winningPatterns[l][second] == index || winningPatterns[l][third] == index) {
                                if ((arr[winningPatterns[l][first]] == arr[winningPatterns[l][second]] && arr[winningPatterns[l][third]] == 0) || (arr[winningPatterns[l][first]] == arr[winningPatterns[l][third]] && arr[winningPatterns[l][second]] == 0) || (arr[winningPatterns[l][second]] == arr[winningPatterns[l][third]] && arr[winningPatterns[l][first]] == 0)) {
                                    putX++;
                                }
                            }
                        }
                        arr[index] = 0;
                        if (putX > 1) {
                            btnGame[index].innerText = "X";
                            btn.disabled = true;
                            turnO = true;
                            break;
                        }

                    }

                }
            }
            //making a move to build a win combination
            if (turnO == false) {
                for (let l = 0; l < 8; l++) {
                    if (btnGame[winningPatterns[l][first]] != "O" && btnGame[winningPatterns[l][second]] != "O" && btnGame[winningPatterns[l][third]] != "O") {
                        let num = 0;
                        if (btnGame[winningPatterns[l][first]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                            } while (num == first);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            btn.disabled = true;
                            turnO = true;
                            break;
                        } else if (btnGame[winningPatterns[l][second]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                            } while (num == second);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            btn.disabled = true;
                            turnO = true;
                            break;
                        } else if (btnGame[winningPatterns[l][third]] == "X") {
                            do {
                                num = Math.floor(Math.random() * 3);
                            } while (num == third);
                            btnGame[winningPatterns[l][num]].innerText = "X";
                            btn.disabled = true;
                            turnO = true;
                            break;
                        }
                    }
                }
            }
            // making any random move as there is no way to win the match for either comp or player
            if(turnO==false){
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
        updateTextWithTransition("Player O's turn");
    }
}


//O for playerO and X for playerX
for (let btn of btnGame) {
    btn.addEventListener("click", () => {
        if (turnO) {
            btn.innerText = "O";
            turnO = false;
            updateTextWithTransition("Computer's turn");
            if(turnXnum<4){
                setTimeout(()=>{compTurn(btn)},1000);
            }
        }
        btn.disabled = true;
        gameDraw++;
        if (gameDraw == 9) {
            if (win == false) {
                updateTextWithTransition("Game is resulted in a draw");
                for(let singleBtn of btnGame){
                    singleBtn.disabled=true;
                }
            }
        }
    })
}

//disabling all buttons once one player wins
function disableAll() {
    for (let btn of btnGame) {
        btn.disabled = true;
    }
}

//function to check for winner
function checkResult() {
    let i = 0;
    while (win != true && i < 8) {
        if (btnGame[winningPatterns[i][first]].innerText != "" && btnGame[winningPatterns[i][second]].innerText != "" && btnGame[winningPatterns[i][third]].innerText != "") {
            if (btnGame[winningPatterns[i][first]].innerText == btnGame[winningPatterns[i][second]].innerText && btnGame[winningPatterns[i][second]].innerText == btnGame[winningPatterns[i][third]].innerText) {
                win = true;
                let Text = "Winner is player " + btnGame[winningPatterns[i][first]].innerText;
                updateTextWithTransition(Text);
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
