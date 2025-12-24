const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
	mode: 'development',
	entry: './src/app/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext]',
				},
			},
//			{
//				test: /\.svg$/i,
//				use: ['@svgr/webpack'],
//			},
			{
				test: /\.module\.pcss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.pcss$/,
				exclude: /\.module\.pcss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.svg',
		}),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_GRAPHQL_URL': JSON.stringify(process.env.REACT_APP_GRAPHQL_URL),
        }),
	],
	devServer: {
		port: 3000,
		hot: true,
		historyApiFallback: {
			index: '/index.html',
			disableDotRule: true,
		},
		proxy: [
			{
				context: ['/api'],
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		],
	},
};
