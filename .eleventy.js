//const pluginRss = require("@11ty/eleventy-plugin-rss");
const dayjs = require("dayjs");
const sass = require("sass");
const impFigures = require("markdown-it-implicit-figures");
var utc = require('dayjs/plugin/utc');
var advancedFormat = require('dayjs/plugin/advancedFormat');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin



module.exports = function(eleventyConfig) {
    /** Formats a date using dayjs's conventions.
     * Docs: https://day.js.org/docs/en/display/format
     */
    dayjs.extend(utc);
    dayjs.extend(advancedFormat);
    dayjs.extend(timezone);
    eleventyConfig.addFilter('formatDate', function(date, format) {
	return dayjs(date).format(format);
    });

	//eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addTemplateFormats("scss");
	// Creates the extension for use
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css", // optional, default: "html"

		// `compile` is called once per .scss file in the input directory
		compile: async function (inputContent) {
			let result = sass.compileString(inputContent);

			// This is the render function, `data` is the full data cascade
			return async (data) => {
				return result.css;
			};
		},
	});

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
    
    //Rss
    //eleventyConfig.addPlugin(pluginRss);

    
    // Markdown experiement
    
    //    let markdownIt = require("markdown-it");
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(impFigures, 
{
 figcaption: true,  // <figcaption>alternative text</figcaption>, default: false
}
	));
    
    let options = {
	html: true, // Enable HTML tags in source
	breaks: true,  // Convert '\n' in paragraphs into <br>
	linkify: true // Autoconvert URL-like text to links
    };
    
    // configure the library with options
    //   let markdownLib =  markdownIt(options).use(markdownItFootnote);
    
    // set the library to process markdown files
    //  eleventyConfig.setLibrary("md", markdownLib);
    
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("source/admin/");
    //eleventyConfig.addPassthroughCopy("source/css/");
    eleventyConfig.addPassthroughCopy("*.xhtml");
    eleventyConfig.addPassthroughCopy("source/js/");
    eleventyConfig.addPassthroughCopy("source/images/");
    eleventyConfig.addPassthroughCopy("source/robots.txt");
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
	return collection.images("images/*");
    });
    
    return {
	markdownTemplateEngine: "njk",
	dir: { input: 'source', output: '_site' },
    };
}
