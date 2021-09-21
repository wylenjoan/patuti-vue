var app = new Vue({
  el: "#app",
  data() {
    return {
      images: [
        [
          {
            name: "moves/idle-1.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/idle-2.png",
            height: 161.5,
            width: 150,
          },
        ],
        [
          {
            name: "moves/left-1.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/left-2.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/left-3.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/left-4.png",
            height: 156,
            width: 150,
          },
          {
            name: "moves/left-5.png",
            height: 161.5,
            width: 150,
          },
        ],
        [
          {
            name: "moves/right-1.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/right-2.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/right-3.png",
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/right-4.png",
            height: 156,
            width: 150,
          },
          {
            name: "moves/right-5.png",
            height: 161.5,
            width: 150,
          },
        ],
        [
          {
            name: "moves/dock-1.png",
            width: 150,
            height: 161.5,
          },
          {
            name: "moves/dock-2.png",
            width: 150,
            height: 149.5,
          },
          {
            name: "moves/dock-3.png",
            width: 150,
            height: 135,
          },
          {
            name: "moves/dock-4.png",
            width: 136,
            height: 94.5,
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
            height: 161.5,
            width: 150,
          },
          {
            name: "moves/jump-2.png",
            height: 157,
            width: 154,
          },
          {
            name: "moves/jump-3.png",
            height: 150.5,
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
            height: 150.5,
            width: 150,
          },
        ],
      ],
      currentImage: {
        image: "moves/idle-1.png",
        height: 161.5,
        width: 150,
        bottom: 0,
        left: 72.5,
      },
      currentMove1: 0,
      currentMove2: 0,
      speed: 200,
    };
  },

  methods: {
    setMove(event) {
      let key = event.key;
      console.log(key);
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
    move() {
      setInterval(() => {
        console.log("-----------------------------");

        this.currentImage.image =
          this.images[this.currentMove1][this.currentMove2].name;

        this.currentImage.height =
          this.images[this.currentMove1][this.currentMove2].height;

        this.currentImage.width =
          this.images[this.currentMove1][this.currentMove2].width;
        this.currentMove2 =
          (this.currentMove2 + 1) % this.images[this.currentMove1].length;

        switch (this.currentMove1) {
          // left
          case 1:
            if (this.currentImage.left != -47.5)
              if (this.currentMove2 != 1) this.currentImage.left -= 10;

            console.log(this.currentImage.left);
            break;

          // right
          case 2:
            if (this.currentImage.left != 192.5)
              if (this.currentMove2 != 1) this.currentImage.left += 10;

            console.log(this.currentImage.left);
            break;

          // dock
          case 3:
            break;

          // jump
          case 4:
            if (this.currentMove2 > 3 && this.currentMove2 < 7) {
              this.speed = 800;
              this.currentImage.bottom += 50;
            } else {
              this.speed = 200;
              this.currentImage.bottom = 0;
            }
            break;
        }

        if (this.currentMove2 === 0) {
          this.currentMove1 = 0;
          this.speed = 200;
        }

        console.log("move 1: " + this.currentMove1);
        console.log("move 2: " + this.currentMove2);
        console.log("move 2: " + this.currentImage.image);
      }, this.speed);
    },
  },

  created() {
    this.move();
  },
});
