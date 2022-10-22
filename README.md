# Treeview Chat

![Screenshot](https://raw.githubusercontent.com/josh-perry/treeview-chat.web/master/docs/img/chat.png)

## What is this?
A quick experiment with a Vue frontend (this repository) and Express [backend API](https://github.com/josh-perry/treeview-chat.api) that is an anonymous chat presented in a tree. Any comment node can be expanded by leaving an anonymous comment of your own with no registration.

## Demo
~~The demo is hosted on Heroku [here](https://treeview-chat-web.herokuapp.com/). Every day at midnight (UTC) the database is wiped.~~
Nevermind, Heroku no longer provides a free tier.

## Technologies
### Web
* Vue
* Express as server
* Axios
* Heroku for hosting
* No other CSS or JavaScript libraries

### Backend API
* Express
* Postgres
* Sequelize
* Heroku for hosting:
  * API itself
  * Database (Postgres)
  * Scheduled task to clear messages table
