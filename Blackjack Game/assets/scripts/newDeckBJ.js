
let newDeck = [];
const BJrules = document.getElementById("B2");
const showCard = document.getElementById("result");
const showDeckInfoPanel = document.getElementById("container2");
const newBet = document.getElementById("newBet");
const inputBet = document.getElementById("inputBet");
const score = document.getElementById("score");
const whoWin = document.getElementById("A1");
const gameResult = document.getElementById("gameResult");
const betBtn = document.getElementById("btnBet");
const hitBtn = document.getElementById("btnHit");
const standBtn = document.getElementById("btnStand");
const BestScore = document.getElementById("bestScore");
const username = localStorage.getItem('username');

const dc1 = document.getElementById("dc1");
const dc2 = document.getElementById("dc2");
const dc3 = document.getElementById("dc3");
const dc4 = document.getElementById("dc4");
const dc5 = document.getElementById("dc5");
const pc1 = document.getElementById("pc1");
const pc2 = document.getElementById("pc2");
const pc3 = document.getElementById("pc3");
const pc4 = document.getElementById("pc4");
const pc5 = document.getElementById("pc5");


document.getElementById("B1").addEventListener("click", Refresh);
document.getElementById("C1").addEventListener("click", Exit);
betBtn.addEventListener("click", bet);
hitBtn.addEventListener("click", Hit);
standBtn.addEventListener("click", Stand);

BJrules.innerText = `Blackjack, cunoscut si sub numele de 21, este un joc des intalnit in cazinouri. Jocul a castigat popularitate deoarece este usor de jucat, jucatorul ce are suma cartilor 21 sau cel mai aproape de 21 castiga.
Valoarea cartilor: cartile intre 2 si 10 au valoarea scrise pe ele, figurile au valoarea 10, asul poate fi 1 sau 11 dupa preferinta jucatorului.

Derularea jocului: fiecare jucator primeste initial 2 carti ce vor fi afisate tuturor participantilor la joc. Dealer-ul (casa) va primi tot 2 carti, dintre care una cu fata in jos. Dupa impartire fiecare jucator are sansa de a avea suma cartilor 21, sau cat mai aproape dupa cum urmeaza.

Decizia jucatorului: Dupa impartirea cartilor jucatorul poate alege intre 4 optiuni standard: hit, stand, split, double down. La unele mese de joc, se poate apela si la optiunea surrender.

HIT: mai iau o carte.

STAND: nu mai iau carte.
Decizia casei:

SOFT 17: Cand suma cartilor dealerului este sub 17, acesta trebuie sa mai traga o carte. Daca suma este 17 sau mai mare dealerul nu mai are voie la o alta carte.

BLACKJACK: Daca un jucator are din impartirea cartilor suma 21 primeste de la casa (3:2)x valoarea pariului.`;
BJrules.style.fontSize = "16px";

pc1.style.display = "none";
pc2.style.display = "none";
dc1.style.display = "none";
dc2.style.display = "none";
pc3.style.display = "none";
pc4.style.display = "none";
pc5.style.display = "none";
dc3.style.display = "none";
dc4.style.display = "none";
dc5.style.display = "none";

hitBtn.style.display = "none";
standBtn.style.display = "none";
whoWin.innerText = `Hello ${username} :D Good Luck`
let bestScore = 0;
let totalPlayer = 0;
let totalDealer = 0;
let playerBet = 0;
let playerScore = 1000;
let newCard1;
let newCard2;
let newCard3;
let newCard4;
let newCard5;
let newCard6;
let newCard7;
let newCard8;
let newCard9;
let newCard10;

// newDeckOfCards();

function Refresh() {
    location.reload();
}

