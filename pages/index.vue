<template>
  <div class="index-page">
    <div class="index-page__bubbles">
      <span
        v-for="x in 50"
        :key="'bubble' + x"
        :style="`--i: 
          ${getRandomInt(10, 30)}`"
      ></span>
    </div>
    <DoggieSearch />
  </div>
</template>

<script>
import DoggieSearch from "@/components/DoggieSearch.vue";
export default {
  name: "App",
  components: {
    DoggieSearch,
  },
  methods: {
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
};
</script>

<style lang="scss">
.index-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__bubbles {
    position: relative;
    display: flex;
    z-index: -100;
    span {
      position: relative;
      width: 30px;
      height: 30px;
      background: var(--clr-magenta);
      margin: 0 4px;
      border-radius: 50%;
      box-shadow: 0 0 0 10px #cf03cf45, 0 0 50px var(--clr-magenta),
        0 0 100px var(--clr-magenta);
      animation: animate 15s linear infinite;
      animation-duration: calc(125s / var(--i));
    }
    span:nth-child(even) {
      background: var(--clr-green);
      box-shadow: 0 0 0 10px #4fbb1945, 0 0 50px var(--clr-green),
        0 0 100px var(--clr-green);
    }
  }
}
@keyframes animate {
  0% {
    transform: translateY(100vh) scale(0);
  }
  100% {
    transform: translateY(-100vh) scale(1);
  }
}
</style>
