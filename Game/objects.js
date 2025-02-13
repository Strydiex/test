import { updateBalance } from "./economy.js";
import { getGameTime } from "./time.js";

// Храним наши грядки
let crops = [];

// Массив картинок для 4 стадий роста
const cropImages = [];

for (let i = 0; i < 4; i++) {
  const img = new Image();
  img.src = `assets/crop_stage${i}.png`; // пути к вашим картинкам
  cropImages.push(img);
}

/**
 * Посадка грядки
 */
export function plantCrop() {
  if (crops.length >= 50) return; // Примерный лимит
  if (!updateBalance(-10)) {
    // Если мало денег
    return;
  }

  // Случайные координаты
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  crops.push({
    x,
    y,
    plantedDay: getGameTime().days,
    growthStage: 0
  });
}

/**
 * Сбор грядки
 */
export function harvestCrop() {
  if (crops.length === 0) return;

  const harvested = crops.pop();
  const currentDay = getGameTime().days;
  const growthDuration = currentDay - harvested.plantedDay;
  const profit = 5 + growthDuration * 5;

  updateBalance(profit);
}

/**
 * Обновление стадии роста (вызывается из `time.js` при смене дня)
 */
export function updateCropsGrowth(currentDay) {
  crops.forEach((crop) => {
    const age = currentDay - crop.plantedDay;
    crop.growthStage = Math.min(Math.floor(age / 2), 3);
  });
}

/**
 * Отрисовка грядок
 */
export function drawObjects(ctx) {
  crops.forEach((crop) => {
    const isoX = (crop.x - crop.y) * 40 + ctx.canvas.width / 2 - 20;
    const isoY = (crop.x + crop.y) * 20;

    // Получаем нужную картинку по стадии роста
    const img = cropImages[crop.growthStage];
    if (img.complete) {
      // Допустим, каждая картинка 32х32 (или другой размер)
      ctx.drawImage(img, isoX - 16, isoY - 16, 32, 32);
    } else {
      // На случай, если изображение еще грузится
      ctx.fillStyle = "yellow";
      ctx.fillRect(isoX, isoY, 10, 10);
    }
  });
}