function Exit() {
    if (confirm("Exit game?")) {
        window.close();
    }
}
function newDeckOfCards() {
    const cardTypes = ["Hearts", "Diamonds", "Spades", "Clubs"];
    newDeck = [];
    let j = 0;
    let x = 2;
    for (let i = 1; i < 53; i++) {
        cardType = cardTypes[j];
        if (x === 11) {
            iSpecial = "A";
            BJValue = 1;
            BJValueA = 10;
        } else if (x === 12) {
            iSpecial = "J";
            BJValue = 10;
            BJValueA = 0;
        } else if (x === 13) {
            iSpecial = "Q";
            BJValue = 10;
            BJValueA = 0;
        } else if (x === 14) {
            iSpecial = "K";
            BJValue = 10;
            BJValueA = 0;
        } else {
            iSpecial = `${x}`;
            BJValue = x;
            BJValueA = 0;
        }
        card = {
            NDcardNr: x,
            NDBJValue: BJValue,
            NDBJValueA: BJValueA,
            NDiSpecial: iSpecial,
            NDcardType: cardType,
            NDrandomID: Math.floor(Math.random() * Math.pow(10, 7)),
            NDcardName: `Card ${iSpecial} of ${cardType}`,
        };
        newDeck.push(card);
        x++;
        if (x === 15) {
            x = 2;
            j++;
        }
    }
    amestecaPack(newDeck);
    dc1.innerHTML = "";
    dc2.innerHTML = "";
    dc3.innerHTML = "";
    dc4.innerHTML = "";
    dc5.innerHTML = "";
    pc1.innerHTML = "";
    pc2.innerHTML = "";
    pc3.innerHTML = "";
    pc4.innerHTML = "";
    pc5.innerHTML = "";
    newGame();
}

function CreateNewCard(place, nr, type) {
    place.innerHTML = `
  <div id="card0">
    <div id="card0A">
      <img class="specialImg" src="assets/styles/img/${type}.png" />
    </div>
    <div id="card0B">${nr}</div>
  </div>
    `;
}

function NDrandomCard() {
    newDeckOfCards();
    let random = Math.floor(Math.random() * 53);
    newDeck.forEach((card) => {
        if (card.NDnr == random) {
            CreateNewCard(showCard, card.NDiSpecial, card.NDcardType);
        }
    });
    newDeck = [];
}

function amestecaPack(deck) {
    deck.sort(function (a, b) {
        return a.NDrandomID - b.NDrandomID;
    });
    // console.log(deck);
}

function packInfo() {
    newDeck.forEach((card) => {
        text = showDeckInfoPanel.innerText;
        showDeckInfoPanel.innerText = `${text} ${card.NDrandomID} ${card.NDcardName} ${card.NDnr}  \n`;
    });
}

function shuffleCards() {
    let i = 0;
    for (card of cards) {
        CreateNewCard(card, newDeck[i].NDiSpecial, newDeck[i].NDcardType);
        i++;
    }
}

function newGame() {
    totalPlayer = 0;
    totalDealer = 0;
    newCard1 = newDeck.shift();
    newCard2 = newDeck.shift();
    newCard3 = newDeck.shift();
    newCard4 = newDeck.shift();
    newCard5 = newDeck.shift();
    newCard6 = newDeck.shift();
    newCard7 = newDeck.shift();
    newCard8 = newDeck.shift();
    newCard9 = newDeck.shift();
    newCard10 = newDeck.shift();
    CreateNewCard(dc1, newCard1.NDiSpecial, newCard1.NDcardType);
    // CreateNewCard(dc2, newCard2.NDiSpecial, newCard2.NDcardType);
    CreateNewCard(pc1, newCard3.NDiSpecial, newCard3.NDcardType);
    CreateNewCard(pc2, newCard4.NDiSpecial, newCard4.NDcardType);
    totalDealer = totalDealer + newCard1.NDBJValue + newCard2.NDBJValue;
    totalPlayer = totalPlayer + newCard3.NDBJValue + newCard4.NDBJValue;

    totalDealerMax = totalDealer + newCard1.NDBJValueA;
    if (totalDealerMax + 10 < 22) {
        totalDealerMax += newCard2.NDBJValueA;
    }
    totalDealer = totalDealerMax;

    totalPlayerMax = totalPlayer + newCard3.NDBJValueA;
    if (totalPlayerMax + 10 < 22) {
        totalPlayerMax += newCard4.NDBJValueA;
    }
    totalPlayer = totalPlayerMax;

    // console.log(
    //     newCard1,
    //     newCard2,
    //     newCard3,
    //     newCard4,
    //     newCard5,
    //     newCard6,
    //     newCard7,
    //     newCard8,
    //     newCard9,
    //     newCard10,
    //     "total player:",
    //     totalPlayer,
    //     "total dealer:",
    //     totalDealer
    // );
    checkPlayer();
}

