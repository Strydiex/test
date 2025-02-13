import { updateBalance } from "./economy.js";

let animals = [];

// Загружаем спрайт курицы
const chickenImg = new Image();
chickenImg.src = "assets/chicken.png";

export function buyChicken() {
  if (!updateBalance(-30)) return;

  animals.push({
    type: "chicken",
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
    frame: 0
  });
}

export function drawAnimals(ctx) {
  animals.forEach((animal) => {
    const isoX = (animal.x - animal.y) * 40 + ctx.canvas.width / 2 - 20;
    const isoY = (animal.x + animal.y) * 20;

    if (animal.type === "chicken") {
      // Проверяем, загрузилась ли картинка
      if (chickenImg.complete) {
        // Например, картинка 32x32
        ctx.drawImage(chickenImg, isoX - 16, isoY - 16, 32, 32);
      } else {
        // Если не загрузилась, временно нарисуем кружок
        ctx.beginPath();
        ctx.arc(isoX, isoY, 8, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  });
}
