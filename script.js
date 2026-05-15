// script.js

const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let lastStar = 0;

window.addEventListener("mousemove", (e) => {

  // create fewer stars
  if (Date.now() - lastStar > 120) {

    stars.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 2,
      life: 1,
      speedY: Math.random() * 0.4 + 0.1
    });

    lastStar = Date.now();
  }
});

function drawStar(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();

  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos((18 + i * 72) * Math.PI / 180) * size,
      -Math.sin((18 + i * 72) * Math.PI / 180) * size
    );

    ctx.lineTo(
      Math.cos((54 + i * 72) * Math.PI / 180) * (size / 2),
      -Math.sin((54 + i * 72) * Math.PI / 180) * (size / 2)
    );
  }

  ctx.closePath();

  ctx.fillStyle = `rgba(173, 216, 230, ${opacity})`;
  ctx.shadowColor = "#add8e6";
  ctx.shadowBlur = 10;

  ctx.fill();
  ctx.restore();
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star, index) => {
    drawStar(star.x, star.y, star.size, star.life);

    star.y -= star.speedY;
    star.life -= 0.015;

    if (star.life <= 0) {
      stars.splice(index, 1);
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// script.js

const video = document.querySelector(".sky-video");

video.volume = 1;

video.play().catch(() => {
  console.log("Autoplay blocked by browser");
});