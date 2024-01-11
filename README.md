# Bun

## Prerequisites

Install Bun if not already: 
```bash
curl -fsSL https://bun.sh/install | bash
```
If you have Windows, use remember to use WSL for everything. 
You can install WSL in PowerShell with command `wsl --install`, after that you should able to open Ubuntu though the Windows search menu.


## Runnin backend and frontend

In the folder `frontend` we have a very simple React frontend. Go to the frontend folder and run commands 
```bash
bun install
bun start
``` 
Open your web browser and navigate to the the URL specified in the terminal where the development server is running. 


Go to folder `backend`
Run commands:
```bash
bun install
bun --hot index.ts
```

Bun supports two kinds of automatic reloading via CLI flags:
- `--watch` mode hard restarts Bun's process when imported files change.
- `--hot` mode soft reloads the code (without restarting the process) when imported files change.

I you prefer not to use automatic reloadin use:
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

Modify the GET ('/') to response with a [random hacker/IT phrase](https://fakerjs.dev/api/hacker.html#phrase) instead of the static 'Hello!' message.

Remember to use import with libraries:
```javascript
import { faker } from '@faker-js/faker';
```

Now if you reload the frontend web page the greeting from the backend should change and be a random phrase.

### 2. File I/O: 

### Write 

Modify POST ('/write'); Use [Bun.write](https://bun.sh/docs/api/file-io#writing-files-bun-write) to save the message from the fronten to a file `input.txt`.

### Read

Modify GET ('/message'); Use [Bun.file](https://bun.sh/docs/api/file-io#reading-files-bun-file) to read value from file input.txt, and send it to frontend.

### 3. Bun:sqlite

Add local SQLite database to the project using the [bun:sqlite](https://bun.sh/docs/api/sqlite#database)
Give database this [query](https://bun.sh/docs/api/sqlite#query):
```typescript
  `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`,
```
After you save file you .sqlite file should apper to backend folder.