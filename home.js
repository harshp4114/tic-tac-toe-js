let vsPlayer=document.querySelector(".play-btn-vsPlayer");
let vsComp=document.querySelector(".play-btn-vsComp");


vsComp.addEventListener("mouseover",()=>{
    vsComp.style.backgroundColor="black";
    vsComp.style.color="#A9927D";
    vsComp.style.borderColor="#A9927D";
});

vsComp.addEventListener("mouseout",()=>{
    vsComp.style.backgroundColor="#A9927D";
    vsComp.style.color="black";
    vsComp.style.borderColor="black";
});

vsPlayer.addEventListener("mouseout",()=>{
    vsPlayer.style.backgroundColor="#A9927D";
    vsPlayer.style.color="black";
    vsPlayer.style.borderColor="black";
});

vsPlayer.addEventListener("mouseover",()=>{
    vsPlayer.style.backgroundColor="black";
    vsPlayer.style.color="#A9927D";
    vsPlayer.style.borderColor="#A9927D";
});

vsComp.addEventListener("click",()=>{
    window.location.href="comp.html";
});

vsPlayer.addEventListener("click",()=>{
    window.location.href="player.html";
});