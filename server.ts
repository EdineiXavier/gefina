import { createServer } from 'node:http';


createServer(function(req, res) {
  if(req.url !== '/api/health') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Recurso não encontrado' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
  console.log('Knocked on the door!');

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