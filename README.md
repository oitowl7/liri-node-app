# LIRI: A NODE APP
### *HOMEWORK #10:* A Better Siri...in the Eyes of Some Beholders 
(*note:* #'s 8 & 9 were skipped to keep the homework number even with the week number)

This was our first Node.js only app. Up until this point, we had done basically all front-end work but now we finally were on the back-end side of things. As I mentioned, this app uses Node. It is the main back-end language and technology we used for the entirety of the class. The purpose of this app was to create a digital personal assistant, much like Siri is for Apple, except this one is **VERY** focused in what it will do. It is called Liri.

***
## The App
### Landing
![Landing](https://i.imgur.com/zq8WUrV.jpg)

Upon `node liri`ing the app, you are met with this screen. You are able to have Liri do one of 4 very specific tasks, which it performs flawlessly 47% of the time.

### Tweets
![Tweets](https://i.imgur.com/daSnn4p.jpg)

If the user selects the "View tweets" option, they are met with two questions: Which tweeter? and How Many? Liri then wades into the cesspool of twitter users to find this one specific user and display the number of tweets the user has selected.

### Spotify
![Spotify](https://i.imgur.com/ccvRk1H.jpg)

If the user selects the "Spotify a song" option, they are again met with questions. They are asked the title of the song and who the artist is. Once the user does this, once again Liri ventures forth into the depths of the internets to a place called Spotify and returns with information about the song the user requested, specifically: Track, Album, Artist, and a link to a preview of the song if it exists.

### Movie Information
![Movie Information](https://i.imgur.com/KQQwIiP.jpg)

If the user selects "Movie information", they are again prompted with a question, however only one this time. They are asked the name of the movie they want to get information on. When the user enters this information, Liri once again departs, this time on the OMDB API road, to the internets to find information on the movie that the user specified. Unfortunately, despite Liri's dedication and bravery, she isn't too smart. She only returns with one movie and it is always the first one she finds. So, best not to ask for movies that have the same name as other movies...like Ben-Hur.

### Run Random Function
![random function](https://i.imgur.com/oSDu18Y.jpg)

This is just a random function with a little bit of information in a text file that runs when the user selects it. It isn't interactive, it's just a thing I had to do to prove I could make my app look in other files.

***
## Technologies

As mentioned before, this is a Node.js app. Packages that I used were dotenv, inquirer, node-spotify-api, request, and twitter. Inquirer was what I used to make all the questions and route the user to certain places based off of those responses. Request was used for getting info from OMDB as it didn't have a great NPM package. Twitter and node-spotify-app were used to interact with those APIs when their name's were called.

***
## Lessons Learned

Where to even begin? This was my first ever back-end app. As such, just learning Node, NPM, and how to even make and debug an app that doesn't run on a page was a: ![mind blown](https://media1.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.webp)

Also, I would say making the user experience at least not terrible was a whole giant can of worms. Using the Inquirer (possibly the hardest word ever to type) NPM package helped with this a lot, but there was still a lot of ironing out to do. 

Finally, learning how to use the NPM packages for API calls was an experience to say the least. At this point, I was still a bit shaky on APIs and how to get information from them (and let's be honest I still am, some of the documentation on them makes me shudder). So to use now request, twitter, or spotify packages to get information from their APIs was a real challenge at times.

***
## Issues

There are a couple little bugs still in there. I know that if you type a song name and an artist that isn't properly punctuated or if the artist never made a song by that title, it just returns nothing. I probably should have make a message to say that there was nothing. Also, I think that narrowing down the movie search probably would have been a good thing. Just searching by name means that often the user won't get what they are looking for.
