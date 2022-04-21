import Food from "./modules/Food.js"
import ShiftingFood from "./modules/ShiftingFood.js";
import MovingFood from "./modules/MovingFood.js";
import Snake from "./modules/Snake.js"

let canvas;
let ctxt;
let world_width;
let world_height;
let game_speed_slider;
let game_loop_id;

let food = [];
let snake;

let game_paused = false;
let time_out_period = 400;
let score = 0;
let name;
let scores = [];
let key_event_registered = false;

const number_of_normal_foods = 3;
const number_of_shifting_foods = 1;
const number_of_moving_foods = 1;

function clearCanvas() {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    snake.move();
    clearCanvas();
    drawSnake();
    drawScore();
    drawFoodAfterEventuallyEating();
    if (snake.crashesIntoWall() || snake.intersectsSelf()) {
        window.clearInterval(game_loop_id);
        addScore();
        alert("game over !");
    }

    key_event_registered = false;
}

function drawFoodAfterEventuallyEating() {
    for (let f of food) {
        if (f.intersects(snake.body[0].x, snake.body[0].y, snake.blocksize, snake.blocksize)) {
            score += f.score;
            snake.grow(f.score);
            f.reposition();
            f.draw(ctxt);
        }
        f.draw(ctxt);
    }
}

function drawSnake() {
    snake.draw(ctxt);
}

function generateFood() {
    let food_index = 1;
    let i = 0;
    while (i < number_of_normal_foods) {
        let image = "images/food" + food_index + ".png";
        let newSingleFood = new Food(canvas.width, canvas.height, image, 1);
        food.push(newSingleFood);
        i++;
        food_index = (food_index % 5) + 1;
    }
    i = 0;
    while (i < number_of_shifting_foods) {
        let image = "images/food" + food_index + ".png";
        let newSingleFood = new ShiftingFood(canvas.width, canvas.height, image, 5);
        food.push(newSingleFood);
        food_index = (food_index % 5) + 1;
        i++;
    }
    i = 0;
    while (i < number_of_moving_foods) {
        let image = "images/food" + food_index + ".png";
        let newSingleFood = new MovingFood(canvas.width, canvas.height, image, 10);
        food.push(newSingleFood);
        i++;
        food_index = (food_index % 5) + 1;
    }
}

function drawScore() {
    ctxt.font = "50px Arial";
    ctxt.fillText(score, 10, 60);
}

function addScoreToTable(score_item) {
    let table = document.getElementById("tbl_resultaten");
    let tr = document.createElement("tr");

    for (let e of [score_item.date, score_item.name, score_item.score]) {
        let td = document.createElement("td");
        td.innerText = e;
        tr.appendChild(td)
    }
    table.appendChild(tr);
}

function addScore() {
    let s = {"name": name, "date": new Date().toLocaleDateString('en'), "score": score};
    scores.push(s);
    addScoreToTable(s);
    localStorage.setItem("scores", JSON.stringify(scores));
}

function loadScores() {
    let t = localStorage.getItem("scores");
    if (t !== null) {
        for (let s of JSON.parse(t)) {
            addScoreToTable(s);
            scores.push(s);
        }
    }
}

function togglePauze() {
    game_paused = !game_paused;
    if (game_paused) {
        window.clearInterval(game_loop_id);
    } else {
        game_loop_id = window.setInterval(gameLoop, time_out_period);
    }
}

function saveGame() {
    let game_state = {
        "snake": snake,
        "food": food,
        "score": score
    };

    localStorage.setItem("game_state", JSON.stringify(game_state));
}

function loadGame() {
    let game_state = JSON.parse(localStorage.getItem("game_state"));

    // load properties from JSON object
    snake.loadPropsFromJSON(game_state["snake"]);

    score = game_state["score"];
    for (let i = 0; i < game_state["food"].length; i++) {
        food[i].loadPropsFromJSON(game_state["food"][i]);
    }

    // update screen
    clearCanvas();
    drawSnake();
    drawScore();
    for (let f of food) {
        f.draw(ctxt);
    }
}

function changeGameSpeed() {
    time_out_period = 501 - game_speed_slider.value;
    window.clearInterval(game_loop_id);
    if(!game_paused){
        game_loop_id = window.setInterval(gameLoop, time_out_period);
    }
}

let keyHandler = (e) => {
    // handle only one key per iteration of the game loop
    // you could get incorrect behaviour when you tap two keys very fast (only for arrow keys)
    if (e.key === "ArrowLeft") {
        if (!key_event_registered && !game_paused) {
            key_event_registered = true;
            snake.setDirection(-1, 0);
        }
    } else if (e.key === "ArrowUp") {
        if (!key_event_registered && !game_paused) {
            key_event_registered = true;
            snake.setDirection(0, -1);
        }
    } else if (e.key === "ArrowRight") {
        if (!key_event_registered && !game_paused) {
            key_event_registered = true;
            snake.setDirection(1, 0);
        }
    } else if (e.key === "ArrowDown") {
        if (!key_event_registered && !game_paused) {
            key_event_registered = true;
            snake.setDirection(0, 1);
        }
    } else if (e.key === "p") {
        togglePauze();
    } else if (e.key === "s") {
        saveGame();
    } else if (e.key === "l") {
        loadGame();
    } else if (e.key === "c") {
        localStorage.clear();
    }
};

loadScores();

game_speed_slider = document.getElementById("gameSpeed");
game_speed_slider.onchange = changeGameSpeed;
game_speed_slider.value = time_out_period;

name = prompt("Wat is je naam?");

canvas = document.getElementById("canvas");
world_width = canvas.width;
world_height = canvas.height;
ctxt = canvas.getContext("2d");
ctxt.fillStyle = "#FF0000";

snake = new Snake(canvas.width, canvas.height);
generateFood();

/*onkeypress is enkel voor toetsen die letters/tekens teruggeven*/
document.addEventListener("keydown", keyHandler);
game_loop_id = window.setInterval(gameLoop, time_out_period);


