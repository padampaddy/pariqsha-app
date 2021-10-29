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

export interface ICoin {
  coins: number;
  id: string;
  most_popular: boolean;
  images: string;
  price: number;
}

export interface ICoins {
  users_coin_plans: {
    coins: number;
    id: string;
    most_popular: boolean;
    images: string;
    price: number;
  }[];
}

export interface ICoinsOrder {
  coins_orders: {
    id: string;
    user_id: string;
    cost_coins: number;
    no_of_coins: number;
    coins_plan_id: string;
  };
}
