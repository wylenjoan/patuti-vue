var app = new Vue({
  el: "#app",
  data() {
    return {
      images: [
        ["moves/idle-1.png", "moves/idle-2.png"],
        [
          "moves/left-1.png",
          "moves/left-2.png",
          "moves/left-3.png",
          "moves/left-4.png",
          "moves/left-5.png",
        ],
        [
          "moves/right-1.png",
          "moves/right-2.png",
          "moves/right-3.png",
          "moves/right-4.png",
          "moves/right-5.png",
        ],
        [
          "moves/dock-1.png",
          "moves/dock-2.png",
          "moves/dock-3.png",
          "moves/dock-4.png",
          "moves/dock-5.png",
        ],
        [
          "moves/jump-1.png",
          "moves/jump-2.png",
          "moves/jump-3.png",
          "moves/jump-4.png",
          "moves/jump-5.png",
          "moves/jump-4.png",
          "moves/jump-5.png",
        ],
      ],
      currentImage: {
        image: "moves/idle-1.png",
        width: 300,
        height: 323,
      },
      defaultWidth: 300,
      defaultHeight: 323,
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
        this.currentImage.image =
          this.images[this.currentMove1][this.currentMove2];
        this.currentMove2 =
          (this.currentMove2 + 1) % this.images[this.currentMove1].length;

        switch (this.currentMove1) {
          // left
          case 1:
            break;

          // right
          case 2:
            break;

          // dock
          case 3:
            break;

          // jump
          case 4:
            break;
        }
        if (this.currentMove2 === 0) this.currentMove1 = 0;
        console.log("-----------------------------");
        console.log("move 1: " + this.currentMove1);
        console.log("move 2: " + this.currentMove2);
      }, this.speed);
    },
  },

  created() {
    this.move();
  },
});
