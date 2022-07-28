import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
const router = Router();
import { Dao_product, Dao_cart } from "../contenedores/DAOS/index.js";

// Product routes

router.get("/productos", async (req, res) => {
  const response = await Dao_product.getAll();

  res.json(response);
});


router.get("/productos/:id", async (req, res) => {
  const response = await Dao_product.listar(req.params.id);

  res.json(response);
});

router.post('/productos')










// Cart routes

router.get("/carritos", async (req, res) => {
  const response = await Dao_cart.listarAll();

  res.json(response);
});


router.get("/carritos/:id", async (req, res) => {
  const response = await Dao_cart.listar(req.params.id);

  res.json(response);
});

export default router;