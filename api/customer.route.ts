import { Router } from "express";
import { findCustomerOptions } from "./customer.service.ts";

const router = Router();

router.get('/options', async (_req, res) => {
    const customersOptions = await findCustomerOptions();

    res.status(200).json(customersOptions)
})

export default router;