const path = require('path');
const glob = require('glob');
const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//动态添加入口
function getEntry() {
	var entry = {};
	glob.sync('./views/pages/[A-Za-z0-9\.-_]*/index.tsx').forEach(function(name){
		const start = name.indexOf('pages/') + 6;
		const end = name.length - 10;
		const eArr = [];
		const n = name.slice(start,end);
		if(!entry[n]) {
			eArr.push('@babel/polyfill');
			eArr.push(name);
			entry[n] = eArr;
		}
	})
	return entry;
}

function getHtmlConfig(name) {
	return {
		template:`./views/template/template.html`,
		filename:`${name}.html`,
		inject:true,
		chunks:[name]
	}
}

const webpackConfig = {
	entry: getEntry(),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name]-[hash:16].js'
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
    	'@': path.join(__dirname, '../', "views")
    }
	},
	mode:"production",
	module:{
		rules:[
			{
				test:/\.jsx?$/,
				exclude:/node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'awesome-typescript-loader']
			},
			//css处理
			{
				//css modules
				//不以.global.css结尾
				test: (str) => {
					const notGlobal = !(/.global.css$/.test(str));
					const isCss = (/.css$/.test(str));
					return notGlobal && isCss;
				},
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						}
					}
				]
			},
			//css处理
			{
				//普通模式
				//*.global.css
				test: /^(.*\.global)\.css/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}
				]
			},
			//css处理
			{
				//node_modules里的处理
				test: /\.css$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}
				]
			},
			//less处理
			{
				//modules
				//不以.global.less结尾
				test: (str) => {
					const notGlobal = !(/.global.less$/.test(str));
					const isLess = (/.less$/.test(str));
					return notGlobal && isLess;
				},
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
					'less-loader'
				]
			},
			//less处理
			{
				//普通模式
				test: /^(.*\.global)\.less/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
					'less-loader'
				]
			},
			{
				//node_modules里的处理
				test: /\.less$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
					'less-loader'
				]
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:5000,
							name: '[name].[ext]',
							outputPath: './images/',
							publicPath: '/images',
						}
					}
				]
			}
		]
	},
	plugins:[
		//抽出css
		new MiniCssExtractPlugin({
			filename: "css/[name]_[hash:5].css"
		}),
		//打包分析
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: "vendor"
				},
			},
		},
	}
};

//生成模板
(() => {
	const entryObj = getEntry();
	const htmlArray = [];
	Object.keys(entryObj).forEach(function(element){
			htmlArray.push({
				_html: element,
				title: 'React应用',
				chunks: [element]
			})
	})
	htmlArray.forEach(function(element){
		webpackConfig.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html,element.chunks)));
	})
})()

module.exports = webpackConfig;