Vue.component("CoinsDetails", {
  props: ["coins"],
  data() {
    return {
      showPrices: false,
      value: 0,
    };
  },
  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
    },
  },
  computed: {
    title() {
      return `${this.coins.name} : ${this.coins.symbol}`;
    },
    convertedValue() {
      if (!this.value) {
        return 0;
      }

      return this.value / this.coins.actualPrice;
    },
  },
  template: `
    <div>
      <img v-on:mouseover="toggleShowPrices"                v-on:mouseout="toggleShowPrices" v-bind:src="coins.img" v-bind:alt="coins.name" />
      <h1 v-bind:class="coins.changePercent > 0 ? 'green' : coins.changePercent === 0 ? 'orange' : 'red' ">{{ title }}
        <!-- Conditionals -->
        <span v-if="coins.changePercent > 0">💚</span>
        <span v-else-if="coins.changePercent < 0">🙁</span>
        <span v-else>😎</span>

        <!-- Only show if true -->
        <span v-show="coins.changePercent > 0">💚</span>
        <span v-show="coins.changePercent < 0">🙁</span>
        <span v-show="coins.changePercent === 0">😎</span>

        <span v-bind:style="{color: '#' + coins.fontColor}" v-on:click="toggleShowPrices">{{ showPrices ? 'Hidde Prices' : 'Show Prices' }}</span>
      </h1>

      <input type="number" v-model="value">
      <span style="display: block;" :style="{color: '#' + coins.fontColor}">{{ convertedValue }}</span>

      <ul v-show="showPrices">
        <li class="uppercase" v-bind:class="{orange: p.value === coins.actualPrice, green: p.value > coins.actualPrice, red: p.value < coins.actualPrice}" v-for="(p, i) in coins.pricesWithDays" v-bind:key="i">
          {{ i }} - {{ p.day }} => {{ p.value }}
        </li>
      </ul>
    </div>
  `,
});

new Vue({
  el: "#root",
  data() {
    return {
      btc: {
        name: "Bitcoin",
        symbol: "BTC",
        img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        changePercent: 1,
        actualPrice: 9000,
        pricesWithDays: [
          { day: "Lunes", value: 8400 },
          { day: "Martes", value: 7900 },
          { day: "Miercoles", value: 8200 },
          { day: "Jueves", value: 9000 },
          { day: "Viernes", value: 9400 },
          { day: "Sabado", value: 10000 },
          { day: "Domingo", value: 18721 },
        ],
        color: "f4f4f4",
        fontColor: "4f4f4f",
      },
    };
  },
  // methods: {
  //   toggleShowPrices() {
  //     this.showPrices = !this.showPrices;
  //     this.color = this.color.split("").reverse().join("");
  //     this.fontColor = this.fontColor.split("").reverse().join("");
  //   },
  // },
});
