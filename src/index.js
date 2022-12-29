const boxes = Array.from(document.getElementsByClassName("box"));
const clearBtn = document.getElementById("Clear");
const gameBtn = document.getElementById("NewGame")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
let pointsP1 = document.getElementById("pointsPlayer1")
let pointsP2 = document.getElementById("pointsPlayer2")
const title = document.getElementById("title")
const root = document.querySelector(":root")
const X_player = "X";
const O_player = "O";
let currentPLayer = X_player;
const playersMovements = Array(9).fill(false);
const winnCondintion = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let playersMovementsCounter = 0

disabledNames(true)
gameBtn.addEventListener('click',startGame)

function startGame(){
  clearNames()
  clearBoard()
  clearPoints()
  disabledNames(false)
  player1.focus()
  gameBtn.innerText = "NewGame"
  clearBtn.addEventListener("click", clearBoard);
}

function boardClicked(e) {
  disabledNames(true)
  let currentBox = e.target;
  if (!playersMovements[currentBox.id]) {
    playersMovements[currentBox.id] = currentPLayer
    currentBox.innerText = currentPLayer;
    playersMovementsCounter++
   
    if(Winner() !== false){
      addPoints()
      let winnBoxes = Winner()

      winnBoxes.map(box=>{
        boxes[box].style.color = "var(--secundaryColor)"
      })
      boxes.forEach((box) => {box.removeEventListener("click", boardClicked)})
      return
    }

    if(playersMovementsCounter ==9){
      title.innerText = "DRAW"
    }

    changePlayers();
  }
}

function changePlayers() {
  if (currentPLayer == X_player) {
    currentPLayer = O_player;
    player1.style.color = "var(--gameLine)"
    player2.style.color = "var(--primaryColor)"
  } else {
    currentPLayer = X_player;
    player1.style.color = "var(--primaryColor)"
    player2.style.color = "var(--gameLine)"
  }
}

function Winner(){
  for (const item of winnCondintion) {
    let [a,b,c] = item
    
    if(playersMovements[a] && ((playersMovements[a] == playersMovements[b]) &&(playersMovements[a] == playersMovements[c]))){
      return [a,b,c]
    }
  }

  return false
}

function addPoints(){
  if(currentPLayer == X_player){
    title.innerText = `${player1.value} WON`
    pointsP1.innerText = `${parseFloat(pointsP1.innerText) +1 }`
  } else {
    title.innerText = `${player2.value} WON`
    pointsP2.innerText = `${parseFloat(pointsP2.innerText) +1 }`
  }
}

function clearBoard() {
  playersMovements.fill(null);
  title.innerText = "TIC TAC TOE"
  boxes.forEach((box) => {
    box.innerText = ""
    box.style.color = "var(--primaryColor)"
    box.addEventListener("click",boardClicked)
  });
  playersMovementsCounter = 0
}

function clearPoints(){
  pointsP1.innerText = 0
  pointsP2.innerText = 0
}

function clearNames(){
  player1.style.color = "var(--gameLine)"
  player2.style.color = "var(--gameLine)"
  player1.innerText = "Player1"
  player2.innerText = "Player2"
  title.innerText = "TIC TAC TOE"
}

function disabledNames(true_false){
  player1.disabled = true_false
  player2.disabled = true_false
}
