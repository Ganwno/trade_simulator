# Trade Simulator

Trade Simulator is a web app that creates the experience of day-trading stocks with fake money and real-ish data. The current version is hosted on Render as [trade-simulator-app](https://trade-simulator-app.onrender.com). There are already 'stock market simulator' websites out there that provide learning tools for long-term stock investing (for example see [here](https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/three-best-stock-simulators/)). Trade Simulator creates a different experience, one of short-term trading with a constantly updating data, like a game version of Robinhood. 

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
7. [License](#license)

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
- Render deployment

<a id="teck_stack"></a>
## 3. Tech Stack

![Ruby](icons/ruby.svg) Ruby,
![Ruby on Rails](icons/rubyonrails.svg) Rails,
<img src="icons/rspec.png" height="30px" width="30px"> Rspec,
![PostgreSQL](icons/postgresql.svg) PostgreSQL,
![JavaScript](icons/javascript.svg) JavaScript,
![Redux](icons/redux.svg) Redux,
![Node.js](icons/nodedotjs.svg) Node.js,
![React](icons/react.svg) React,
![Boostrap](icons/bootstrap.svg) Bootstrap,
![Babel](icons/babel.svg) Babel,
![CSS](icons/csswizardry.svg) CSS,
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///9G47c84rQt4bGY7dKQ7NCi79ju/fg44rPC9OT3/vz6/v3p/PaI681Q5Lp76cjO9+rZ+O596smr8Nq48+BY5b3G9ecg4K4D36vT9+zj+vNo58K99OKb7tXD9OWv8d1v6MNEnehfAAADXklEQVR4nO3d23aiMBhA4RpPUesBFa0HRt//KTu9mbVif1RyDrO/a0qzJ4INOvDxAQAAAAAAAAAAAORnWm2ut93kXU1l/PRM3GhhbNNIu/kTo21+2m1r/ZfqYHg19rGUflibhUdpk2XwvGpy+UkbdKVnZqG0B2UWDqVNxmHzzs1Kd48rp3B2sc0ro3C/0tZ5JRReB0592Reease+zAvnW+l39ajwYPHeUFTh2MME5lw4rX1MYMaFlae+bAsPzqfQzAuvfg7BfAtvHgOzLPQ5g1kWHrwGZlhY+TvJ5Fk49fY2kWth7Tkwu8LxO1OolH7f0bxOsz0OBWbhl7DF0dN1mtdnGaXVZXzbVOfPd839DM2P+asZ1Hq5yWrEXW2fFip9P6QeoaPT09eoXp9TD9DZ6tkE1tXrHeTu9uS9XjepR+dD+0Go1Cn14Hxon0JVF33+/Kf1KFSXxeufLkDrsl5dUg/Nk3vLYahW/ZjBj8/WKZymHponk5Yp1L04i/5oWTXpSeqB+XJueZHWKQajVr8NRo473ckvUp3kT7UgK+CLfJZZexlxVyEKFy1TmGY1EaLwJB6GiaYwSKF8GOqNnxF3FaJQXtwrPwPuLESh+G6oXE/QtkIUiodhsj9nAhRO5RNNqlVhgEL5s4pkq6YAheLaMNlhGKJwL36YsPc04M4CFIpvh+nWTdEKk10ADlAoLn91ssU9hRYojIxCC7kVSv8boVeF97Vg57TLzAoDoLB8FJaPwvJRWD4Ky0dh+TIrPGwEbtfFMis8Cl+mHrp9Czqzwv9gjU9hdxRGRqEFCiOj0AKFkVFogcLIKLRAYWQUWqAwsv5fp7nOBG7fssusMAAKy0dh+SgsH4Xlo7B8FJYvs8LtUnBz2mVmheJd53u1Au7/Gp9CCxRGRqEFCiOj0AKFkVFogcLIKLRAYWQUWhALh70qlB7Zl64wwHWaxVziabzdiaPpyX1iAQAAgF5rpAdpfZnbaOlZW+ZNXDfSbvJ4Zpe8Aja3ER9hcjc2Ee8Knsdz1yikkEIKKaSQQgoppJBCCimkkMJ+FDbSp9xHc5uB9NHzQ6F0u/jhQ6H0qx4KxU+53a7THMaj3x7+0Rphk5F5K/izuBvzAYN7aTcjs1Dazci8oAUAAAAAAAAAAAAE8w39zlW3oYFBQgAAAABJRU5ErkJggg==" width="32px"></src> Render

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

This is my first full-stack web app project. The code was written from scratch following the lectures and guides in [App Academy Open](https://www.appacademy.io/course/app-academy-open). Many thanks to the developers for writing these modules and components used in Trade Simulator so I didn't have to:

- [Finnhub-ruby](https://github.com/Finnhub-Stock-API/finnhub-ruby)
- [React-fuzzy](https://www.npmjs.com/package/react-fuzzy)
- [React-movable](https://www.npmjs.com/package/react-movable)


<a id="author"></a>
## 6. Author

Shuhan (Hannah) Liu, [shhan.liu@gmail.com](mailto:shhan.liu@gmail.com)

<a id="license"></a>
## 7. License

MIT License

Copyright (c) 2022 Shuhan Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
