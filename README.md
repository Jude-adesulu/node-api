# node-api

## About

A simple wallet **API** containing CRUD functionalities and user authentication. Allow users to perform basic transactional operations which includes;

- create wallet for users,
- users can fund their accounts,
- Users can withdraw from account,
- users can transfer to other users.

## Technical Document Design

- [Technical Documentation](https://docs.google.com/document/d/1OftrgWbcVkZVEzUcJl5-LlVZks9_XKttifyEYbrB2M4/edit?usp=sharing)

## Getting Started

The following instructions will give procedures on how to run the API on your local machine for test purposes

### Pre-requisities

Things you need to get setup and running

- [NODE JS](https://nodejs.org)
- [MySQL DB](https://www.mysql.com)
- WAMP/XAMP

### Development Tools

- NodeJs(Express)
- KnexJs
- MySQL
- Mocha

### Installing

To test on your computer

- Clone the repository by running `git clone https://github.com/jude-adesulu/simple-wallet.git`
- CD into the directory
- The .env.example should be renamed to .env and provide your database username and password
- Lanch WAMP/XAMP application
- Click the start button for APACHE and MySQL
- click [here](https://localhost/phpmyadmin/index.php) to create database
  with name `wallet_dev` and `wallet_test`

### Open your terminal

- Run `npm install` or `yarn install` at the root directory to install the dependencies

### Run migration files

- Run `npm run migrate:dev` for the development environment
- Run `npm run migrate:test` for the test environment

### Run the dev app

- Run `npm run start:dev`

### Run the test cases

- Run `npm run test`

### Documentation

- click [here](https:///localhost:3001/docs) to view the documentation and endpoints of the api on localhost
