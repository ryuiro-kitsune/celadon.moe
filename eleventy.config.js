//Imports
import sass from "sass";

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
};


//Directories
export const config = {
		dir: {
		input: "source",
		output: "_site"
		}
};
