import { Request, Response } from "express";
import { InventoryStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Ensure ID is a valid number
        const productId = Number(id);
        if (isNaN(productId)) {
            res.status(400).json({ error: "Invalid product ID" });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Error fetching product" });
    }
};

// Create a product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            code,
            name,
            description,
            image,
            category,
            price,
            quantity,
            internalReference,
            shellId,
            inventoryStatus,
            rating
        } = req.body;

        // Validate required fields
        if (!code || !name || !description || !image || !category ||
            price === undefined || quantity === undefined ||
            !internalReference || shellId === undefined || !inventoryStatus || rating === undefined) {
            res.status(400).json({ error: "Missing required fields" });
        }

        // Validate inventoryStatus enum
        if (!Object.values(InventoryStatus).includes(inventoryStatus)) {
            res.status(400).json({ error: "Invalid inventory status" });
        }

        const product = await prisma.product.create({
            data: {
                code,
                name,
                description,
                image,
                category,
                price,
                quantity,
                internalReference,
                shellId,
                inventoryStatus,
                rating
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Error creating product" });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, price, description }
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: Number(id) }
        });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
};
