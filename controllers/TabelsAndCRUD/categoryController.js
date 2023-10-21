const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await prisma.category.findMany();
    res.status(200).json(allCategory);
  } catch (error) {
    console.log(
      "🚀 ~ file: categoryController.js:11 ~ getAllCategory ~ error:",
      error
    );
  }
};

const createNewCategory = async (req, res) => {
  const { CategoryName } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        CategoryName,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(
      "🚀 ~ file: categoryController.js:18 ~ createNewCategory ~ error:",
      error
    );
  }
};

module.exports = { createNewCategory, getAllCategory };
