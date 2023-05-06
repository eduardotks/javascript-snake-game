const canvas = document.getElementById("game"); // Get canvas element from HTML
const ctx = canvas.getContext("2d"); // Get context of canvas, return an object that contains methods and properties for drawing on canvas

const box = 20; // Size of one box
const canvasSize = 500; // Size of canvas

let snake = []; // Snake array (empty at the beginning)
snake[0] = { x: 9 * box, y: 10 * box }; // Initial position of snake (middle of canvas)

// Initial position of food (random)
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

let d; // Direction of snake
document.addEventListener("keydown", direction); // Listen for keydown event and call direction function

// Set direction of snake based on key pressed by user
function direction(event) {
  if (event.keyCode === 37 && d !== "RIGHT") d = "LEFT";
  if (event.keyCode === 38 && d !== "DOWN") d = "UP";
  if (event.keyCode === 39 && d !== "LEFT") d = "RIGHT";
  if (event.keyCode === 40 && d !== "UP") d = "DOWN";
}

/*
This is a function named collision that takes in two parameters: headSnake and snake. 
The purpose of this function is to check if the headSnake of the snake collides with any of its body segments in the snake array.
Inside the for loop, there is an if statement that checks if the x and y coordinates of the headSnake match the x and y coordinates 
of any element in the snake array.
If there is a match, it means the snake has collided with itself, and the function returns true. 
If there is no match, the function continues iterating through the snake array until the end of the loop is reached. If no collision is detected, 
the function returns false.
*/
// Check if snake collides with itself
function collision(headSnake, snake) {
  for (let i = 0; i < snake.length; i++) {
    // If snake collides with itself return true and ok the game is over, else return false and the game continues
    if (headSnake.x === snake[i].x && headSnake.y === snake[i].y) return true;
  }
  return false;
}

// Draw everything on canvas (snake, food, background)
function draw() {
  ctx.fillStyle = "#363636"; // Background color
  ctx.fillRect(0, 0, canvasSize, canvasSize); // Draw rectangle on canvas

  // Draw snake and food on canvas
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lightgray" : "darkorange"; // Head of snake is lightgray, body is darkorange
    ctx.fillRect(snake[i].x, snake[i].y, box, box); // Draw rectangle on canvas
    ctx.strokeStyle = "black"; // Stroke color
    ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Draw rectangle on canvas
  }

  ctx.fillStyle = "darkorange"; // Food color
  ctx.fillRect(food.x, food.y, box, box); // Draw rectangle on canvas

  let snakeX = snake[0].x; // Snake head x coordinate
  let snakeY = snake[0].y; // Snake head y coordinate

  if (d === "LEFT") snakeX -= box; // If snake moves left, subtract box from x coordinate
  if (d === "UP") snakeY -= box; // If snake moves up, subtract box from y coordinate
  if (d === "RIGHT") snakeX += box; // If snake moves right, add box to x coordinate
  if (d === "DOWN") snakeY += box; // If snake moves down, add box to y coordinate

  // If snake eats food, generate new food and increase snake length
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box, // Generate random x coordinate for food
      y: Math.floor(Math.random() * (canvasSize / box)) * box, // Generate random y coordinate for food
    };
  } else {
    snake.pop(); // Remove last element of snake array (snake tail) if snake doesn't eat food (snake length stays the same)
  }

  let headSnake = { x: snakeX, y: snakeY }; // New head of snake

  // If snake collides with left wall, top wall, right wall, bottom wall or itself, stop game and end interval function
  if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(headSnake, snake)) 
  {
    clearInterval(game); // Stop interval function (stop game)
  }

  snake.unshift(headSnake); // Add new body of snake to snake array (snake length increases)
}

let game = setInterval(draw, 100); // Call draw function every 100 milliseconds (game speed)
