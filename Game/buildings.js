import { updateBalance } from "./economy.js";

let buildings = [];

// Загружаем спрайт амбара
const barnImg = new Image();
barnImg.src = "assets/barn.png"; // Пусть размер амбара 64х64

export function buildBarn() {
  if (!updateBalance(-50)) return;

  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  buildings.push({
    type: "barn",
    x,
    y
  });
}

export function drawBuildings(ctx) {
  buildings.forEach((building) => {
    const isoX = (building.x - building.y) * 40 + ctx.canvas.width / 2 - 20;
    const isoY = (building.x + building.y) * 20;

    if (building.type === "barn") {
      if (barnImg.complete) {
        // Позиция и смещение подгоняются под реальный размер
        ctx.drawImage(barnImg, isoX - 32, isoY - 48, 64, 64);
      } else {
        // Если картинка не загрузилась, делаем временную заливку
        ctx.fillStyle = "#964B00";
        ctx.fillRect(isoX, isoY - 10, 30, 30);
      }
    }
  });
}
