let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let tamanhoCobra = 20;
let corCobra = "white";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
var pontos = 0;

/*Tamanho da Cobrinha */
snake[0] = {
    x: 9 * box,
    y: 9 * box
}

let direction = "right";


function criarBG() {
    context.fillStyle = "purple"; /* Desenha fundo */
    context.fillRect(0,0, 16 * box, 16 * box); /* Desenha o retangulo */
}

function criarCobrinha(cor) {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = cor;
        context.fillRect(snake[i].x, snake[i].y, tamanhoCobra, tamanhoCobra);
    } 
}

function criarFood() {
    context.fillStyle = "blue";
    context.fillRect(food.x, food.y, tamanhoCobra, tamanhoCobra);
}

function btnJogo() {
    var botão = document.getElementById("game-start");
    botão.disabled = true;
    botão.style.opacity = "0";

    document.getElementById("musica-principal").play();
    /* Intervalo de 100 milisegundos para repetir a função*/
    setInterval(iniciarJogo, 100);
}


/*FUNCIONAMENTO PRINCIPAL */
document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
 }


function iniciarJogo(){

    /*Se ultrapassar os limites do Canvas, ela volta */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left")  snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    /* Caso a cobra bater nela mesma */
    for(i = 1; i < snake.length; i++) {
        if( snake[0].x == snake[i].x && snake[0].y == snake[i].y ) {
            document.getElementById("snake").remove();
            document.getElementById("musica-principal").pause();

           var divGame = document.getElementById("local-game");
           divGame.style.backgroundImage = 'url(resources/game-over.png)';
           document.getElementById("game-over").play();
           document.getElementById("pontos").innerHTML = "Você obteve " + pontos + " pontos.";
        }   
    }

    criarBG();
    criarCobrinha(corCobra);
    criarFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* Movimentação */
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    /* Mecanismo de Comida */
    if(snakeX != food.x || snakeY != food.y) { 
        snake.pop();
    } else {
        document.getElementById("efeito-comida").play();
        pontos += 1;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
       
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
