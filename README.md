# deckcheck

This script fetches object values from [TweetDeck](https://tweetdeck.twitter.com) to automate checks on what could have changed with updates.
We can't just diff the bundled JavaScript as that is done with Webpack, which means all variables change and the order is different with every build. We picked
the most significant values out of the main object we can imagine are the best to compare.

## Setup

### Requirements

* NodeJS (stable)

### Prerequisites

* `npm install` to install dependencies

### Configuration

* `discord` contains a block with values related to reporting to a Discord webhook
  * `enabled` to enable to disable the reports to Discord
  * `webhook_url`, the URL of the webhook deckcheck will post to
  * `username`, username of the Bot user it will post as
  * `avatar_url`, avatar of the Bot user it will post as
* `output_path`, directory for the generated reports
* `output_url`, URL the generated reports will be available (publicly)
* `data_path`, directory path where the data gets written to/read from

### Running

* `npm start`

## Features

The script visit TweetDeck and then returns an object consisting of different parts of the main object. This object will be saved
if there was no data prior, or compared against an old set of data and then generate a HTML report showing the differences of both
data sets.

## Contributing

* [Fork](https://github.com/DeckHack/deckcheck/fork) and clone the repository
* Make a new branch
* Apply your changes
* Open a [Pull Request](https://github.com/DeckHack/deckcheck/compare)

## License

deckcheck is licensed under the GPLv3