function Hit() {
    if (pc3.innerHTML == "") {
        // newCard5 = newDeck.shift();
        CreateNewCard(pc3, newCard5.NDiSpecial, newCard5.NDcardType);
        pc3.style.display = "block";
        totalPlayer += newCard5.NDBJValue + newCard5.NDBJValueA;
        if (totalPlayer > 21) {
            totalPlayer =
                newCard3.NDBJValue + newCard4.NDBJValue + newCard5.NDBJValue;
        }
        whoWin.innerText = `${username}: ${totalPlayer} `;
    } else if (pc4.innerHTML == "") {
        // newCard6 = newDeck.shift();
        CreateNewCard(pc4, newCard6.NDiSpecial, newCard6.NDcardType);
        pc4.style.display = "block";
        totalPlayer += newCard6.NDBJValue + newCard6.NDBJValueA;
        if (totalPlayer > 21) {
            totalPlayer =
                newCard3.NDBJValue +
                newCard4.NDBJValue +
                newCard5.NDBJValue +
                newCard6.NDBJValue;
        }
        whoWin.innerText = `${username}: ${totalPlayer} `;
    } else {
        CreateNewCard(pc5, newCard9.NDiSpecial, newCard9.NDcardType);
        pc5.style.display = "block";
        totalPlayer += newCard9.NDBJValue + newCard9.NDBJValueA;
        if (totalPlayer > 21) {
            totalPlayer =
                newCard3.NDBJValue +
                newCard4.NDBJValue +
                newCard5.NDBJValue +
                newCard6.NDBJValue +
                newCard9.NDBJValue;
        }
        whoWin.innerText = `${username}: ${totalPlayer} `;
    }
    // console.log(
    //     `Player total: ${totalPlayer} and Dealer total: ${totalDealer}`
    // );
    checkPlayer();
}

function Stand() {
    CreateNewCard(dc2, newCard2.NDiSpecial, newCard2.NDcardType);
    checkDealer();
}

function checkPlayer() {
    if (totalPlayer == 21) {
        // CreateNewCard(dc2, newCard2.NDiSpecial, newCard2.NDcardType);
        // dc2.style.backgroundImage = 'none';
        whoWin.innerText = `${username}: ${totalPlayer} and Dealer: ${totalDealer}`;
        newBet.style.display = "block";
        betBtn.style.display = "block";
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        playerScore += playerBet * 2.5;
        gameResult.innerText = `You WIN ${playerBet * 2.5}`;
        setTimeout(() => {
            alert(`${username} WIN - BLACKJACK`);
        }, 1000);
    } else if (totalPlayer > 21) {
        // checkForA();

        whoWin.innerText = `${username}: ${totalPlayer}`;
        gameResult.innerText = `You LOST ${playerBet}`;
        newBet.style.display = "block";
        betBtn.style.display = "block";
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        checkGameOver();
        setTimeout(() => {
            alert(`Dealer WIN - ${username} cards > 21`);
        }, 1000);
        // alert("Dealer WIN - Player cards > 21");
    }
    score.innerText = playerScore;
}

