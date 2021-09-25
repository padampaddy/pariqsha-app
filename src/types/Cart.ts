export class CartItem {
  private mId: string;
  private mName: string;
  private mDescription: string;
  private mImages: string[];
  private mPriceCoins: number;

  constructor(item: {
    id: string;
    name: string;
    description: string;
    images: string;
    price_coins: number;
  }) {
    this.mId = item.id;
    this.mName = item.name;
    this.mDescription = item.description;
    this.mImages = item.images.split(",");
    this.mPriceCoins = item.price_coins;
  }

  getId = () => this.mId;

  getName = () => this.mName;

  getPrice = () => this.mPriceCoins;

  getCoverImage = () => this.mImages[0];

  getShortDescription = () => this.mDescription.slice(0, 50);

  getDescription = () => this.mDescription;
}
