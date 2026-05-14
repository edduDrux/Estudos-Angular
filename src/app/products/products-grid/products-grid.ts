import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CartService } from '../../cart/cart-service';
import { Product } from '../interface/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatIcon, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid {
  private readonly _cartService = inject(CartService);

  protected readonly searchTerm = signal('');
  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      description:
        'Experience unparalleled sound quality with our premium wireless headphones, featuring active noise cancellation and a comfortable over-ear design.',
      price: 199.99,
      originalPrice: 299.99,
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      description:
        'Stay on top of your health and fitness goals with our smart fitness tracker, offering heart rate monitoring, sleep tracking, and a sleek design.',
      price: 49.99,
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      description:
        'Enhance your workspace with our ergonomic office chair, designed for comfort and support during long hours of sitting.',
      price: 149.99,
      originalPrice: 199.99,
    },
  ]);

  protected readonly filteredProducts = computed<Product[]>(() => {
    const term = this.searchTerm().toLowerCase();

    if (!term) return this.products();

    return this.products().filter((product: Product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    });
  });

  protected onAddToCard(product: Product) {
    this._cartService.addToCart(product);
  }

  // protected clearSearch() {
  //   this.searchTerm.set('');
  // }

  // protected trimSearch() {
  //   this.searchTerm.update((value) => value.trim());
  // }
}
