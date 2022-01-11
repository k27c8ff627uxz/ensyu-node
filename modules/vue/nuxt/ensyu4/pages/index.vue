<template>
    <div>
        <div>asyncData: {{asyncCurrentTime}}</div>
        <div>data: {{currentTime}}</div>
        <div>computed: {{computedCurrentTime}}</div>
    </div>
</template>

<script>
export default {
    asyncData() {
        const now = new Date()
        return {
            asyncCurrentTime: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getMinutes()}`
        }
    },
    data() {
        const now = new Date()
        return {
            currentTime: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getMinutes()}`
        }
    },
    computed: {
        computedCurrentTime: function() {
            const now = new Date()
            return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getMinutes()}`
        }
    }
}
</script>
