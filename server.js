
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
// TODO Example page, need to implement with running parameter
var url = "https://wordpress.com/learn-more/?v=blog" // It contains only rsd and rss

var page_document = '';
var page_html = '';
var page_header = '';
var page_head = '';
var page_body = '';
var output = new Object();
var atom_array = new Array();
var rss_array = new Array();

// Array creation function which is checking the link type and push the url into the regarding array
// It have two parameter, one is the exact link, and the other one is the link type
function create_array(link, type) {
  for (var f = 0; f < link.length; f++) {
    array_item = link[f];
    if (array_item.name === "href") {
      // TODO Final type will be atom+xml
      if (type === "application/rsd+xml") {
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
  console.log(page_document);

  // Write out the output to the console with the reletad function
  return_output();
});




