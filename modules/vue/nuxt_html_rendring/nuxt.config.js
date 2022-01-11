export default {
    mode: 'spa',
    target: 'static',
    build: {
        extend(config, ctx) {
            config.resolve.alias["vue"] = "vue/dist/vue.common";
            config.module.rules.push({
                test: /\.html$/,
                use: 'raw-loader'
            });
        }
    },
}