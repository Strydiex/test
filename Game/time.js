import { updateCropsGrowth } from "./objects.js";

// Игровое время (в днях + переключение дня/ночи)
let gameTime = {
  days: 0,
  daySegment: 0 // 0 = день, 1 = ночь
};

// Счетчик кадров
let ticks = 0;

// Каждую "X" секунд/кадров увеличиваем день
const TICKS_PER_DAY = 600; // примерно 10 сек при 60fps

export function gameTick() {
  ticks++;

  // Каждое прохождение TICKS_PER_DAY — переходим на следующий день
  if (ticks >= TICKS_PER_DAY) {
    ticks = 0;
    gameTime.days++;
    // Простейшее чередование день/ночь
    gameTime.daySegment = (gameTime.daySegment === 0) ? 1 : 0;

    // Обновляем растения (рост)
    updateCropsGrowth(gameTime.days);

    // Обновляем UI
    updateTimeUI();
  }
}

// Обновляем текст о времени на экране
function updateTimeUI() {
  const timeElem = document.getElementById("gameTime");
  timeElem.textContent = `День ${gameTime.days}${
    gameTime.daySegment === 0 ? " (День)" : " (Ночь)"
  }`;
}

export function getGameTime() {
  return gameTime;
}
