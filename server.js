
/*
EXAMPLE OUTPUT
{
"atom": [
"http://example.net/feed",
"http://t.co/asdfsf23fdsw234"
],
"rss": [
"http://example.com/rss.xml",
"https://example.org/rss2.rss"
]
}
*/
// Import the necessary modules

const parse5 = require('parse5');
const request = require('request');

// Variable declaraion section
// PLEASE MODIFY THESE PARAMETERS AS NEEDED
// atom type url => https://github.com/FreshRSS/FreshRSS
// rss type url => https://wordpress.com/learn-more/?v=blog
var url = "https://wordpress.com/learn-more/?v=blog";
var isDebugMode = false;



var page_document = '';
var page_html = '';
var page_header = '';
var page_head = '';
var page_body = '';
var output = new Object();
var atom_array = new Array();
var rss_array = new Array();

// Function section
// This is a helper function for debuging, it is using the isDebugMode variable to control the console output
// It has only one parameter, the string what you want to write out to the console
console.debug = function(args)
{
  if (isDebugMode){
    console.log(args);
  }
}

// Array creation function which is checking the link type and push the url into the regarding array
// It have two parameter, one is the exact link, and the other one is the link type
function create_array(link, type) {
  for (var j = 0; j < link.length; j++) {
    array_item = link[j];
    if (array_item.name === "href") {
      if (type === "application/atom+xml") {
        atom_array.push(array_item.value);
      }
      else if (type === "application/rss+xml") {
        rss_array.push(array_item.value);
      }
    }
  }
}

// Output creation function and write out to the console, it has not parameter
function return_output () {
  output["atom"] = atom_array;
  output["rss"] = rss_array;
  console.log(JSON.stringify(output));
}

// Main section
// Call the request function with the URL parameter
request(url, function (err, res, body) {
  page_header = res.headers;
  const page_document = parse5.parse(body);
  console.debug(page_document);
  for (var f = 0; f < page_document.childNodes.length; f++) {
    if (page_document.childNodes[f].nodeName === "html") {
      page_html = page_document.childNodes[f];
    }
  }
  if (page_html === 0) {
    console.log('Error, did not found html element');
    process.exit(-1);
  }
  console.debug('---------- Page HTML ----------');
  console.debug(page_html);
  console.debug('-------------------------------');
  for(var g = 0; g < page_html.childNodes.length; g++) {
    console.debug('page_html belseje', page_html.childNodes[g].tagName);
    if (page_html.childNodes[g].tagName === 'head') {
      page_head = page_html.childNodes[g].childNodes;
    }
    if (page_html.childNodes[g].tagName === 'body') {
      page_body = page_html.childNodes[g].childNodes;
    }
  }
  console.debug('----------- Page Head ---------');
  console.debug(page_head);
  console.debug('-------------------------------');
  for(var h = 0; h < page_head.length;h++){
    current_item = page_head[h];
    if (current_item.nodeName === "link") {
      link_items = current_item.attrs;
      for (var i = 0; i < link_items.length; i++) {
        namevalue_item = link_items[i];
        if (namevalue_item.name === "type" && (namevalue_item.value === "application/atom+xml" || namevalue_item.value === "application/rss+xml")) {
          create_array(link_items, namevalue_item.value);
        }
      }
    }
  }
  // Write out the output to the console with the reletad function
  return_output();
});




