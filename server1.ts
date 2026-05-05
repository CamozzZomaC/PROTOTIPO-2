//Imports
import express, { Request, Response, NextFunction } from "express";
import { debug } from "debug";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
//import { v4 as uuidv4 } from "uuid";

// Import entity
import { Product, initialProducts } from "./data/products.data";

dotenv.config(); // Carga variables de entorno

const log = debug(`${process.env.PROJECT_NAME}:proto`);
log('Loading application...');

const app = express(); // Crea instancia de Express
log('Starting Express app...');

const PORT = process.env.PORT || 3050;

// Middlewares: se encargan de procesar las solicitudes antes de llegar a las rutas
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

log("Cargando middlewares...");

// FAKE DATABASE: Aquí se simula una base de datos con operaciones CRUD básicas
class ProductRepository {
  private products: Product[] = initialProducts;

  getAll(): Product[] { // Devuelve todos los productos
    return this.products;
  }

  getById(id: string): Product | undefined { // Devuelve un producto por su ID o undefined si no se encuentra.
    return this.products.find(p => p.id === id);
  }

  create(product: Product): Product { // Agrega un nuevo producto a la "base de datos" y lo devuelve.
    this.products.push(product);
    return product;
  }

  update(id: string, data: Partial<Product>): Product | null { // Actualiza un producto existente con los datos proporcionados. Devuelve el producto actualizado o null si no se encuentra.
    const product = this.getById(id);
    if (!product) return null;

    Object.assign(product, data);
    return product;
  }

  delete(id: string): boolean { // Elimina un producto por su ID. Devuelve true si se elimina, false si no se encuentra.
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1); //splice es un método de los arrays que permite eliminar elementos. En este caso, se elimina el producto en la posición "index" y se elimina 1 elemento.
    return true;
  }
}
log("Inicializando repositorio...");

// CONTROLLER: Aquí se definen los métodos que manejarán las solicitudes HTTP para cada ruta. Cada método interactúa con el repositorio para realizar las operaciones necesarias y devuelve la respuesta adecuada.
const repository = new ProductRepository();

class ProductController {
  getAll(req: Request, res: Response) { // Devuelve todos los productos en formato JSON.
    res.json(repository.getAll());
  }

  getById(req: Request<{ id: string }>, res: Response) { // Devuelve un producto por su ID. Si no se encuentra, devuelve un error 404.
    const product = repository.getById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  }

  create(req: Request, res: Response) { // Crea un nuevo producto con los datos proporcionados en el cuerpo de la solicitud. Devuelve el producto creado en formato JSON.
    const generateId = () => Date.now().toString();

    const newProduct = new Product(
    generateId(),
    req.body.name,
    req.body.price,
    req.body.stock,
    true,
    new Date(),
    new Date()
    );

    repository.create(newProduct);

    res.status(201).json(newProduct);
  }

  update(req: Request<{ id: string }>, res: Response) { // Actualiza un producto existente con los datos proporcionados en el cuerpo de la solicitud. Si el producto no se encuentra, devuelve un error 404. De lo contrario, devuelve el producto actualizado en formato JSON.
    const updated = repository.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  }

  delete(req: Request<{ id: string }>, res: Response) { // Elimina un producto por su ID. Si no se encuentra, devuelve un error 404. De lo contrario, devuelve un mensaje de éxito.
    const deleted = repository.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });
  }
}

const controller = new ProductController();
log("Inicializando controller...");

// ROUTES: Aquí se definen los endpoints de la API y se asignan los métodos del controlador correspondientes para manejar las solicitudes HTTP. Cada ruta corresponde a una operación CRUD para los productos.
app.get("/products", (req, res) => controller.getAll(req, res));
app.get("/products/:id", (req, res) => controller.getById(req, res));
app.post("/products", (req, res) => controller.create(req, res));
app.put("/products/:id", (req, res) => controller.update(req, res));
app.delete("/products/:id", (req, res) => controller.delete(req, res));

log("Registrando rutas...");


// SERVER: Finalmente, se inicia el servidor en el puerto especificado y se muestra un mensaje en la consola indicando que el servidor está corriendo.
app.listen(PORT, () => {
  log(`Server running on http://localhost:${PORT}`);
});