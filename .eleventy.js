const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
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
