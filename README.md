# JustUs (Backend)
An app for couples.

## User Stories
- [X] User can send messages to their significant other.
- [X] User can like messages from their significant other.
- [X] User can delete a message.

## The Website
Heroku Link: https://just-us-couples-app.herokuapp.com/

## Technologies Used
- HTML
- CSS
- Javascript
- Node.js
- Mongoose (One-to-Many Relationship)
- Express
- React Bootstrap
- SASS

## Struggles
- I originally started a project with ReactNative and Expo but quickly found I was running into a lot of state issues that I couldn't figure out after 24 hours.
- Creating a One-to-Many Relationship in Mongoose took a lot of reading and experimenting with various solutions found online.
- Figuring out how to structure React Bootstrap's form commponents while passing down and lifting state was challenging.
- Spent a lot of time trying to figure out why I couldn't POST anything in Postman - only to discover I hadn't enabled the Headers "Accept" + "Content-Type" as application/json, in Postman.

## TODO's / Unresolved Items
- [ ] User can SORT by Messages, Pictures, etc.
- [ ] User can upload/change their profile picture.
- [ ] User can send pictures to their significant other.
- [ ] User can send links to their significant other.
- [ ] User can change their favorite color - which, in turn, styles their messages/etc.