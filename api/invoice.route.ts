import { Router } from 'express';
import invoices from './invoice.data.ts';

const router = Router();

router.get('/api/invoices', function (req, res) {
  res.status(200).json(invoices);
});

router.get('/api/invoices/:id', function (req, res) {
  const id = +req.params.id;

  for(let i = 0; i < invoices.length; i++) {
    if(invoices[i].id === id) {
      res.status(200).json(invoices[i]);
      return;
    }

    res.status(404).json({ error: { message: 'Fatura não encontrada'}});
  }

});

export default router;