import { Router } from 'express';
import { findAllInvoices, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from './invoice.service.ts';

const router = Router();

// router.get('/', (_req, res) => {
//   res.status(200).json(invoices);
// });

router.get('/', async (_req, res) => {
  try {
    const invoices = await findAllInvoices();

    res.status(200).json(invoices);
    // setTimeout(() => {
    //   res.status(200).json(invoices);
    // }, 8000);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível carregar as faturas.'
      }
    })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const invoice = await findInvoiceById(id);

    if (!invoice) res.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada'
      }
    })

    res.status(200).json(invoice);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível carregar as faturas.'
      }
    })
  };
})

router.post('/', async (req, res) => {
  try {
    const invoice = await insertInvoice(req.body);

    if (!invoice) res.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada'
      }
    })

    res.status(201).json(invoice)
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: { 
      status: 500, 
      message: 'Não foi possível inserir a fatura.' 
    }});
  }
})

router.put('/:id', async (req, res) => {
  try {
    const invoice = await modifyInvoice(Number(req.params.id), req.body);

    if (!invoice) res.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada'
      }
    })

    res.status(200).json(invoice)
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: { 
      status: 500, 
      message: 'Não foi possível modificar a fatura.' 
    }});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await removeInvoice(Number(req.params.id))

    if (!deleted) res.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada'
      }
    })

    res.status(204).end()
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: { 
      status: 500, 
      message: 'Não foi possível deletar a fatura.' 
    }});
  }
})

export default router;
