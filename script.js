let audioTurn = new Audio("Tools/ting.mp3");
let gameover = new Audio("Tools/gameover.mp3");
let turn = "X";
let isgameover = false;
let count = 0;
// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let flag = 0;
    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            flag = 1;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
                "200px";
        }
    });
    if (count === 9 && flag === 0) {
        document.querySelector(".info").innerText = "Game Tie! Please Reset";
        isgameover = true;
        gameover.play();
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            count++;
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
            }
        }
    });
});

//Add onclick listener to reset button.
reset.addEventListener("click", () => {
    let boxtext = document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    count = 0;
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
        "0px";
});
