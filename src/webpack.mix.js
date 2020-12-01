const mix = require("laravel-mix");
const eslintFormatter = require("eslint-friendly-formatter");

mix
	.setPublicPath("../public")
	// Add eslint to .jsx, .js and .vue files
	// .webpackConfig({
	//     module: {
	//         rules: [
	//             {
	//                 test: /\.(jsx|js|vue)$/,
	//                 loader: 'eslint-loader',
	//                 enforce: 'pre',
	//                 exclude: /(node_modules)/,
	//                 options: {
	//                     formatter: eslintFormatter
	//                 }
	//             }
	//         ]
	//     }
	// })
	// This will process our entry point (app.js)
	.js("js/app.js", "./js/cwd-events-public.js")
	.sass("styles/app.scss", "./css/cwd-events-component-public.css");
