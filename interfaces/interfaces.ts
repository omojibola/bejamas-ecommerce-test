export interface productData {
  price: number;
  name: string;
  id: string;
  currency: string;
  image: {
    url: string;
    alt: string;
  };
  featured: boolean;
  bestSeller: boolean;
  description: string;
  category: string;
  recommendations: {
    first: string;
    second: string;
    third: string;
  };
}

export interface singleProduct {
  price: number;
  name: string;
  id: string;
  currency: string;
  image: {
    url: string;
    alt: string;
  };
  featured?: boolean;
  bestSeller?: boolean;
  category: string;
}

export interface cartData {
  url: string | undefined;
  price: number | undefined;
  name: string | undefined;
}
