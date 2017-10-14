# mern
Full stack Javscript starter.

## Overview

Mern is a hackable fullstack javascript starter app for skipping all the setup. It uses *M*ongo *E*xpress *R*eact and *N*ode to get you up and running in no time. This project closely resembles the stack we use at [Mixmax](https://mixmax.com/careers) every day (and we're hiring!).

## Setup

Before starting with mern, you'll need to have `nodejs 7.X` or higher installed as well as `yarn` (or `npm`). You can find node [here](https://nodejs.org/en/download/current/), and yarn [here](https://nodejs.org/en/download/current/). After that, you'll need a to have a mongo database to store all your data. Some options are either [running it locally](https://docs.mongodb.com/manual/installation/#mongodb-community-edition), or use something like [mlab's free tier](https://mlab.com).

Now, to start mern, all you need to do is run the following commands:
```bash
# clone this repo, you can use a different git client if you'd like.
git clone https://github.com:ghmeier/mern.git
# enter the project's directory
cd ./mern
# initialize dependencies
yarn
# build the client and start the server
MONGO_URL='your_mongo_url' yarn start
```

Then go to `localhost:8080/app` to view the app.

## Development

So, the basic Todo app isn't all that special, but under the hood everything is wired up for you to start developing a full-stack web app. Check out `src/server/router.js` for how mern maps api requests to responses using `expressjs` ([check out their documentation](https://expressjs.com/)).

To make api calls, we create a connection in `src/server/utils/db` using a library called `mongoist` ([docs](https://github.com/saintedlama/mongoist)) that lets us use async/await ([here's a good overview](https://ponyfoo.com/articles/understanding-javascript-async-await)). You can check out the functions that actually make database calls in `src/server/api/api.js`.

For the front end, mern uses react ([their docs](https://reactjs.org/)), and react-router ([their docs](https://github.com/ReactTraining/react-router)) to display the application. These are loaded in `src/client/main.jsx` and all the external dependencies (like your stylesheets and such) are located in `src/server/views/main/index.html`. If you have images or other static assets you need to load, toss them in the 'public/' directory and you can reference them on the front end using the relative path (if I have `public/image.png` I can load it by doing `<img src="image.png"/>`).

*Extra note: All your `.jsx` files are actually combined into one `.js` file when loaded on the front end by a sweet tool called `rollup` (learn about it [here](https://rollupjs.org/)), but that's not really necessary to start hacking.*
