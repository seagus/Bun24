# Bun

##  Table of Contents

- [Prerequisites](#prerequisites)
- [Running backend and frontend](#running-backend-and-frontend)
- [Tasks](#tasks)
  - [1. Installing package](#1-installing-package)
  - [2. File I/O](#2-file-io)
  - [3. Bun:sqlite](#3-bunsqlite)
  - [4. Password](#4-password)

## Prerequisites

Install Bun if not already: 
```bash
curl -fsSL https://bun.sh/install | bash
```
If you have Windows, use remember to use WSL for everything. You can install WSL in PowerShell with the command `wsl --install`. After installation, you should be able to open Ubuntu through the Windows search menu.


## Running backend and frontend

In the folder `frontend` we have a very simple React frontend. Go to the frontend folder and run commands 
```bash
bun install
bun start
``` 
Open your web browser and navigate to the URL specified in the terminal where the development server is running. 


Go to folder `backend`
Run commands:
```bash
bun install
bun --hot index.ts
```

Bun supports two kinds of automatic reloading via CLI flags:
- `--watch` mode hard restarts Bun's process when imported files change.
- `--hot` mode soft reloads the code (without restarting the process) when imported files change.

I you prefer not to use automatic reloading use:
```bash
 bun run index.ts 
 ```

Don't worry, inputs fields should not yet work!

 ## Tasks:


### 1. Installing package

Install npm package [faker](https://fakerjs.dev/guide/#installation) using Bun.

Command to install this package with Bun is:
```bash
bun add @faker-js/faker
```

Modify the GET ('/') to respond with a [random hacker/IT phrase](https://fakerjs.dev/api/hacker.html#phrase) instead of the static 'Hello!' message.

Remember to use import with libraries:
```javascript
import { faker } from '@faker-js/faker';
```

Now if you reload the frontend web page the greeting from the backend should change and be a random phrase.

### 2. File I/O

### Write 

Modify POST ('/write'); Use [Bun.write](https://bun.sh/docs/api/file-io#writing-files-bun-write) to save the message from the fronten to a file `input.txt`.

After this, you should be able to use the frontend webpage to enter a new message via the "Write to file" button to write into to file `input.txt` located in the backend folder. Write something via the webpage and check the file that it changes.

### Read

Modify GET ('/message'); Use [Bun.file](https://bun.sh/docs/api/file-io#reading-files-bun-file) to read the value from file input.txt, and send it to frontend.

Now you should be able to read the message via the frontend webpage by clicking the button "Read from file". Test that this works.

### 3. Bun:sqlite

### Create database
Add local SQLite database to the project using the [bun:sqlite](https://bun.sh/docs/api/sqlite#database)
Give the database this [query](https://bun.sh/docs/api/sqlite#query):
```typescript
  `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`,
```
After you save the file .sqlite -file should appear in the backend folder. (If you are not using automatic reload you probably need to restart the backend)


### Save users
Modify that in the POST ('/register') user is saved with values from the front end to the SQLite database.

Here is an example of how to insert new rows into a table
```typescript
const insert = db.prepare("INSERT INTO Cats (name) VALUES (?)");
insert.run(name);
```


### Find a user
Add in the POST ('/login') the DB call to check if the given user credentials are correct.

Here is an example of how to get back the first result as an object:
```typescript
const cat= db.prepare('SELECT * FROM Cats WHERE name = ?').get(name);
```

### 4. Password
In the previous exercise, we saved passwords as plain text, which is not ideal. Let's fix that. It is very simple with Bun's password API.

https://bun.sh/docs/api/hashing

### Hash
Use hashing in the POST ('/register')

Delete the .sqlite file from the backend folder, and reload the backend to create a new one that won't contain unhashed passwords.

### Verify

Use Bun.password.verify for the password and hash from the database.