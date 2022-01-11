<template>
	<button @click="onClick()">count!!</button>
  <div v-if="count===0">The button has not pushed!!</div>
  <div v-else>Count:{{count}}</div>
</template>

<script>

export default {
	data() {
		return {
			count: 0
		};
	},
	methods: {
		onClick() {
			this.count = this.count + 1;
		}
	}
}
</script>
