<template>
  <div class="doggie-search">
    <div class="doggie-search__title" ref="title" id="title">
      The Doggies Explorer
    </div>
    <div class="doggie-search__search-bar" ref="search" id="search">
      <input
        :disabled="!connected"
        type="number"
        @keyup="imposeMinMax"
        v-model="query"
        placeholder="Search Doggie ID"
        class="doggie-search__search-bar__input"
      />
      <button
        class="doggie-search__search-bar__neon-button"
        v-if="!connected"
        @click="connect"
      >
        Connect
      </button>
      <button
        class="doggie-search__search-bar__neon-button"
        v-if="connected"
        :disabled="!query"
        @click="searchDoggieById"
      >
        Search
      </button>
    </div>
    <div class="doggie-search__search-result" v-if="contractResult">
      <div class="doggie-search__search-result__image-container">
        <img
          v-if="!showIframe"
          class="doggie-search__search-result__image-container__image-iframe"
          :src="contractResult.image_url"
          alt=""
        />
        <iframe
          v-else
          class="doggie-search__search-result__image-container__image-iframe"
          :src="contractResult.iframe_url"
          frameborder="0"
        ></iframe>
        <div class="toggle">
          <label class="switch">
            <input type="checkbox" @change="switchToIframe" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div>
        <div class="doggie-search__search-result__details">
          <h2>{{ contractResult.name }}</h2>
          <p>Owned by {{ owner }}</p>
          <h5>{{ contractResult.description }}</h5>
        </div>
        <div class="doggie-search__search-result__details__list-of-traits">
          <div
            class="doggie-search__search-result__details__list-of-traits__card"
            v-for="trait in filteredTraits"
            :key="trait.trait_type"
          >
            <div
              class="doggie-search__search-result__details__list-of-traits__card__content"
            >
              <h3>{{ trait.trait_type }}</h3>
              <p>
                {{ trait.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import gsap from "gsap";
import abi from "@/abi.json";

export default {
  name: "nft",
  layout: "default",
  beforeMount() {
    gsap.set("#search", {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });
    gsap.set("#title", {
      position: "absolute",
      top: "40%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });
  },
  data() {
    return {
      connected: false,
      contractResult: "",
      owner: "",
      query: null,
      showIframe: false,
      abi,
    };
  },
  computed: {
    filteredTraits() {
      return this.contractResult.attributes.filter((attr) => attr.value);
    },
  },
  methods: {
    connect() {
      let ethereum = window.ethereum;
      if (ethereum) {
        ethereum.request({ method: "eth_requestAccounts" }).then(() => {
          this.connected = true;
          const screen = window.innerHeight;
          gsap.to(this.$refs.search, {
            duration: 1,
            yPercent: -screen / 1.3,
          });
          gsap.to(this.$refs.title, {
            duration: 1,
            yPercent: -screen,
          });
        });
      }
    },

    async searchDoggieById() {
      let web3 = new Web3(window.ethereum);
      let contractAddress = "0xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6";
      let abi = JSON.parse(this.abi.result);

      let contract = new web3.eth.Contract(abi, contractAddress);
      const owner = await contract.methods.ownerOf(this.query).call();
      this.owner = owner;
      const result = await contract.methods.tokenURI(this.query).call();
      console.log(result);
      const response = await fetch(result);
      this.contractResult = await response.json();
    },
    switchToIframe() {
      this.showIframe = !this.showIframe;
    },
    imposeMinMax() {
      if (this.query != "") {
        if (parseInt(this.query) < parseInt(0)) {
          this.query = 1;
        }
        if (parseInt(this.query) > parseInt(9999)) {
          this.query = 9999;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.doggie-search {
  height: 100%;

  &__title {
    color: #fff;
    font-size: 40px;
    font-family: cursive;
  }
  &__search-bar {
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;
    justify-content: center;

    &__input {
      width: 500px;
      font-family: sans-serif;
      padding: 20px 20px;
      border: 1px solid var(--clr-magenta);
      color: white;
      text-indent: 15px;
      border-radius: 10px;
      outline: none;
      letter-spacing: 3px;
      transition: 0.3s;
      background-color: rgb(17, 17, 17);
    }
    &__input:focus {
      padding: 10px 10px;
      box-shadow: 0 0 15px var(--clr-magenta), 0 0 75px var(--clr-magenta);
      border: 1px solid var(--clr-magenta);
    }
    &__input:placeholder {
      color: gray;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }

    &__neon-button {
      font-size: 2rem;
      background-color: transparent;
      display: inline-block;
      cursor: pointer;
      text-decoration: none;
      color: var(--clr-magenta);
      border: var(--clr-magenta) 0.125em solid;
      padding: 0.25em 1em;
      border-radius: 0.25em;
      text-shadow: 0 0 0.125em rgba(255, 255, 255, 0.3), 0 0 0.45em currentColor;
      box-shadow: inset 0 0 0.5em 0 var(--clr-magenta),
        0 0 0.5em 0 var(--clr-magenta);
      position: relative;
    }

    &__neon-button::before {
      pointer-events: none;
      content: "";
      position: absolute;
      background: var(--clr-magenta);
      top: 120%;
      left: 0;
      width: 100%;
      height: 100%;
      transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
      filter: blur(1em);
      opacity: 0.7;
    }

    &__neon-button::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 2em 0.5em var(--clr-magenta);
      opacity: 0;
      background-color: var(--clr-magenta);
      z-index: -1;
      transition: opacity 100ms linear;
    }

    &__neon-button:hover,
    &__neon-button:focus {
      color: var(--clr-bg);
      text-shadow: none;
    }

    &__neon-button:hover::before,
    &__neon-button:focus::before {
      opacity: 1;
    }
    &__neon-button:hover::after,
    &__neon-button:focus::after {
      opacity: 1;
    }
  }

  &__search-result {
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 50px;
    align-items: center;
    height: 100%;

    &__image-container {
      position: relative;

      &__image-iframe {
        border-radius: 15px;
        width: 500px;
        height: 500px;
      }

      .toggle {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: var(--clr-green);
      }

      input:focus + .slider {
        box-shadow: 0 0 1px var(--clr-green);
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }

    &__details {
      max-width: 650px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
      font-family: cursive;
      margin-left: 30px;

      &__list-of-traits {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 700px;
        max-height: 300px;
        flex-wrap: wrap;
        z-index: 1;

        &__card {
          position: relative;
          width: 200px;
          height: fit-content;
          margin: 10px;
          box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          border-left: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);

          &__content {
            padding: 10px;
            text-align: center;
            transition: 0.5s;
          }
        }
        &__card:hover {
          text-shadow: 0 0 0.125em rgba(255, 255, 255, 0.3),
            0 0 0.45em var(--clr-green);
          box-shadow: 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
        }
      }
    }
  }
}
</style>
