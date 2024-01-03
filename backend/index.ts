import express, { Request, Response } from 'express';
import cors from 'cors';
import { Database } from "bun:sqlite"; 

const app = express();
const port = 8080;

interface SubmitRequestBody {
  text: string;
}

interface SubmitResponseBody {
  success: boolean;
  hash?: string;
  error?: string;
}

app.use(cors());
app.use(express.json());

//const db = new Bun.Database('mydb.sqlite');

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
