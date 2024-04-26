const playBoard = document.querySelector(".play-board");
const scoreElment = document.querySelector(".score");
const highScoreElment = document.querySelector(".high-score");



// Variables del juego

let gameOver = false; 

let foodX, foodY;

let snakeX = 5, snakeY = 10;

let snakeBody = []; 

let velocityX = 0, velocityY = 0;

let  setIntervalId; 

let  score = 0; 

let highScore = localStorage.getItem("high-score") || 0;
highScoreElment.innerHTML = `High Score: ${highScore}`;



// Funciones para cambiar la posicion de la comida

const changFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

//Funciones fin de juego 

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("¡GAMER OVER!");
  location.reload();
}

// Funcion para cambiar la dirrecion de Snake
const changDirection = (e) => {
  console.log(e);

  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Función para cambiar la dirección de la serpiente
const changeDirection = (direction) => {
    if (direction === 'up' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (direction === 'down' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (direction === 'left' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (direction === 'right' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

// Añade un evento de clic a cada control de dirección
const controls = document.querySelectorAll('.control');
controls.forEach(control => {
    control.addEventListener('click', () => {
        const direction = control.getAttribute('data-direction');
        changeDirection(direction);
    });
});

 

function updateScore(newScore) {
  scoreValueElement.textContent = newScore;
}

// Funcion principal del juego 

const initGame = () => {
  
  if(gameOver){
    return handleGameOver();
  } 
  // Cambiar la visualización de la comida utilizando las coordenadas correctas
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  // Verificar si la serpiente ha comido la comida
  if (snakeX === foodX && snakeY === foodY) {
      changFoodPosition();
      snakeBody.push([foodX, foodY ]);
      score++; 

      highScore = score >= highScore ? score : highScore;
      localStorage.setItem("high-score", highScore);
      scoreElment.innerHTML = `<i class="fas fa-trophy"></i> Score: ${score}`;
      highScoreElment.innerHTML = `<i class="fas fa-crown"></i> High Score: ${highScore}`;

      //console.log(snakeBody)
  }

  // Actualizar la posición y el tamaño de la cabeza de la serpiente
  
  for(let i = snakeBody.length - 1; i> 0; i--){
    snakeBody[i]  = snakeBody[i - 1 ];
  }

  snakeBody[0] =[snakeX,snakeY];
  
  snakeX += velocityX;
  snakeY += velocityY;

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
     gameOver = true; 


  }

  // Añadir la cabeza de la serpiente al tablero
  for(let i =0; i <snakeBody.length; i++ ){
  htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

  if(i !== 0 && snakeBody[0][1] === snakeBody[i][1]  && snakeBody[0][0] === snakeBody[i][0]){
       gameOver = true; 
  }

}
  // Actualizar el tablero con el nuevo HTML
  playBoard.innerHTML = htmlMarkup;
};

changFoodPosition();
// initGame();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changDirection);
