<template>
  <div class="first-screen-container" :style="{ height: height + 'px' }">
    <!-- <canvas ref="canvas"></canvas> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 0,
      width: 0,
      ctx: null,
      particle: [],
      lineAnimation: null,
    };
  },
  mounted() {
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
    this.createCtx();
  },
  methods: {
    createCtx() {
      let cvs = this.$refs.canvas;
      this.ctx = cvs.getContext("2d");
      this.ctx.canvas.width = this.width;
      this.ctx.canvas.height = this.height;
      this.$nextTick(()=>{
        this.ctx.beginPath();
        this.ctx.arc(300, 300, 100, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#409EFF";
        this.ctx.fill(); //画实心圆
        this.ctx.closePath();
      })
    },
    createItem(amount) {
      for (let i = 0; i < amount; i++) {
        this.particle.push({
          posX: Math.round(Math.random() * this.width),
          posY: Math.round(Math.random() * this.height),
          r: 4,
          color: this.randomColor(),
        });
      }
      this.draw();
    },
    randomColor() {
      let random = Math.random() * 4;
      if (random <= 1) {
        return "#409EFF";
      } else if (random <= 2) {
        return "#67C23A";
      } else if (random <= 3) {
        return "#E6A23C";
      } else {
        return "#F56C6C";
      }
    },
    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particle.map((item, index) => {
        this.ctx.beginPath();
        this.ctx.arc(item.posX, item.posY, item.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = item.color;
        this.ctx.fill(); //画实心圆
        this.ctx.closePath();

        item.posY = item.posY + 1;
        if (item.posY > this.height) {
          item.posX = Math.round(Math.random() * this.width);
          item.posY = Math.round(Math.random() * this.height);
        }
      });
      this.lineAnimation = requestAnimationFrame(this.draw);
    },
    stop() {
      cancelAnimationFrame(this.lineAnimation);
    },
  },
};
</script>
<style lang="stylus">
.first-screen-container {
  width: 100%;
  background-color: #ffffff;
  background: url('~assets/images/home1.jpg') no-repeat;
  background-size: cover; 
  background-position: center 0;
  +keep-tablet(){
    background: url('~assets/images/home1.jpg') no-repeat;
  }
  +keep-mobile(){
    background: url('~assets/images/home2.jpg') no-repeat;
    background-size: cover; 
    background-position: 0 center;
  }
}
</style>