function checkDealer() {
    dc2.style.backgroundImage = "none";
    if (totalDealer > 21) {
        whoWin.innerText = `${username}: ${totalPlayer} and Dealer: ${totalDealer}`;
        newBet.style.display = "block";
        betBtn.style.display = "block";
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        playerScore += playerBet * 2;
        gameResult.innerText = `${username} WIN ${playerBet * 2}`;
        setTimeout(() => {
            alert(`${username} WIN - Dealer cards > 21`);
        }, 1000);
    } else if (totalDealer == 21) {
        if (totalPlayer == 21) {
            whoWin.innerText = `${username}: ${totalPlayer} and Dealer: ${totalDealer}`;
            newBet.style.display = "block";
            betBtn.style.display = "block";
            hitBtn.style.display = "none";
            standBtn.style.display = "none";
            gameResult.innerText = `It's a DRAW`;
            playerScore += playerBet * 1;

            setTimeout(() => {
                alert("It's a DRAW");
            }, 1000);
        } else {
            whoWin.innerText = `${username}: ${totalPlayer} and Dealer: ${totalDealer}`;
            gameResult.innerText = `You LOST ${playerBet}`;
            newBet.style.display = "block";
            betBtn.style.display = "block";
            hitBtn.style.display = "none";
            standBtn.style.display = "none";
            checkGameOver();

            setTimeout(() => {
                alert("Dealer WIN - BLACKJACK");
            }, 1000);
        }
    } else if (totalDealer < 17) {
        if (dc3.innerHTML == "") {
            // newCard5 = newDeck.shift();
            CreateNewCard(dc3, newCard7.NDiSpecial, newCard7.NDcardType);
            dc3.style.display = "block";
            totalDealer += newCard7.NDBJValue + newCard7.NDBJValueA;

            if (totalDealer > 21) {
                totalDealer =
                    newCard1.NDBJValue +
                    newCard2.NDBJValue +
                    newCard7.NDBJValue;
            }
        } else if (dc4.innerHTML == "") {
            // newCard6 = newDeck.shift();
            CreateNewCard(dc4, newCard8.NDiSpecial, newCard8.NDcardType);
            dc4.style.display = "block";
            totalDealer += newCard8.NDBJValue + newCard8.NDBJValueA;
            if (totalDealer > 21) {
                totalDealer =
                    newCard1.NDBJValue +
                    newCard2.NDBJValue +
                    newCard7.NDBJValue +
                    newCard8.NDBJValue;
            }
        } else {
            CreateNewCard(dc5, newCard10.NDiSpecial, newCard10.NDcardType);
            dc5.style.display = "block";
            totalDealer += newCard10.NDBJValue + newCard10.NDBJValueA;
            if (totalDealer > 21) {
                totalDealer =
                    newCard1.NDBJValue +
                    newCard2.NDBJValue +
                    newCard7.NDBJValue +
                    newCard8.NDBJValue +
                    newCard10.NDBJValue;
            }
        }
        checkDealer();
    } else {
        if (totalDealer > totalPlayer) {
            newBet.style.display = "block";
            betBtn.style.display = "block";
            hitBtn.style.display = "none";
            standBtn.style.display = "none";
            whoWin.innerText = `Player: ${totalPlayer} and Dealer: ${totalDealer}`;
            gameResult.innerText = `You LOST ${playerBet}`;
            checkGameOver();

            setTimeout(() => {
                alert("Dealer WIN");
            }, 1000);
        } else if (totalDealer == totalPlayer) {
            newBet.style.display = "block";
            betBtn.style.display = "block";
            hitBtn.style.display = "none";
            standBtn.style.display = "none";
            whoWin.innerText = `Player: ${totalPlayer} and Dealer: ${totalDealer}`;
            playerScore += playerBet * 1;
            gameResult.innerText = `It's a DRAW`;

            setTimeout(() => {
                alert("DRAW");
            }, 1000);
        } else {
            newBet.style.display = "hidden";
            betBtn.style.display = "block";
            hitBtn.style.display = "none";
            standBtn.style.display = "none";
            whoWin.innerText = `Player: ${totalPlayer} and Dealer: ${totalDealer}`;
            playerScore += playerBet * 2;
            gameResult.innerText = `You WIN ${playerBet * 2}`;
            setTimeout(() => {
                alert(`${username} WIN`);
            }, 1000);
        }
    }
    // console.log(totalDealer);
    score.innerText = playerScore;
}

function bet() {
    newDeckOfCards();

    bestScore = localStorage.getItem("bestScore");
    if (bestScore < playerScore) {
        bestScore = playerScore;
        localStorage.setItem("bestScore", bestScore);
    }
    BestScore.innerText = `${username} Best Score: ${bestScore}`;

    if (inputBet.value > playerScore) {
        playerBet = playerScore;
    } else {
        playerBet = inputBet.value;
    }
    playerScore -= playerBet;
    score.innerText = playerScore;

    betBtn.style.display = "none";
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    whoWin.innerText = `${username}: ${totalPlayer} `;
    newBet.style.display = "none";
    gameResult.innerText = `${username} bet: ${playerBet}`;

    dc2.style.backgroundImage = "radial-gradient(black, red)";
    pc1.style.display = "block";
    pc2.style.display = "block";
    dc1.style.display = "block";
    dc2.style.display = "block";
    pc3.style.display = "none";
    pc4.style.display = "none";
    pc5.style.display = "none";
    dc3.style.display = "none";
    dc4.style.display = "none";
    dc5.style.display = "none";
}

function checkGameOver() {
    if (playerScore == 0) {
        whoWin.innerText = `You LOST - GAME OVER `;
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        betBtn.style.display = "none";
        newBet.innerText = "GAME OVER";
    }
}
