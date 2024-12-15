//Imports
import sass from "sass";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

//Config
export default async function(eleventyConfig) {
	// Add Sass Scss plugin and configure
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent) {
			let result = sass.compileString(inputContent);
			return async (data) => {
				return result.css;
			};
		},
	});

	// RSS Feed Configutation
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Sketches in UTF-8",
			subtitle: "The Offcial Home of Cellie Camellia (Formerly Sketches in Ascii)",
			base: "https://celadon.moe/",
			author: {
				name: "Cellie Camellia",
				email: "", // Optional
			}
		}
	});

	//Webc configuration
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// (The default changed from `false` in Eleventy WebC v0.7.0)
		components: "_includes/**/*.webc",
		// Adds an Eleventy WebC transform to process all HTML output
		useTransform: false,
		// Additional global data used in the Eleventy WebC transform
		transformData: {},
		// Options passed to @11ty/eleventy-plugin-bundle
		bundlePluginOptions: {},
	});
};

export const config = {
		dir: {
		input: "_src",
		output: "_site"
		}
	};
