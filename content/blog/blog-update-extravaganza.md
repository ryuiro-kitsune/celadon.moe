+++
title = "Site Update Finished!!!"
author = ["Celadon Camellia"]
date = 2023-08-05T14:39:00-07:00
taxonomies.tags = ["Blog", "Zola", "WebDev", "I Don", "t even know why this took a whole month", "pain"]
draft = false
+++

Wowzas! Porting the entire site into Zola took longer than expected, lets chat about it.

<!-- more -->

So, I used to use 11ty. I really like 11ty as a program and this it is very compatent at what it does. Unfortunatly---or fortunatly, depending which radical group you've fallen in with---I am not a Javascript dev. I know zero JS code and that makes 11ty painful to get working. And so, I moved on to Rustier pastures.

Zola is delightful. It comes with [Sass](https://sass-lang.com/) support built in, and is much more opinionated than 11ty on how to structure your site.

Now, I love unopinionated software as much as the next doofus---the fact I can point 11ty at a single json file plus template and it will render out a giftlist website for me is magical---but the freeform nature of 11ty was making it difficult to manage my website, and even making me try to do things that I _technically_ could do but _really_ shouldn't have (most of the old [celadon (dot) moe](https://celadon.moe/) site is now permentally embedded in json files and written in unicode escaped html) so having the software gently guide me away from that garbage is much appriciated.

"So you switched ssgs, but what about the format you're storing the content in?" I hear no one ask. Well, lemme tell you.

The original site had json objects with unicode escaped html in the backend. It was ugly and gross.

Yeah, that's garbage. I decided to switch to using org-mode and ox-hugo to generate makrdown files from a central org-file. Now the same post looks much cleaner.

But yeah, those are the two main changes. I also cleaned up the css a little and rewrote the templates.

Anyways, bye!
