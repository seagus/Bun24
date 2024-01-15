import express, { Request, Response } from 'express';
import cors from 'cors';
import { Database } from "bun:sqlite";

const app = express();
const port = 8080;

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
  res.send("Hello!");
});

app.post('/write', async (req: Request, res: Response) => {
  try {
    const { message } = req.body as SubmitRequestBody;

    // 2. TASK: Write the message to file input.txt

    const responseBody: SubmitResponseBody = { success: true, message };
    res.json(responseBody);
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/read', async (req: Request, res: Response<SubmitResponseBody>) => {
  try {

    // 2. TASK: Read value from file input.txt, and save to message constant.
    const text = "";

    if (text) {
      const responseBody: SubmitResponseBody = { success: true, message: text };
      res.json(responseBody);
    } else {
      const responseBody: SubmitResponseBody = { success: false, error: "File empty" };
      res.status(500).json(responseBody);
    }
  } catch (error) {
    console.error('Error fetching hash from file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // 4. TASK: Hash password using Bun.password

    // 3. TASK: Save user to db

    res.json({ success: true });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // 3. TASK: Get user from the db
    const user = { id: 1, username: "", password: "" } as User;

    // 4. TASK: Verify password
    if (user && password === user.password) {
      res.json({ success: true });
    } else {
      return res.status(401).json({ error: 'Authentication failed. Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
