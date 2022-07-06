import logging
#logging.basicConfig(level=logging.DEBUG)
import requests, os, ssl
import re
from datetime import date, datetime
from bs4 import BeautifulSoup
from slack_bolt import App


comicName = os.environ.get("COMICNAME")

# Set the Channel Name 
channelName = "comix"
dateToday = datetime.today().strftime("%Y/%m/%d")
messageText = "Your " + comicName + " comic for " + dateToday


### Initializes your app with your bot token and signing secret
app = App(
  token=open('/run/secrets/appToken','r').read().strip(),
  signing_secret=open('/run/secrets/appSecret').read().strip(),
)


url = "https://www.gocomics.com//" + comicName + "/" + dateToday
site = BeautifulSoup(requests.get(url).content, 'html.parser')

print(messageText)

comix = site.find('picture', class_='item-comic-image').find_all('img')[0].attrs['src']

try:
  app.client.chat_postMessage(
    channel=channelName,
    text=messageText,
    blocks=[
      {
        "type" : "image",
        "alt_text" : messageText,
        "image_url" : comix,
        "title" : {
          "type" : "plain_text",
          "text" : messageText
        }
      }
    ]
  )

except SlackApiError as e:
  logger.error(f"Error: {e}")
