# Trade Simulator

Trade Simulator is a web app that creates the experience of day-trading stocks with fake money and real-ish data. The current version is hosted on Heroku as [trade-simulator-app](https://trade-simulator-app.herokuapp.com/#/). There are already 'stock market simulator' websites out there that provide learning tools for long-term stock investing (for example see [here](https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/three-best-stock-simulators/)). Trade Simulator creates a different experience, one of short-term trading with a constantly updating data, like a game version of Robinhood. 

### Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech_stack)
4. [How-To](#how_to)
	- [Install](#install)
	- [Run App](#run_app)
	- [Run Tests](#run_tests)
5. [Credits](#credits)
6. [Author](#author)

<a id="overview"></a>
## 1. Overview

In the app a user creates a 'simulation' by selecting parameters like time range, which stocks to trade, the amount of money to start with and transaction fee. Then the back end uses a stock data API ([Finnhub](https://finnhub.io/)) to import stock data over the selected period for the selected securities and creates the 'simulation' object. The user sees their account value, current holdings, price and % change of each stock and a 'Start' button to begin.

The front end and back end continuously run the simulation. The front end requests updated stock prices each second. To create the feel of real-time trading, the application generates randomized stock prices at each second based on the actual minute-by-minute prices  (1min frequency is the highest available at the free API tier). While prices continue to update each second the user can buy/sell shares and the account value chart updates based on the latest price data.

When a simulation ends a summary is created with the gain/loss amount, total time, date created, etc. and saved in the database. The user sees a list of all previous simulation summaries on the homepage.
 
 
<a id="features"></a>
## 2. Features

- User authentication and protected routes
- User persistence
- Cross-site request forgery protection
- Live requests to external data API
- Asynchronous front end requests
- Real-time data updates
- Heavily-styled charts and components
- Database storage
- Model-view-controller framework
- Automated unit and integration tests
- Heroku deployment with staging environment ([trade-simulator-staging](https://trade-simulator-staging.herokuapp.com/#/login))

<a id="teck_stack"></a>
## 3. Tech Stack

![Ruby](icons/ruby.svg) Ruby, Rspec,
![Ruby on Rails](icons/rubyonrails.svg) Rails, 
![PostgreSQL](icons/postgresql.svg) PostgreSQL,
![JavaScript](icons/javascript.svg) JavaScript,
![Redux](icons/redux.svg) Redux,
![Node.js](icons/nodedotjs.svg) Node.js,
![React](icons/react.svg) React,
![Boostrap](icons/bootstrap.svg) Bootstrap,
![Babel](icons/babel.svg) Babel,
![CSS](icons/csswizardry.svg) CSS,
![Heroku](icons/heroku.svg) Heroku


<a id="how_to"></a>
## 4. How-To

<a id="install"></a>
### Install

To clone Git repository:

	git clone https://github.com/hannahliu-github/trade_simulator.git

When cloned as above the app's root directory is named `trade_simulator`. Go to this folder in a command window and run the following to install Ruby requirements:

	bundle install

Download and install [PostgreSQL](https://www.postgresql.org/). In the Terminal, start PostgreSQL with the `psql` command. This displays something like

	psql (13.3)
	Type "help" for help.

	username=# 
	
At the `psql` prompt (`username=#`) enter the following lines (**be sure to add the `;`**)

	username=# CREATE DATABASE trade_simulator_development;
	CREATE DATABASE

Finally, change directory to the `frontend` folder and run

	npm install

<a id="run_app"></a>
### Run App
From root directory run:

	rails server

Then visit [localhost:3000](http://localhost:3000/).

<a id="run_tests"></a>
### Run Tests

From root directory run:

	bundle exec rspec

<a id="credits"></a>
## 5. Credits

This is my first full-stack web app project. The code was written from scratch following the lectures and guides in [App Academy Open](https://www.appacademy.io/course/app-academy-open). Many thanks to the developers of these third-party modules and components that are used in Trade Simulator:

- [Finnhub-ruby](https://github.com/Finnhub-Stock-API/finnhub-ruby)
- [React-fuzzy](https://www.npmjs.com/package/react-fuzzy)
- [React-movable](https://www.npmjs.com/package/react-movable)


<a id="author"></a>
## 6. Author

Shuhan (Hannah) Liu, [shhan.liu@gmail.com](mailto:shhan.liu@gmail.com)