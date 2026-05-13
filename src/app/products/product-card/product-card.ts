import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../interface/product';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly addButtonLabel = input('Add to Cart');
}
