const play = document.getElementById('btnPlay');
const playerName = document.getElementById('inputName');
play.addEventListener('click',readname);

function readname() {
    playerNewName = playerName.value;
    console.log(playerNewName);
    localStorage.setItem('username',playerNewName);
    location.replace('blackjack.html');
}