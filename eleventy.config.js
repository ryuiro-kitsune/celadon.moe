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
};

//Directories
export const config = {
		dir: {
		input: "source",
		output: "_site"
		}
};
