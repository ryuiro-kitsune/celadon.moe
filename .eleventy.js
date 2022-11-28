module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addCollection("posts"), function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
}
