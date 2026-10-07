import express from 'express';
import path from 'node:path'
import invoicesrouter from './invoice.route.ts';

const app = express();
// const porta = 3000;

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

// app.use(express.json());

app.use((req, _res, next) => {
  // middleware que pega todas as requisições
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoicesrouter);

app.use(express.static(dist))

app.use((_req, res) => {
  // recebe todas as requisições que não foram tratadas
  res.status(404).json({ message: 'Recurso não encontrado' });
});

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
