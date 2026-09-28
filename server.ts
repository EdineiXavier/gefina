import { createServer } from 'node:http';
import send from './send.ts';

createServer(function(req, res) {
  if(req.url !== '/api/health') {
    send(res, 404, { message: 'Recurso não encontrado' });
    return;
  }

  if(req.method !== 'GET' && req.url === '/api/faturas') {
  }

  send(res, 200, { status: 'ok' });

}).listen(3000);


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