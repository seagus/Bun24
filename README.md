# Bun

## Prerequisites

Install Bun: 
```bash
curl -fsSL https://bun.sh/install | bash
```
If you have Windows, use WSL.

In the folder `frontend` we have a very simple React frontend. Go to the frontend folder and run commands 
```bash
bun install
bun start
``` 
Open your web browser and navigate to the the URL specified in the terminal where the development server is running. 


## Tasks:

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