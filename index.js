const { App } = require('@slack/bolt');
const fetch = require("node-fetch");
const parseHTML = require("node-html-parser");
const fs = require("fs"),
  util = require("util");

// Grab environment variables
const appToken  = fs.readFileSync(util.format("/run/secrets/appToken"),"utf-8");
const appSecret = fs.readFileSync(util.format("/run/secrets/appSecret"),"utf-8");
const comicName = process.env.COMICNAME;

// Set the Channel Name 
const channelName = "comix";

// Generate todays date
let today = new Date();
let year  = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day   =   ("0" + (today.getDate())).slice(-2);

// Generate the message text
const messageText = "Your " + comicName + " comic for " + today.toLocaleDateString()

// Generate the URL to parse
switch (process.env.COMICNAME) {
  case "dilbert":
    url = "https://dilbert.com/strip/" + year + "-" + month + "-" + day;
    break;
  default:
    url = "https://www.gocomics.com/" + comicName.toLowerCase() + "/" + year + "/" + month + "/" + day;
    break;
}

// Initialize your app with your bot token and signing secret
const app = new App({
  token: appToken,
  signingSecret: appSecret
});

// Get the Image from the HTML for the comic strip
async function getImage() {
  console.log("Fetching " + url);
    var response = await fetch(url);
    switch (response.status) {
        case 200:
            var template = await response.text();
            var code     = parseHTML.parse(template);
            // Extract the specific URL for the image from the HTML
            switch (process.env.COMICNAME) {
              case "dilbert":
                image = code.querySelector('.img-comic').rawAttrs;
                break;
              default: 
                image = code.querySelector('.item-comic-image').querySelector('img').rawAttrs;
                break;
            }
            return image.substr(image.indexOf('src='), image.length).split('"')[1];
            // ToDo: Make this better - can we include this as a variable or something to make it more generic?
        case 404:
            console.log('Not Found');
            break;
    }
};

// Post the image in a message in a Slack Channel
async function publishMessage(imageUrl) {
  try {
    console.log("Attempting to post " + imageUrl + " to " + channelName);
    const result = await app.client.chat.postMessage({
      token: appToken,
      channel: channelName,
      text: messageText,
      blocks: [
        {
          "type" : "image",
          "alt_text" : messageText,
          "image_url" : imageUrl,
          "title" : {
            "type" : "plain_text",
            "text" : messageText
          }
        }
      ]
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

let imageUrl = getImage();
console.log(imageUrl);
imageUrl.then(function(result) {
  console.log(result);
  publishMessage(result);
});
