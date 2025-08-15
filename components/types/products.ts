export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

export interface ProductFormData {
  title: string;
  price: string;
  image: string;
  description?: string;
}
