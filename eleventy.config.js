//Imports
import * as sass from "sass";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginWebc from "@11ty/eleventy-plugin-webc";

//Config
export default async function(eleventyConfig) {
	// Passthroughs
	eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("source/key.pub");
    eleventyConfig.addPassthroughCopy("source/admin/");
    //eleventyConfig.addPassthroughCopy("source/css/");
    eleventyConfig.addPassthroughCopy("*.xhtml");
    eleventyConfig.addPassthroughCopy("source/js/");
    eleventyConfig.addPassthroughCopy("source/celadon-moe.js");
    eleventyConfig.addPassthroughCopy("source/images/");
    eleventyConfig.addPassthroughCopy("source/robots.txt");
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
	return collection.images("images/*");
    });


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
	//RSS Feed Configutation 
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blog", // iterate over `collections.posts`
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

	//misc 
    eleventyConfig.addFilter('unescape', function(str) {
	let converted = str.replace(/\\u003c/g, '<').replace(/\\u003e/g, ">").replace(/\\u0026/g, "&");
	return converted;
    });

    eleventyConfig.addFilter('truncateStrDate', function(str) {
	let truncated = str.slice(0, 10);
	return truncated;
    });

    eleventyConfig.addFilter('append', function(str1, str2) {
	return str1.concat(str2);
    });
};

export const config = {
		dir: {
		input: "src",
		output: "_site"
		}
	};
