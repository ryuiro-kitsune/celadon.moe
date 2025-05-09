//Imports
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import markdownIt from "markdown-it";
import markdownItImageFigures from "markdown-it-image-figures";
import markdownItFootnotes from "markdown-it-footnote";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import htmlmin from "html-minifier-terser";
import futurePost from "eleventy-plugin-future-post";
import dayjs from "dayjs";



export const config = {
	dir: {
	input: "src",
	output: "_site"
	},
};
//Config
export default async function(eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				removeRedundantAttributes: true,
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
	});


	// Passthroughs
	eleventyConfig.addPassthroughCopy({"node_modules/@colinaut/theme-multi-switch/dist/theme-multi-switch.js": "js/theme-multi-switch.js"})
	eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src/key.pub");
    eleventyConfig.addPassthroughCopy("src/admin/");
    eleventyConfig.addPassthroughCopy("src/css/");
    eleventyConfig.addPassthroughCopy("*.xhtml");
    eleventyConfig.addPassthroughCopy("src/js/");
    eleventyConfig.addPassthroughCopy("src/celadon-moe.js");
    eleventyConfig.addPassthroughCopy("src/images/");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("posts/*.md");
	return collection.images("images/*");
    });
	let EleventyRenderPlugin = eleventyConfig.resolvePlugin("@11ty/eleventy/render-plugin");
	eleventyConfig.addPlugin(EleventyRenderPlugin);



	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	const currentDate = new Date();
    const timeOffsetInMS = currentDate.getTimezoneOffset() * 60000;

    eleventyConfig.addPreprocessor("futurePosts", "*", (data, content) => {
		var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime());
		if(pageDate > currentDate) {
			return false
		}
	});
	eleventyConfig.addFilter("parseFormatDate", (strDate) => dayjs(strDate).format("H:mm:ss — ddd, MMMM D"));
	const md = markdownIt()
	eleventyConfig.addFilter("markdown", (markup) => md.render(markup));

	 // Welcomments configuration
	 const absoluteUrl = "https://celadon.moe";
	 eleventyConfig.addFilter("absoluteUrl", (path) => `${absoluteUrl}${path}`);
	 eleventyConfig.addFilter("objectValues", (object) =>
	   object ? Object.values(object) : []
	 );
	 eleventyConfig.addFilter("whereUnset", (array, key) =>
	   array.filter((item) => !item[key] || item[key] === "")
	 );
	 eleventyConfig.addFilter("where", (array, key, value) =>
	   array.filter((item) => item[key] === value)
	 );
	 eleventyConfig.addFilter("interpolate", (a, b) => `${a}${b}`);
	 eleventyConfig.addFilter("markdownify", (value) =>
	   markdownLibrary.render(value)
	 );
	 eleventyConfig.addFilter("sortBy", (array, key) =>
	   array.slice().sort((a, b) => a[key] - b[key])
	 );

	//Markdown Customizations & Plugins
	let mdOptions = {
		html: true,
		breaks: true,
		linkify: false,
	};
	eleventyConfig.setLibrary("md", markdownIt(mdOptions));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItImageFigures, {
		figcaption: true
	}));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnotes));

	

	//RSS Feed Configutation 
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blog", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		stylesheet: "/css/atom.xsl",
		metadata: {
			language: "en",
			title: "Sketches in Ascii",
			subtitle: "The Offcial Home of Cellie Camellia",
			base: "https://celadon.moe/",
			author: {
				name: "Cellie Camellia",
				email: "cellie@celadon.moe", // Optional
			}
		}
	});

	//Navigation Plugin
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	//Webc configuration
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// (The default changed from `false` in Eleventy WebC v0.7.0)
		components: "src/_includes/**/*.webc",
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


