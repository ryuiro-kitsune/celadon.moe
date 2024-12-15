// Install, create caches
addEventListener('install', installEvent => {
	installEvent.waitUntil(
		caches.open(cssImageCache)
		.then( staticCache => {
			return staticCache.addAll([
				'/css/base.css',
				'/images/logo.svg'	
			]);
		});
	);
});

addEventListener('fetch', fetchEvent => {
	const request = fetchEvent.request;
	fetchEvent.respondWith(
		fetch(request)
		.then( responseFromFetch => {
			return responseFromFetch;
		})
		.catch( error => {
			return new Response( 
				'<h1>Alert</h1><p>You are offline. Please recconnect your browser to the internet.</p><link rel=stylesheet href=/css/base.css>',
				{
					'headers': {'content-type': 'text/html; charset=utf-8'}
				}
			);
		})
	);
});
