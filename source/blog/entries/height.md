---
title: The Canon heights of our gang
date: 2023-05-05
---
# Table of Contents

1.  [Intro](#orgaa54edf)
2.  [Step one, make a csv file](#org90a3d3d)
3.  [Finding that dumb ratio!](#org8dfb667)
4.  [Python](#orgec56902)
5.  [What did we learn?](#org3205fc1)


<a id="orgaa54edf"></a>

# Intro

So, in [the latest Collegestuck bonus story](https://celadon.moe/stories/collegestuck/), I spend a great deal of time calculating the canon heights of all the characters at the time of the story.

Well, unlike my poor avatar who only exist to lose an argument with Miss Lalonde, I actually had to do that math.

The base of my "canon height estimate" is a series of pictures captured by my family at the Requim Cafe.

<img src="/images/blog/size-1.png">
<img src="/images/blog/size-2.png">
<img src="/images/blog/size-3.png">

Now, we can see that A, these heights have inches next to them, and B, the humans are quite smol.

But, as Rose put it, "the scale could just have easily been normalized at 13 [years old]&#x2026;" So I wanted to calculate a rough idea of how tall everyone would be post puberty.


<a id="org90a3d3d"></a>

# Step one, make a csv file

I knew I wanted to do this calculation in Python, so the first step was making a csv with everyone's heights.

    Karkat,61
    Tavros,64
    Gamzee,70
    Sollux,64
    Eriden,64
    Equius,75
    Nepeta,56
    Aradia,60
    Feferi,61
    Terezi,60
    Vriska,66
    kanaya,68
    Dave,63
    Rose,58
    Jade,62
    John,60
    Roxy,58
    Dirk,64
    Jake,61
    Jane,58

Boom, okay now for the hard part.


<a id="org8dfb667"></a>

# Finding that dumb ratio!

I am a creative writing major, not a math major. The most math I do is computer science, and I mostly work with texual data. So I needed to get the math shit done.

So I pulled out a notebook and got cracking.

(The research I've done sugessted a addition of 20% during puberty, I just fucking went with that because I was getting drowsy.)

$$x + \frac{1}{5}*y = y$$
$$x+\frac{1}{5}*y -\frac{1}{5}*y = y -\frac{1}{5}*y$$
$$x=\frac{4}{5}*y$$
$$\frac{5}{4}*x=\frac{5}{4}*\frac{4}{5}*y$$
$$\frac{5}{4}*x=y$$

Wooo! Math!

So yeah, I just need to multiply their initial heights by a factor of 1.25 to get an aproximation for their actual height.


<a id="orgec56902"></a>

# Python

I tossed together a little function that processed the csv like so:

    def findHeights():
      ifile = open("height.csv")
      results = ""
      for line in ifile:
          line = line.strip()
          data = line.split(',')
          nh = float(data[1])*1.25
          inch = nh % 12
          foot = nh // 12
          results += data[0] + ":\t" + str(foot) + " ft " + str(int(inch)) + " in\n"
      ifile.close()
      print(results)

and it gave me the results of, oh&#x2026;

    Karkat:	6.0 ft 4 in
    Tavros:	6.0 ft 8 in
    Gamzee:	7.0 ft 3 in
    Sollux:	6.0 ft 8 in
    Eriden:	6.0 ft 8 in
    Equius:	7.0 ft 9 in
    Nepeta:	5.0 ft 10 in
    Aradia:	6.0 ft 3 in
    Feferi:	6.0 ft 4 in
    Terezi:	6.0 ft 3 in
    Vriska:	6.0 ft 10 in
    kanaya:	7.0 ft 1 in
    Dave:	6.0 ft 6 in
    Rose:	6.0 ft 0 in
    Jade:	6.0 ft 5 in
    John:	6.0 ft 3 in
    Roxy:	6.0 ft 0 in
    Dirk:	6.0 ft 8 in
    Jake:	6.0 ft 4 in
    Jane:	6.0 ft 0 in

That is too tall.

I reevaluated my coefficiant and basicially freehand changed it until the numbers felt right, ending up on 1.1

And so:

    Karkat:	5.0 ft 7 in
    Tavros:	5.0 ft 10 in
    Gamzee:	6.0 ft 5 in
    Sollux:	5.0 ft 10 in
    Eriden:	5.0 ft 10 in
    Equius:	6.0 ft 10 in
    Nepeta:	5.0 ft 1 in
    Aradia:	5.0 ft 6 in
    Feferi:	5.0 ft 7 in
    Terezi:	5.0 ft 6 in
    Vriska:	6.0 ft 0 in
    kanaya:	6.0 ft 2 in
    Dave:	5.0 ft 9 in
    Rose:	5.0 ft 3 in
    Jade:	5.0 ft 8 in
    John:	5.0 ft 6 in
    Roxy:	5.0 ft 3 in
    Dirk:	5.0 ft 10 in
    Jake:	5.0 ft 7 in
    Jane:	5.0 ft 3 in

Our canon heights!


<a id="org3205fc1"></a>

# What did we learn?

Nothing, have a good weekend.

