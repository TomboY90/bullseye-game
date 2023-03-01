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
      this.speedX = 0;
      this.speedY = 0;
      this.dx = 0;
      this.dy = 0;
      this.speedModifer = 20;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.conllisionX, this.conllisionY, this.conllisionRadius, 0, Math.PI * 2);
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
      context.beginPath();
      context.moveTo(this.conllisionX, this.conllisionY);
      context.lineTo(this.game.mouse.x, this.game.mouse.y);
      context.stroke();
    }

    update() {
      this.dx = this.game.mouse.x - this.conllisionX;
      this.dy = this.game.mouse.y - this.conllisionY;

      const distance = Math.hypot(this.dy, this.dx);
      if (distance > this.speedModifer) {
        this.speedX = this.dx / distance || 0;
        this.speedY = this.dy / distance || 0;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }

      this.conllisionX += this.speedX * this.speedModifer;
      this.conllisionY += this.speedY * this.speedModifer;
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);

      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false
      }

      canvas.addEventListener('mousedown', (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
      })
      canvas.addEventListener('mouseup', (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      })
      canvas.addEventListener('mousemove', (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      })
    }

    render(context) {
      this.player.draw(context);
      this.player.update();
    }
  }

  const game = new Game(canvas);


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx)
    requestAnimationFrame(animate);
  }

  animate();
})

