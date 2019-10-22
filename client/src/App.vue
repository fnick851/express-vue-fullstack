<template>
  <div>
    <h1>Async res: {{state.api_value}}</h1>
    <hr />
    <h2>Sum calc</h2>
    <label for="num-input">Enter numbers separated by comma:</label>
    <input id="num-input" v-model="state.input_numbers" />
    <button @click="calculateSum">Calc sum</button>
    <div>
      <h3>Result: {{state.sum}}</h3>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const state = reactive({
      sum: "sum result will show here",
      input_numbers: [],
      api_value: null
    });

    (async function() {
      const value = await axios.get("/api/value");
      state.api_value = value.data;
    })();

    async function calculateSum() {
      const numbers = state.input_numbers.split(",").map(n => parseFloat(n));
      const res = await axios.post("/api/add", {
        numbers
      });
      state.sum = res.data["result"];
    }

    return {
      state,
      calculateSum
    };
  }
};
</script>

<style scoped>
h3 {
  color: blue;
}
</style>