import express from 'express';
import path from 'node:path'
import fs from 'node:fs'
import invoicesrouter from './invoice.route.ts';
import pool from './database.ts'
import dashboard from './dashboard.route.ts' // como é default pode nomear o router como quiser
import handleError from './error.middleware.ts';

const app = express();
// const porta = 3000;

app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((req, _res, next) => {
  // middleware que pega todas as requisições
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', async (_req, res) => {
  try {
    const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');
    res.status(200).json({ 
      status: 'Server is running',
      database: connect.rows[0].datname
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'Server is running',
      message: 'unavaliable'
    })
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoicesrouter);

app.use(express.static(dist))

app.use((req, res, next) => {
  if (req.url.startsWith('/api') || !fs.existsSync(path.join(dist, 'index.html'))){
    next();
    return;
  }

  res.sendFile(path.join(dist, 'index.html'))
})

app.use((_req, res) => {
  res.status(404).json({ error: {
    status: 404,
    message: 'Recurso não encontraado'
  }})
});

app.use(handleError);

app.listen(Number(process.env.PORT) || 3000)

// const request = {
//   params: {
//     id: '1'
//   }
// }

// const volta = req.parse()

// import { createServer } from 'node:http';

// const porta = 3000;

// const servidor = createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Olá! Meu primeiro servidor backend está funcionando.');
//     return;
//   }

//   if (req.method === 'GET' && req.url === '/sobre') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Esta é a página sobre.');
//     return;
//   }

//   res.writeHead(404, { 'Content-Type': 'text/plain' });
//   res.end('Não encontrado');
// });

// servidor.listen(porta, () => {
//   console.log(`Servidor rodando em http://localhost:${porta}`);
// });

// export function greet(name: string){ // CommandJS
//   console.log('Hello ' + name + '!');
// }

// export function sayMyName(name: string){
//   console.log('Your name is ' + name + '!');
// }

// greet('Edinei')
// sayMyName('Edinei')

// camelCase
