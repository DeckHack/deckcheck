# deckcheck

This script is planned to fetch object values from [TweetDeck](https://tweetdeck.twitter.com) to automate checks on what could have changed with updates.
We can't just diff the bundled JavaScript as that is done with Webpack, which means all variables change and the order is different with every build. We picked
the most significant values out of the main object we can imagine are the best to compare.

## Setup

### Requirements

* NodeJS (stable)

### Prerequisites

* `npm install` to install dependencies

### Running

* `npm start`

## Features

The script visit TweetDeck and then returns an object consisting of different parts of the main object.

### What's missing?

_Basically everything._

* Saving returned values
* Comparing old and new values
* Generating reports (putting on a website or the DeckHack Discord, maybe?)

## Contributing

* [Fork](https://github.com/DeckHack/deckcheck/fork) and clone the repository
* Make a new branch
* Apply your changes
* Open a [Pull Request](https://github.com/DeckHack/deckcheck/compare)

## License

deckcheck is licensed under the GPLv3