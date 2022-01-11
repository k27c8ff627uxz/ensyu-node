<template>
    <v-runtime-template :template="rawHtml" />
</template>

<script>
import MyStrong from '../components/MyStrong.vue'
import VRuntimeTemplate from 'v-runtime-template'

export default {
    components: {
        MyStrong,
        VRuntimeTemplate
    },
    asyncData() {
        try {
            const filename = 'hoge/aa.html'
            var str = require(`../contents/${filename}`)
            return {
                rawHtml: `<div>${str.default}</div>`
            }
        } catch(e) {
            console.log(e)
            return {
                rawHtml: `<div>An error occurs</div>`
            }
        }
    }
}
</script>
