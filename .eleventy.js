module.exports = function(eleventyConfig) {

    // Markdown experiement
    
    let markdownIt = require("markdown-it")
    let markdownItFootnote = require("markdown-it-footnote");
    
    let options = {
	html: true, // Enable HTML tags in source
	breaks: true,  // Convert '\n' in paragraphs into <br>
	linkify: true // Autoconvert URL-like text to links
    };
    
    // configure the library with options
    let markdownLib =  markdownIt(options).use(markdownItFootnote);
    
    // set the library to process markdown files
    eleventyConfig.setLibrary("md", markdownLib);
    
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
    });
    return {
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "pug"
    }
}
