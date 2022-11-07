export type LoginResponse = {
  accessToken: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Vendor = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  businessAddress: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type Order = {
  _id: string;
  userId: string;
  products: [
    {
      product: Product;
      quantity: number;
    }
  ];
  amount: number;
  address: string;
  status: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  vendor: Vendor;
  price: number;
  image: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
};
