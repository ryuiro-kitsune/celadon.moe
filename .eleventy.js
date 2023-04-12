const pluginRss = require("@11ty/eleventy-plugin-rss");
const dayjs = require("dayjs")

module.exports = function(eleventyConfig) {
    /** Formats a date using dayjs's conventions.
     * Docs: https://day.js.org/docs/en/display/format
     */
    const formatDate = (date) => dayjs(date).format('YYYY/M/D');
    const slugDate = (date) => dayjs(date).format('YYYY-MM-DD');
    eleventyConfig.addFilter('formatDate', formatDate);
    eleventyConfig.addFilter('slugDate', slugDate);
    
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
