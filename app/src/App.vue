<template>
    <div>
        <h1>Async res: {{api_value}}</h1>
        <hr />
        <h2>Sum calc</h2>
        <label for="num-input">Enter numbers separated by comma:</label>
        <input id="num-input" v-model="numbers" />
        <button @click="calculateSum">Calc sum</button>
        <div>
            <h3>Result: {{result}}</h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "App",
    data() {
        return {
            api_value: null,
            numbers: null,
            result: 'result will show here'
        }
    },
    async created() {
        const value = await axios.get('/api/value')
        this.api_value = value.data
    },
    methods: {
        async calculateSum() {
            const numArr = this.numbers.split(',').map(n => parseFloat(n))
            const res = await axios.post('/api/add', {
                numbers: numArr
            })
            this.result = res.data['result']
        }
    }
}
</script>

<style scoped>
h3 {
    color: blue;
}
</style>