let btnGame = document.querySelectorAll(".game-btn");
let rstBtn = document.querySelector(".reset-btn");
let turnO = true; //playerO turn if true
let win = false;
let winnerHd=document.querySelector("#winnerHd");
let transitionDiv=document.querySelector(".transition");
let first=0,second=1,third=2;
let gameDraw=0;
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

function updateTextWithTransition(text) {
    transitionDiv.style.opacity = 0;
    setTimeout(() => {
        winnerHd.innerText = text;
        transitionDiv.style.opacity = 1;
    }, 300);
}

//O for playerO and X for playerX
for(let btn of btnGame){
    btn.addEventListener("click",()=>{
        if(turnO){
            btn.innerText="O";
            turnO=false;
            updateTextWithTransition("Player X's turn");
        }else{
            btn.innerText="X";
            turnO=true;
            updateTextWithTransition("Player O's turn");
        }
        btn.disabled=true;
        checkResult();
        gameDraw++;
        if(gameDraw==9){
            if(win==false){
                updateTextWithTransition("Game is resulted in a draw");
            }
        }
    })
}

//reset button implementation
rstBtn.addEventListener("click",()=>{
    for(let btn of btnGame){
        btn.innerText="";
        btn.disabled=false;
        winnerHd.innerText="Player O's turn";
        gameDraw=0;
        turnO=true;
        win=false;
    }
})

//disabling all buttons once one player wins
function disableAll(){
    for(let btn of btnGame){
        btn.disabled=true;
    }
}

//function to check for winner
function checkResult(){
    let i=0;
    while(win!=true && i<8){
        if(btnGame[winningPatterns[i][first]].innerText!="" && btnGame[winningPatterns[i][second]].innerText!="" && btnGame[winningPatterns[i][third]].innerText!="" ){
            if(btnGame[winningPatterns[i][first]].innerText==btnGame[winningPatterns[i][second]].innerText && btnGame[winningPatterns[i][second]].innerText==btnGame[winningPatterns[i][third]].innerText){
                win=true;
                winnerHd.innerText="Winner is player "+btnGame[winningPatterns[i][first]].innerText;
                disableAll();
            }
            else{
                i++;
            }
        }else{
            i++;
        }
    }
}
