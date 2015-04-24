# LiveDB-RethinkDB Examples

These are a few simple examples of how to run ShareJS with RethinkDB as your database. These examples depend on [LiveDB-RethinkDB]() instead of the default [LiveDB-mongo]().

## Setup and Run

1. Install Node.js

If you don’t have Node.js installed and you’re on a mac, use `brew` to install it.

```
brew update 
brew install node
```

2. Install RethinkDB

If you don’t have RethinkDB installed, go ahead and [install it](http://rethinkdb.com/docs/install/)

If you’re on a mac, use brew to install it:

```
brew update
brew install rethinkdb
```

Once installed, go ahead and run RethinkDB:
```
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.rethinkdb.plist
```

If you want to launch RethinkDB on login, run the following code:
```
ln -sfv /usr/local/opt/rethinkdb/*.plist ~/Library/LaunchAgents
```

To see if works, go to `http://localhost:8080` and see if you get the data explorer.

![Data Explorer](https://static.platzi.com/post/rethinkdb-dashboard.png)

3. Clone git repository

Clone the git repository from GitHub.

```
git clone https://github.com/thejsj/sharejs-rethinkdb-example.git
cd sharejs-rethinkdb-example
```

4. Install npm depedencies

```
npm install
```

5. Install client dependencies with bower

```
npm install -g bower
bower install
```

6. Run the server

To run the development server, run the following:

```
npm run dev
```

To run the normal server, run the following:

```
npm start
```
