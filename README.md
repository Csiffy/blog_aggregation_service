
# Blog Aggregation Service - Collect atom and rss link from URL


## Table of contents

- [Installation instruction](#install)
- [Usage](#usage)
- [Debugging mode](#debugging)


---


## Install

To Install all dependencies, follow this instruction

https://nodejs.org/en/download/package-manager

Navigate to the project folder and run the following command:

    npm install

## Usage

Change the url variable in the server.js file and run the script

```js
// Variable declaraion section
// PLEASE MODIFY THESE PARAMETERS AS NEEDED
// atom type url => https://github.com/FreshRSS/FreshRSS
// rss type url => https://wordpress.com/learn-more/?v=blog
var url = "https://wordpress.com/learn-more/?v=blog";
```

    node server.js


## Debugging

Change the isDebugMode variable to true in the server.js file, if you would like running the script in debug mode

```js
var isDebugMode = true;
```

    node server.js


