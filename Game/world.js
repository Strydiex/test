const gridSize = 10;
const tileWidth = 80;
const tileHeight = 40;

function drawTile(ctx, x, y) {
  const isoX = (x - y) * (tileWidth / 2) + ctx.canvas.width / 2 - tileWidth / 2;
  const isoY = (x + y) * (tileHeight / 2);

  ctx.beginPath();
  ctx.moveTo(isoX, isoY);
  ctx.lineTo(isoX + tileWidth / 2, isoY + tileHeight / 2);
  ctx.lineTo(isoX, isoY + tileHeight);
  ctx.lineTo(isoX - tileWidth / 2, isoY + tileHeight / 2);
  ctx.closePath();

  ctx.strokeStyle = "#4d8b3d";
  ctx.stroke();
  ctx.fillStyle = "#8ed47a";
  ctx.fill();
}

export function drawIsometricGrid(ctx) {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      drawTile(ctx, x, y);
    }
  }
}
