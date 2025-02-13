import { drawIsometricGrid } from "./world.js";
import { drawObjects, plantCrop, harvestCrop } from "./objects.js";
import { drawAnimals, buyChicken } from "./animals.js";
import { drawBuildings, buildBarn } from "./buildings.js";
import { gameTick } from "./time.js";
import { getBalance } from "./economy.js";
import { initBlockchain } from "./blockchain.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размер canvas под размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Привязываем функции к window, чтобы вызывать из HTML
window.plantCrop = plantCrop;
window.harvestCrop = harvestCrop;
window.buyChicken = buyChicken;
window.buildBarn = buildBarn;

// Основной цикл
function gameLoop() {
  // Обновляем логику времени (рост, баланс и т.п.)
  gameTick();

  // Очищаем холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем сетку, объекты, животных, здания
  drawIsometricGrid(ctx);
  drawObjects(ctx);
  drawAnimals(ctx);
  drawBuildings(ctx);

  requestAnimationFrame(gameLoop);
}

// Старт игры
function startGame() {
  // Инициализируем blockchain-модуль (заглушка, если потребуется)
  initBlockchain();

  // Запускаем основной цикл
  gameLoop();
}

startGame();
