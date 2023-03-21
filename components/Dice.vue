<template>
  <div class="dice-container">
    <div @click="rollDice" class="test">
      <div class="dice-container__dice" ref="dice">
        <div class="dice-container__dice__side one">
          <div class="dice-container__dice__side__dot one-1"></div>
        </div>
        <div class="dice-container__dice__side two">
          <div class="dice-container__dice__side__dot two-1"></div>
          <div class="dice-container__dice__side__dot two-2"></div>
        </div>
        <div class="dice-container__dice__side three">
          <div class="dice-container__dice__side__dot three-1"></div>
          <div class="dice-container__dice__side__dot three-2"></div>
          <div class="dice-container__dice__side__dot three-3"></div>
        </div>
        <div class="dice-container__dice__side four">
          <div class="dice-container__dice__side__dot four-1"></div>
          <div class="dice-container__dice__side__dot four-2"></div>
          <div class="dice-container__dice__side__dot four-3"></div>
          <div class="dice-container__dice__side__dot four-4"></div>
        </div>
        <div class="dice-container__dice__side five">
          <div class="dice-container__dice__side__dot five-1"></div>
          <div class="dice-container__dice__side__dot five-2"></div>
          <div class="dice-container__dice__side__dot five-3"></div>
          <div class="dice-container__dice__side__dot five-4"></div>
          <div class="dice-container__dice__side__dot five-5"></div>
        </div>
        <div class="dice-container__dice__side six">
          <div class="dice-container__dice__side__dot six-1"></div>
          <div class="dice-container__dice__side__dot six-2"></div>
          <div class="dice-container__dice__side__dot six-3"></div>
          <div class="dice-container__dice__side__dot six-4"></div>
          <div class="dice-container__dice__side__dot six-5"></div>
          <div class="dice-container__dice__side__dot six-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elDice: null,
    };
  },
  mounted() {
    this.elDice = this.$refs.dice;
  },
  methods: {
    rollDice() {
      this.$emit("roll");
      var diceOne = Math.floor(Math.random() * 6 + 1);
      for (var i = 1; i <= 6; i++) {
        this.elDice.classList.remove("show-" + i);
        if (diceOne === i) {
          this.elDice.classList.add("show-" + i);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.dice-container {
  display: flex;
  align-items: center;
  margin-left: 35px;
  cursor: pointer;

  &__dice {
    position: relative;
    width: 40px;
    height: 40px;
    transform-style: preserve-3d;
    transition: transform 1s;

    &__side {
      position: absolute;
      background-color: rgb(128, 24, 105);
      border-radius: 5px;
      width: 40px;
      height: 40px;
      box-shadow: 0 0 15px var(--clr-magenta), 0 0 75px var(--clr-magenta);
      border: 1px solid var(--clr-magenta);
      text-align: center;
      line-height: 2em;

      &__dot {
        position: absolute;
        width: 9px;
        height: 9px;
        margin: -5px 0px 0px -5px;
        border-radius: 20px;
        background-color: var(--clr-green);
        box-shadow: inset 2px 2px #3d980f;
      }
    }

    &__side:nth-child(1) {
      transform: translateZ(1.1em);
    }

    &__side:nth-child(6) {
      transform: rotateY(90deg) translateZ(1.1em);
    }

    &__side:nth-child(3) {
      transform: rotateY(-90deg) translateZ(1.1em);
    }

    &__side:nth-child(4) {
      transform: rotateX(90deg) translateZ(1.1em);
    }

    &__side:nth-child(5) {
      transform: rotateX(-90deg) translateZ(1.1em);
    }

    &__side:nth-child(2) {
      transform: rotateY(-180deg) translateZ(1.1em);
    }
  }
  .show-1 {
    transform: rotateX(720deg) rotateZ(-720deg);
  }

  .show-6 {
    transform: rotateX(-900deg) rotateZ(1080deg);
  }

  .show-3 {
    transform: rotateY(-450deg) rotateZ(-1440deg);
  }

  .show-4 {
    transform: rotateY(810deg) rotateZ(720deg);
  }

  .show-5 {
    transform: rotateX(-810deg) rotateZ(-1080deg);
  }

  .show-2 {
    transform: rotateX(450deg) rotateZ(-720deg);
  }

  .two-1,
  .three-1,
  .four-1,
  .five-1,
  .six-1 {
    top: 20%;
    left: 20%;
  }

  .four-3,
  .five-3,
  .six-4 {
    top: 20%;
    left: 80%;
  }

  .one-1,
  .three-2,
  .five-5 {
    top: 50%;
    left: 50%;
  }

  .four-2,
  .five-2,
  .six-3 {
    top: 80%;
    left: 20%;
  }

  .two-2,
  .three-3,
  .four-4,
  .five-4,
  .six-6 {
    top: 80%;
    left: 80%;
  }

  .six-2 {
    top: 50%;
    left: 20%;
  }

  .six-5 {
    top: 50%;
    left: 80%;
  }
}
</style>
