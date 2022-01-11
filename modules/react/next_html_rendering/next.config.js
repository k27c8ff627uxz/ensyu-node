const withSass = require('@zeit/next-sass')

module.exports = {
	...withSass({
		cssModules: true,
	}),
    webpack: (config) => {
    	config.module.rules.push(
			{
				test: /\.html$/,
				use: 'raw-loader'
			}
		)
    	return config
	},
	basePath: '/dev'
}
