import express, { Request, Response } from "express";
import productRoutes from "./routes/product.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Define a route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});


app.use("/products", productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
