import express, { Request, Response } from 'express';
import cors from 'cors';
import { Database } from "bun:sqlite";
import {faker} from '@faker-js/faker'

const app = express();
const port = 8080;

// Create db and add Users table.
const db = new Database("mydb.sqlite", { create: true });
db.query(  `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`,).run();

interface SubmitRequestBody {
  message: string;
}

interface SubmitResponseBody {
  success: boolean;
  message?: string;
  error?: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

// 3. TASK: create sqlite database

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // 1. TASK: faker
  res.send(faker.hacker.phrase());
});

app.post('/write', async (req: Request, res: Response) => {
  try {
    const { message } = req.body as SubmitRequestBody;

    // 2. TASK: Write the message to file input.txt

    await Bun.write('input.txt', message)

    const responseBody: SubmitResponseBody = { success: true, message };
    res.json(responseBody);
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ error: 'Failed to write message to file.' });
  }
});

app.get('/read', async (req: Request, res: Response<SubmitResponseBody>) => {
  try {

    // 2. TASK: Read value from file input.txt, and save to message constant.
    const text = await Bun.file('input.txt').text();

    if (text) {
      const responseBody: SubmitResponseBody = { success: true, message: text };
      res.json(responseBody);
    } else {
      const responseBody: SubmitResponseBody = { success: false, error: "File is empty." };
      res.status(500).json(responseBody);
    }
  } catch (error) {
    console.error('Error fetching hash from file:', error);
    res.status(500).json({ error: 'Failed to read from file.' });
  }
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // 4. TASK: Hash password using Bun.password
    const hash = await Bun.password.hash(password);

    // 3. TASK: Save user to db
    const insert = db.prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
    insert.run(username, hash);

    res.json({ success: true });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to register user. Username must be unique.' });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // 3. TASK: Get user from the db
    const user= db.prepare('SELECT * FROM Users WHERE username = ?').get(username) as User;
    //const user = { id: 1, username: "", password: "" } as User;


    // 4. TASK: Verify password
    if (user && await Bun.password.verify(password, user.password)) {
      res.json({ success: true });
    } else {
      return res.status(401).json({ error: 'Authentication failed.' });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
