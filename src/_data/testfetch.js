

import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "http://localhost:8080/feed.xml";

	let json = await Fetch(url, {
		duration: "1d", // save for 1 day
		type: "parsed-xml", // we’ll parse JSON for you
	});

	return json;
};

