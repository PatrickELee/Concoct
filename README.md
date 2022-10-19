# Concoct
Concoct is a Flask web app with a React front end that seeks to provide recipes for those with limited ingredients through Microsoft Azure Custom Vision. Users are able to take pictures of the ingredients (e.g. refrigerators, pantries, etc) and submit it to the Concoct web app which will return recipe recommendations based off the Spoonacular API.

## Table of contents
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Development](#development)
	
## Technologies
Project is created with:
* Python: 3.9.1
* Flask: 2.1.1
* React: 18.0.0
	
## Setup
To begin, ensure that you have cloned this repository to your local machine.

```
$ git clone https://github.com/PatrickELee/Concoct.git
$ cd Concoct
```
For the React part of the app, ensure that you install the project locally with npm:

```
$ npm install
```

For the Python portion of the app, while not necessary, it is highly recommended that you use a virtual environemnt to avoid global dependecy issues, as with all projects.

```
$ pip install virtualenv
$ python3 -m venv venv
$ source venv/scripts/activate
```

Download the necessary Python requirements included in the requirements.txt file.

```
$ pip install -r requirements.txt
```

You'll also want to create your own .env file for local testing purposes to store your environment variables.

## Development
After setup, in order to actually run the project you need to run both the npm and Flask server.
```
$ npm start
```
Then in a separate terminal, run the following:
```
$ flask run
```