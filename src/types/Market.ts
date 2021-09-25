export interface IMarketProduct {
  market_product: {
    images: string;
    name: string;
    price_coins: number;
    id: string;
    category_id: string;
    description: string;
  }[];
}

export interface IMarketOrder {
  market_orders: {
    id: string;
    user_id: string;
    cost_coins: number;
    details: JSON;
  };
}
