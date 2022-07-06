# gocomics

This project will download comics from GoComics.com and post them to a slack channel

## Required files
In order to run this, you will need 2 files which are passed into the Docker Container as a secret file:
* SLACK_BOT_TOKEN.txt
* SLACK_SIGNING_SECRET.txt

These files should contain a single value, which is the respective key for your Slack Application

## Executing

Run the main program:

```sh
./comix.sh
```

This will create a new docker container (if it doesn't already exist) and then parse a list of comics to fetch, posting them to your main channel

## Configuration

There is an array inside `comix.sh` which contains the names of the comics to read

## Future

This is pretty basic, I'll need to re-add in "other" comic search patterns and probably add some information on how to set up the Slack App.

Would be good if I can have it automatically create and join a channel, rather than the mess that it currently goes through.
