import express from 'express';

type InvoiceStatus = 'pending' | 'paid'; // "atrasado vai ser um dado derivado da data atual"

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}

const invoices: Invoice[] = [
  {
    id: 1,
    amount: 125000,
    status: 'pending',
    issueDate: '2026-06-01',
    dueDate: '2026-06-15',
    customer: { id: 1, name: 'Construtora Meridiano', email: 'contato@meridiano.com.br' },
  },
  {
    id: 2,
    amount: 348000,
    status: 'paid',
    issueDate: '2026-05-12',
    dueDate: '2026-06-11',
    customer: { id: 1, name: 'Construtora Meridiano', email: 'contato@meridiano.com.br' },
  },
  {
    id: 3,
    amount: 96500,
    status: 'pending',
    issueDate: '2026-06-20',
    dueDate: '2026-07-20',
    customer: { id: 2, name: 'Gráfica Aurora', email: 'contato@graficaaurora.com.br' },
  },
];

const app = express();
// const porta = 3000;

// app.use(express.json()); 

app.use(function (req, res, next) { // middleware que pega todas as requisições
  console.log(req.method + ' ' + req.url);
  next();
});


app.get('/api/health', function (req, res) {
  res.status(200).json({ status: 'ok'})
});


app.get('/api/invoices', function (req, res) {
  res.status(200).json(invoices);
});


app.get('/api/invoices/:id', function (req, res) {
  const id = Number(req.params.id);
  const invoice = invoices.find((f) => f.id === id);

  if (!invoice) {
    res.status(404).json({ message: 'Fatura não encontrada' });
    return;
  }

  res.status(200).json(invoice);
});


app.use(function (req, res) { // recebe todas as requisições que não foram tratadas
  res.status(404).json({ message: 'Recurso não encontrado' });
});

app.listen(3000, function() {
  console.log(`Servidor rodando em http://localhost:3000`);
});










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