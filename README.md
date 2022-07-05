# gocomics

This project will download the latest comic from GoComics and post it to slack

## Required Variables
Set up the following environment variables:

```sh
export COMICNAME=[The Name of the comic]
export SLACK_BOT_TOKEN=[The xoxb token for your bot in Slack]
export SLACK_SIGNING_SECRET=[The Signing Secret for your Slack Bot]
```

## Usage
You will need to first initialise the dependencies:
```sh
npm install
```

Then, run the main program:

```sh
node index.js
```
