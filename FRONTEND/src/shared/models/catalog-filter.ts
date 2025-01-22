export class CatalogFilter {
  name?: string;
  minPrice?: number | null;
  maxPrice?: number | null;

  constructor(name?: string, minPrice?: number | null, maxPrice?: number | null) {
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }

  toQueryString(): string {
    let queryString = '';
    if (this.name) {
      queryString += 'name=' + this.name + '&';
    }
    if (this.minPrice && this.minPrice !== null) {
      queryString += 'pricemin=' + this.minPrice + '&';
    }
    if (this.maxPrice && this.maxPrice !== null) {
      queryString += 'pricemax=' + this.maxPrice;
    }
    return queryString;
  }
}
