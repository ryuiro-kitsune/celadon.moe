const pluginRss = require("@11ty/eleventy-plugin-rss");
const dayjs = require("dayjs");
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

    eleventyConfig.addFilter('unescape', function(str) {
	let converted = str.replace(/\\u003c/g, '<').replace(/\\u003e/g, ">").replace(/\\u0026/g, "&");
	return converted;
    });

    eleventyConfig.addFilter('truncateStrDate', function(str) {
	let truncated = str.slice(0, 10);
	return truncated;
    });
    
    //Rss
    eleventyConfig.addPlugin(pluginRss);

    
    // Markdown experiement
    
    //    let markdownIt = require("markdown-it");

    
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
    eleventyConfig.addPassthroughCopy("source/css/");
    eleventyConfig.addPassthroughCopy("*.xhtml");
    eleventyConfig.addPassthroughCopy("source/images/");
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
	return collection.images("images/*");
    });
    
    return {
	markdownTemplateEngine: "njk",
	dir: { input: 'source', output: '_site' },
    };
}
