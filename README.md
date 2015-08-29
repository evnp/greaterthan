# greaterthan
A Chrome extension that lets you map keywords to urls in a centralized list

Once you've checked out the repo, navigate to `chrome://extensions/`. Check the box in the upper right that says "Developer mode". Click the button that says "Load unpacked extension" and select the folder `greaterthan/extension`.

Now, navigate to a new tab and type `>` followed by a space into the address bar. If everything is working properly, you should see the omnibox activate with a blue rectangle.

Now you can type a keyword followed by `enter` to go to a mapped url. If a keyword doesn't exist in the map yet, you'll be prompted for a url to map it to.

You'll also need to have a webserver running for new keywords/urls to be saved. Right now only a local webserver is supported, using Flask. From the `greaterthan` root directory, run
```
$ python server.py
```
