export const mockProducts = [
  {
    _id: "prod_honey_500",
    name: "Pure Natural Honey",
    slug: "pure-natural-honey-500g",
    description: "Our Pure Natural Honey is sourced directly from the Farm.",
    shortDescription: "Raw, unprocessed honey from pristine Himalayan forests",
    category: "honey",
    subCategory: "raw-honey",
    tags: ["Boosts Immunity", "Rich in Antioxidants", "Natural Energy"],
    sku: "VED-HONEY-500",
    price: 899,
    discountedPrice: 449,
    stock: 50,
    unit: "500g",
    images: ["https://placehold.co/400x400?text=Honey"],
    featured: true,
    status: "active" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "prod_turmeric",
    name: "Natural Turmeric Powder",
    slug: "natural-turmeric-powder",
    description: "Our Natural Turmeric Powder is sourced from trusted farms.",
    shortDescription: "High curcumin turmeric powder for immunity and wellness",
    category: "spices",
    subCategory: "powders",
    tags: ["High Curcumin", "Immunity Boost", "Anti-inflammatory"],
    sku: "VED-HALDI-200",
    price: 159,
    discountedPrice: 129,
    stock: 100,
    unit: "200g",
    images: ["https://placehold.co/400x400?text=Turmeric"],
    featured: true,
    status: "active" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "prod_coriander",
    name: "Natural Coriander Powder",
    slug: "natural-coriander-powder",
    description: "Our Natural Coriander Powder is made from carefully selected seeds.",
    shortDescription: "Aromatic coriander powder made from premium quality seeds",
    category: "spices",
    subCategory: "powders",
    tags: ["Aromatic", "Digestive Aid", "Rich Flavor"],
    sku: "VED-DHANIYA-200",
    price: 129,
    discountedPrice: 99,
    stock: 80,
    unit: "200g",
    images: ["https://placehold.co/400x400?text=Coriander"],
    featured: true,
    status: "active" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

export const mockProductsResponse = {
  success: true,
  message: "Products fetched successfully",
  data: {
    items: mockProducts,
    pagination: { page: 1, limit: 10, total: 3, pages: 1 },
  },
};

export const mockCart = {
  success: true,
  message: "Cart fetched successfully",
  data: {
    items: [
      {
        productId: "prod_honey_500",
        name: "Pure Natural Honey",
        price: 449,
        image: "https://placehold.co/400x400?text=Honey",
        quantity: 1,
        slug: "pure-natural-honey-500g",
      },
    ],
    totalAmount: 449,
  },
};

export const mockEmptyCart = {
  success: true,
  message: "Cart fetched successfully",
  data: { items: [], totalAmount: 0 },
};

export const mockWishlist = {
  success: true,
  message: "Wishlist fetched successfully",
  data: { items: [] },
};
