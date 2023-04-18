const game = document.querySelector("#game");
const bucket = document.querySelector("#bucket");

let score = 0;
let lives = 3;
game.addEventListener("mousemove", event => {
  const gameRect = game.getBoundingClientRect();
  const bucketWidth = bucket.offsetWidth;
  const mouseX = event.clientX - gameRect.left;
  const maxX = game.offsetWidth - bucketWidth;
  const bucketX = Math.min(Math.max(mouseX - bucketWidth / 2, 0), maxX);
  bucket.style.left = bucketX + "px";
});

eggInterval= setInterval(() => {
  const game = document.querySelector("#game");

  const egg = new Image();
  egg.addEventListener("load", () => {
    egg.classList.add("egg");
    const x = Math.round(Math.random() * (120 - (5 * egg.width / egg.height)));
    egg.style.left = x + "vh";
    game.appendChild(egg);
  });

  egg.src = "img/easterEgg.png";
}, 1000);


setInterval(() => {
  const eggs = document.querySelectorAll("#game > .egg");

  eggs.forEach(egg => {
    const eggRect = egg.getBoundingClientRect();
    const bucketRect = bucket.getBoundingClientRect();

    if (eggRect.bottom >= bucketRect.top &&
      eggRect.left >= bucketRect.left &&
      eggRect.right <= bucketRect.right) {
      egg.remove();
      score++;
    } else {
      const top = parseFloat(egg.style.top) || 0;
      egg.style.top = top + 0.3 + "vh";
      if (top > 100) {
        const heart = document.querySelector(".heart");
        heart.remove();
        egg.remove();
        lives--;

        if (lives === 0) {
          clearInterval(eggInterval);
          const modal = document.getElementById("myModal");
          const playAgainBtn = document.getElementById("play-again-btn");
          document.getElementById("score").textContent = score;
          modal.style.display = "block";

          playAgainBtn.onclick = () => {
            // Restart the game
            modal.style.display = "none";
            window.location.reload();
          }
        }
      }
    }

  });


}, 30 / 1000);
