const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSuppliers = async (req, res) => {
  const allSupplier = await prisma.supplier.findMany();
  if (!allSupplier) {
    res.status(400).json({ message: "not found " });
  }
  res.status(200).json(allSupplier);
};

const createNewSupplier = async (req, res) => {
  const { SupplierName, ContactName, ContactEmail, ContactPhone } = req.body;

  const newSupplier = await prisma.supplier.create({
    data: {
      SupplierName,
      ContactName,
      ContactPhone,
      ContactEmail,
    },
  });
  res.status(201).json(newSupplier);
};

module.exports = { createNewSupplier, getAllSuppliers };
