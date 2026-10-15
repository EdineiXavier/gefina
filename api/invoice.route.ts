import { Router } from 'express';
import {findAllInvoices, findInvoiceById} from './invoice.service.ts';

const router = Router();

// router.get('/', (_req, res) => {
//   res.status(200).json(invoices);
// });

router.get('/', async (_req, res) => {
  const invoices = await findAllInvoices();

  res.status(200).json(invoices);
  // setTimeout(() => {
  //   res.status(200).json(invoices);
  // }, 8000);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const invoice = await findInvoiceById(id);

  if (!invoice) res.status(404).json({ error: {
    status: 404,
    message: 'Fatura não encontrada'
  }})

  res.status(200).json(invoice);
});

export default router;
