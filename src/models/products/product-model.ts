export type ProductModel = {
  id: string;
  description: string;
  title: string;
  price: number;
};

export type CreateProductModel = {
  description?: string;
  title: string;
  price?: number;
};
