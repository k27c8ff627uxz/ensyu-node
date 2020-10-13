<template>
    <span class="mystrong">
        <slot />
    </span>
</template>

<script lang='ts'>
export default {
    name: "my-strong"
}
</script>

<style scoped>
.mystrong {
    margin: 0;
    color: red;
    font-weight: 700;
}
</style>
