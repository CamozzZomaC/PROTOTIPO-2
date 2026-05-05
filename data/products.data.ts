export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public is_active: boolean,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

export const initialProducts: Product[] = [
  new Product(
    "1",
    "Laptop",
    1200,
    10,
    true,
    new Date(),
    new Date()
  ),
  new Product(
    "2",
    "Mouse",
    25,
    50,
    true,
    new Date(),
    new Date()
  ),
  new Product(
    "3",
    "Teclado",
    80,
    20,
    false,
    new Date(),
    new Date()
  ),
    new Product(
        "4",
        "Monitor",
        300,
        15,
        true,
        new Date(),
        new Date()
    )
];