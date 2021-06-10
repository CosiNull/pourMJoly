function draw() {
  requestAnimationFrame(draw);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.update();

  obstacles.forEach((obstacle) => {
    obstacle.draw();
    obstacle.update();
  });
  obstacle2[0].draw();
  clavier();

  player.draw();
}
setMenu();
draw();
