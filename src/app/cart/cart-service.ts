import { Injectable, signal } from '@angular/core';

import { Product } from '../products/interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<Product[]>([]);

  addToCart(product: Product) {
    this._cartItems.update((items: Product[]) => [...items, product]);
  }
}
