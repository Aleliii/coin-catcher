const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    backgroundColor: "#1f2937",
    parent: "game-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
  let player, cursors, coin, score = 0, scoreText;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image("player", "https://i.imgur.com/T5s4L6V.png");
    this.load.image("coin", "https://i.imgur.com/s6qP2Gf.png");
  }
  
  function create() {
    player = this.physics.add.sprite(240, 580, "player").setScale(0.5);
    player.setCollideWorldBounds(true);
  
    coin = this.physics.add.sprite(Phaser.Math.Between(50, 430), 0, "coin").setScale(0.3);
    coin.setBounce(1);
    coin.setCollideWorldBounds(true);
  
    cursors = this.input.keyboard.createCursorKeys();
  
    scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "18px",
      fill: "#ffffff"
    });
  
    this.physics.add.overlap(player, coin, collectCoin, null, this);
  }
  
  function update() {
    player.setVelocityX(0);
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    }
  
    if (coin.y > 640) {
      resetCoin(this);
    }
  }
  
  function collectCoin(player, coin) {
    score += 10;
    scoreText.setText("Score: " + score);
    resetCoin(this);
  }
  
  function resetCoin(scene) {
    coin.y = 0;
    coin.x = Phaser.Math.Between(50, 430);
  }
  