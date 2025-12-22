module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('postcss-preset-env')({
			stage: 1,
			features: {
				'nesting-rules': true,
				'color-function': true,
			},
		}),
		require('autoprefixer'),
		
	],
};
