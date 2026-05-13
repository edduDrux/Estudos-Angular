import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../interface/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatIconModule],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid {
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
    },
  ]);
}
