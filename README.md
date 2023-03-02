# Public Gists Explorer

## Description

This project is created with the help of create-react-app with Typescript template to faciliate strictly typed javascript.

## Requirements

### Goal
The goal of this technical assessment is to evaluate ability and core competency in areas relevant to the front-end development at EventMobi. These include:
• Ability to use JavaScript MVC frameworks to interact with APIs.
• Competence with creation and implementation of basic designs.
• Aptitude with HTML and CSS to create clean, readable and performant code.

Through the completion of this test, you will be able to demonstrate your abilities as a developer.

### Details
Use the API provided by GitHub Gist API (which is documented here), create a basic website as a single-page app with React.
Your task is to use Gist API to create a simple single-page application. A user should be able to enter a username and get the full list of public Gists for that user. 

### The following are a list of functional requirements for this assignment:

• Search: When a user enters a username, it should be able to get a full list of public Gists by that user.

• Filetype: Convert the filetypes of the files in the gist into a tag/badge, (e.g, if the returned gist has list of files containing python and JavaScript files, the gist should have the respective tags/badges).

• Fork: Username/Avatar of the last 3 users who forked it with avatar linking to the fork.

## Assumptions

1. This application apis are being used from github public gist document [here](https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#about-gists) and followed JavaScript way of getting the api response
2. The response came from public gists are not unquie sometimes, so while rendering data in the table getting the key warning in the console.
3. No testing was carried out due to time constraint but testing can be performed using jest and snapshot testing.
4. The page size for each response is set to 30

## Application Architecture

Added pagination to load 30 records for each page

### React + React Hooks

[React](https://reactjs.org/)

### Typescript:

[Typescript](https://www.typescriptlang.org/) is used for type checking of the data being used and enforce the strong type checking in our app.

### Redux Toolkit:

Carlisting app used [Redux toolkit](https://redux-toolkit.js.org/) as a middle layer to manage the side effects of the applications and as well as to maintain the single source of truth with redux application statement management

### Material-UI Component Library

[Material-UI](https://mui.com/material-ui/getting-started/overview/) is being used to get the look and feel of the application. It is the componet library used in this application.


## Running the app:

To run the public-gists-explorer app, you need to run the following commands

yarn or npm start

### Github

[Github](https://github.com/interviewassessments/public-gists-explorer)

## Branched used

main - master or production branch

The rest are the feature branches used while developing the app.

## Improvements

As this assignment deals with frontend development, there should some specific reliable information should be presented so that we can make the look and feel lot better. As most of the information provided is not always present like Description or some reliable information then it would be much better to showcase them pointing to the details.

## Feedback

Overall, I enjoyed working on this assessment as it is more open ended so you can put your creative thoughts to make it fun developing activity along with refreshing you User Experience skills to get the best out of it with minimum number of user clicks.
