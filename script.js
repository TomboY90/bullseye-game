window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 1280;
  canvas.height = 720;

  ctx.fillStyle = 'white';
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'white';

  class Player {
    constructor(game) {
      this.game = game;
      this.conllisionX = this.game.width * 0.5;
      this.conllisionY = this.game.height * 0.5;
      this.conllisionRadius= 30;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.conllisionX, this.conllisionY, this.conllisionRadius, 0, Math.PI * 2);
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
    }

    render(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas);
  game.render(ctx)

  function animate() {}
})

