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

app.use(cors());
app.use(express.json());

const db = new Database('mydb.sqlite', { create: true });
db.query(
  `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`,
).run();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


/*
app.post('/submit', async (req: Request<{}, {}, SubmitRequestBody>, res: Response<SubmitResponseBody>) => {
  try {
    const { text } = req.body as SubmitRequestBody;
    const hash = await Bun.password.hash(text);
    console.log('Hash:', hash);
    await Bun.write('input.txt', hash);

    const responseBody: SubmitResponseBody = { success: true, hash };
    res.json(responseBody);
  } catch (error) {
    console.error('Error processing submission:', error);
    const responseBody: SubmitResponseBody = { success: false, error: 'Internal Server Error' };
    res.status(500).json(responseBody);
  }
});

app.get('/hash', async (req: Request, res: Response<SubmitResponseBody>) => {
  try {
    const file = Bun.file('input.txt');
    const hash = await file.text();
    const responseBody: SubmitResponseBody = { success: true, hash };
    res.json(responseBody);
  } catch (error) {
    console.error('Error fetching hash from file:', error);
    const responseBody: SubmitResponseBody = { success: false, error: 'Internal Server Error' };
    res.status(500).json(responseBody);
  }
});
*/


app.post('/write', async (req: Request<{}, {}, SubmitRequestBody>, res: Response<SubmitResponseBody>) => {
  try {
    const { message } = req.body as SubmitRequestBody;
    await Bun.write('input.txt', message);

    const responseBody: SubmitResponseBody = { success: true, message };
    res.json(responseBody);
  } catch (error) {
    console.error('Error processing submission:', error);
    const responseBody: SubmitResponseBody = { success: false, error: 'Internal Server Error' };
    res.status(500).json(responseBody);
  }
});

app.get('/message', async (req: Request, res: Response<SubmitResponseBody>) => {
  try {
    const file = Bun.file('input.txt');
    const message = await file.text();
    const responseBody: SubmitResponseBody = { success: true, message };
    res.json(responseBody);
  } catch (error) {
    console.error('Error fetching hash from file:', error);
    const responseBody: SubmitResponseBody = { success: false, error: 'Internal Server Error' };
    res.status(500).json(responseBody);
  }
});



app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await Bun.password.hash(password);

    const query = db.prepare(`INSERT INTO Users (username, password) VALUES (?, ?)`);
    query.run(username, hashedPassword);

    res.json({ success: true });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user: User | undefined = db.prepare('SELECT * FROM Users WHERE username = ?').get(username) as User | undefined;

    if (!user || !(await Bun.password.verify(password, user.password))) {
      return res.status(401).json({ error: 'Authentication failed. Invalid username or password.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
app.get('/messages', (req: Request, res: Response) => {
  try {
    const query = db.query("SELECT * FROM Messages;");
    const messages = query.all();
    console.log(messages)
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
