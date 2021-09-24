var app = new Vue({
  el: "#app",
  data() {
    return {
      images: [
        [
          {
            name: "moves/idle-1.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/idle-2.png",
            height: 161,
            width: 150,
          },
        ],
        [
          {
            name: "moves/left-1.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/left-2.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/left-3.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/left-4.png",
            height: 156,
            width: 150,
          },
          {
            name: "moves/left-5.png",
            height: 161,
            width: 150,
          },
        ],
        [
          {
            name: "moves/right-1.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/right-2.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/right-3.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/right-4.png",
            height: 156,
            width: 150,
          },
          {
            name: "moves/right-5.png",
            height: 161,
            width: 150,
          },
        ],
        [
          {
            name: "moves/dock-1.png",
            width: 150,
            height: 161,
          },
          {
            name: "moves/dock-2.png",
            width: 150,
            height: 149,
          },
          {
            name: "moves/dock-3.png",
            width: 150,
            height: 135,
          },
          {
            name: "moves/dock-4.png",
            width: 136,
            height: 94,
          },
          {
            name: "moves/dock-5.png",
            width: 134,
            height: 120,
          },
        ],
        [
          {
            name: "moves/jump-1.png",
            height: 161,
            width: 150,
          },
          {
            name: "moves/jump-2.png",
            height: 157,
            width: 154,
          },
          {
            name: "moves/jump-3.png",
            height: 150,
            width: 150,
          },
          {
            name: "moves/jump-4.png",
            height: 178,
            width: 128,
          },
          {
            name: "moves/jump-5.png",
            height: 178,
            width: 128,
          },
          {
            name: "moves/jump-6.png",
            height: 157,
            width: 154,
          },
          {
            name: "moves/jump-7.png",
            height: 150,
            width: 150,
          },
        ],
      ],
      currentImage: {
        image: "moves/idle-1.png",
        height: 161,
        width: 150,
        bottom: 140,
        left: 72.5,
        x: 0,
        y: 0,
      },
      currentMove1: 0,
      currentMove2: 0,
      speed: 100,
      speedList: {
        speedWalk: 10,
        speedIdle: 100,
        speedJump: 50,
        speedJump2: 400,
        speedDock: 30,
      },
      bulletH: [
        {
          name: "bulletH0",
          shoot: false,
        },
        {
          name: "bulletH1",
          shoot: false,
        },
        {
          name: "bulletH2",
          shoot: false,
        },
      ],
      bulletV: [
        {
          name: "bulletV0",
          shoot: false,
        },
        {
          name: "bulletV1",
          shoot: false,
        },
        {
          name: "bulletV2",
          shoot: false,
        },
      ],
      currentShootingH: -1,
      currentShootingV: -1,
      currentBulletH: {
        element: "",
        x: 0,
        y: 0,
        height: 27,
        width: 54,
      },
      currentBulletV: {
        element: "",
        x: 0,
        y: 0,
        height: 27,
        width: 54,
      },
      life: 10,
      greeting: true,
      gameOver: false,
      exit: false,
    };
  },

  methods: {
    setMove(event) {
      let key = event.key;
      switch (key) {
        // left
        case "ArrowLeft":
          this.currentMove1 = 1;
          break;

        // right
        case "ArrowRight":
          this.currentMove1 = 2;
          break;

        // dock
        case "ArrowDown":
          this.currentMove1 = 3;
          break;

        // jump
        case "ArrowUp":
          this.currentMove1 = 4;
          break;

        // idle
        default:
          this.currentMove1 = 0;
          break;
      }
      this.currentMove2 = 0;
    },
    movePatuti() {
      setInterval(() => {
        this.currentImage.image =
          this.images[this.currentMove1][this.currentMove2].name;

        this.currentImage.height =
          this.images[this.currentMove1][this.currentMove2].height;

        this.currentImage.width =
          this.images[this.currentMove1][this.currentMove2].width;

        this.currentImage.x = this.$refs.patuti.getBoundingClientRect().left;
        this.currentImage.y = this.$refs.patuti.getBoundingClientRect().top;

        this.currentMove2 =
          (this.currentMove2 + 1) % this.images[this.currentMove1].length;

        switch (this.currentMove1) {
          // left
          case 1:
            this.speed = this.speedList.speedWalk;
            if (this.currentImage.left > -47.5)
              if (this.currentMove2 != 1) this.currentImage.left -= 10;
            break;

          // right
          case 2:
            this.speed = this.speedList.speedWalk;
            if (this.currentImage.left < 192.5)
              if (this.currentMove2 != 1) this.currentImage.left += 10;
            break;

          // dock
          case 3:
            this.speed = this.speedList.speedDock;
            break;

          // jump
          case 4:
            if (this.currentMove2 > 3 && this.currentMove2 < 7) {
              this.speed = this.speedList.speedJump2;
              this.currentImage.bottom += 50;
            } else {
              this.speed = this.speedList.speedJump;
              this.currentImage.bottom = 140;
            }
            break;
        }

        if (this.currentMove2 === 0) {
          this.currentMove1 = 0;
          this.speed = this.speedList.speedIdle;
        }
      }, this.speed);
    },
    getRandomNumber(max) {
      return Math.floor(Math.random() * max);
    },

    shootBulletH() {
      // shoot bullet
      if (this.currentShootingH === -1) {
        this.currentShootingH = this.getRandomNumber(3);
        this.bulletH[this.currentShootingH].shoot = true;
      }

      // check currently shooting bullet
      else {
        this.currentBulletH.element =
          this.$refs[this.bulletH[this.currentShootingH].name];

        this.currentBulletH.x =
          this.currentBulletH.element.getBoundingClientRect().left;

        this.currentBulletH.y =
          this.currentBulletH.element.getBoundingClientRect().top;

        // bullet passes through
        if (this.currentBulletH.x < 0) {
          this.bulletH[this.currentShootingH].shoot = false;
          this.currentShootingH = -1;
        }

        // collision
        else if (
          this.currentImage.x <
            this.currentBulletH.x + this.currentBulletH.width &&
          this.currentImage.x + this.currentImage.width >
            this.currentBulletH.x &&
          this.currentImage.y <
            this.currentBulletH.y + this.currentBulletH.height &&
          this.currentImage.y + this.currentImage.height > this.currentBulletH.y
        ) {
          this.updateLife();

          this.bulletH[this.currentShootingH].shoot = false;
          this.currentShootingH = -1;
        }
      }
    },

    shootBulletV() {
      // shoot bullet
      if (this.currentShootingV === -1) {
        this.currentShootingV = this.getRandomNumber(3);
        this.bulletV[this.currentShootingV].shoot = true;
      }

      // check currently shooting bullet
      else {
        this.currentBulletV.element =
          this.$refs[this.bulletV[this.currentShootingV].name];

        this.currentBulletV.x =
          this.currentBulletV.element.getBoundingClientRect().left;

        this.currentBulletV.y =
          this.currentBulletV.element.getBoundingClientRect().top;

        // bullet passes through
        if (
          this.currentBulletV.element.getBoundingClientRect().bottom >
          window.innerHeight
        ) {
          this.bulletV[this.currentShootingV].shoot = false;
          this.currentShootingV = -1;
        }
        // collision
        else if (
          this.currentImage.x <
            this.currentBulletV.x + this.currentBulletV.width &&
          this.currentImage.x + this.currentImage.width >
            this.currentBulletV.x &&
          this.currentImage.y <
            this.currentBulletV.y + this.currentBulletV.height &&
          this.currentImage.y + this.currentImage.height > this.currentBulletV.y
        ) {
          this.updateLife();
          this.bulletV[this.currentShootingV].shoot = false;
          this.currentShootingV = -1;
        }
      }
    },

    shootBothSides() {
      setInterval(() => {
        this.shootBulletH();
        this.shootBulletV();
      }, 200);
    },

    updateLife() {
      this.life = this.life - 1;
      if (this.life === 0) {
        this.gameOver = true;
      }
    },

    playAgain() {
      this.gameOver = false;
      this.life = 10;
    },

    playNow() {
      this.greeting = false;
      document.getElementById("game-area").focus();
      this.movePatuti();
      this.shootBothSides();
    },
  },
});
