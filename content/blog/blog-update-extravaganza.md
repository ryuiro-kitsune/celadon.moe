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

The original site had this format for posts in the backend:

```json
    {
    "title": "Uncertainty",
    "subseries": "Moving in Together",
    "number": 2,
    "authornote": "<p>Day two of this serial flash fiction experiment.<p>I'm enjoying the process so far, but I'm not sure how sustainable it is for me personally.</p><p>I'm planning on updating the home page for this series to look a bit nicer tommorow after I finish wednesday's entry.</p><p>Ta-ta for now gang!</p>",
    "previous": "Off to college",
    "next": "Machinations",
    "date": "2023-04-10T12:00-05:00",
    "content": "\u003Cp\u003EThe car ride was quiet. Dirk had the wheel of his dingy Honda Civicand had the aux, causing the only sound to be the faint pop music comingfrom the speakers.\u003C/p\u003E\u003Cp\u003E“So bro, you ready for your new life of freedom?”\u003C/p\u003E\u003Cp\u003EDave stared out of the car window at the endless fields of nothingand farmland.\u003C/p\u003E\u003Cp\u003E“Bro? You alive over there.”\u003C/p\u003E\u003Cp\u003EDave continued staring.\u003C/p\u003E\u003Cp\u003E“We’re all we’re gonna have for this next year, you gotta be able totalk to me about things Dave.”\u003C/p\u003E\u003Cp\u003E“Why did you choose Iowa?” His voice was quieter than it was inpublic, like satin to denim, “I’ve been thinking about it for the pastthree hours, but I don’t know the reason that of all the schools inTexas, of all the schools in the \u003Cem\u003Ecountry\u003C/em\u003E, why’d you pick aschool in not even the largest city in Iowa?”\u003C/p\u003E\u003Cp\u003EDirk adjusted the center mirror to look at the car beheind them, “Whyis this weighing on your consious now and not when I applied two yearsago?”\u003C/p\u003E\u003Cp\u003EDave sat in silence, “Because I’m following you now, and John isfollowing me. Your descion matters, it didn’t then. It just was one moreimpulsive descion you’d made in a long line of impulsive descions.”\u003C/p\u003E\u003Cp\u003E“Dude, where’s this coming from? You should have said something whenyou were fucking applying.”\u003C/p\u003E\u003Cp\u003E“Fuck off, I didn’t know John was going to apply to the same collegeas me! He didn’t even ask why I was applying!”\u003C/p\u003E\u003Cp\u003EThe car was silent once again. After two miles clicked by, Dirkfinally replied.\u003C/p\u003E\u003Cp\u003E“I applied because Roxy’s mom works here. She was my only friend bythe end of school so I wanted to be with her.”\u003C/p\u003E\u003Cp\u003E“…is it a good school.”\u003C/p\u003E\u003Cp\u003E“I would have told you to go somewhere else if it wasn’t at leastokay.”\u003C/p\u003E\u003Cp\u003EThe car was silent for a long while after that.\u003C/p\u003E"
},
```

Yeah, that's garbage. I decided to switch to using org-mode and ox-hugo to generate makrdown files from a central org-file. Now the same post looks like this:

```org
*** TODO Moving in Together
:PROPERTIES:
:EXPORT_FILE_NAME: moving-in-together
:EXPORT_HUGO_CUSTOM_FRONT_MATTER: :taxonomies.characters '("Dave Strider" "Rose Lalonde" "Dirk Strider" "Damara Megido" )
:EXPORT_HUGO_CUSTOM_FRONT_MATTER+: :taxonomies.rating '("PG-13")
:END:
The car ride was quiet. Dirk had both the wheel of his dingy Honda Civic and the aux, causing the only sound to be the faint pop music coming from the speakers.

Dirk glanced up

"So bro, you ready for your new life of freedom?"

Dave stared out of the car window at the endless fields of nothing and farmland.

"Bro? You alive over there."

Dave continued staring.

blah blah blah etc
```

This is much nicer.

But yeah, those are the two main changes. I also cleaned up the css a little and rewrote the templates.

Anyways, bye!
