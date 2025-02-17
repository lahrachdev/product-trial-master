import { Component, inject, OnInit } from "@angular/core";
import { ProductStore } from "app/core/stores/products.store";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';

import { ProductCardComponent, ProductFormComponent } from "./components";
import { CartStore } from "app/core/stores/cart.store";
import { Product } from "app/core/models/product.model";



@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, ProductCardComponent],
  providers: [ProductStore]
})
export class ProductListComponent implements OnInit {

  constructor() { }
  private readonly productStore = inject(ProductStore);
  private readonly cartStore = inject(CartStore);

  public products = this.productStore.products;  // Signal
  public isLoading = this.productStore.isLoading;
  public cartItems = this.cartStore.items;

  ngOnInit() {
    this.productStore.loadAll();
  }

  updateQuantity(newQuantity: number, product: Product) {
    const existingItem = this.cartItems().find(item => item.id === product.id);

    if (newQuantity <= 0) {
      this.cartStore.removeFromCart(product.id); // Remove from cart if quantity is 0
      return;
    }

    if (existingItem) {
      this.cartStore.updateQuantity(product.id, newQuantity);
    } else {
      console.log("add to cart");
      this.cartStore.addToCart({ ...product, quantity: newQuantity });
    }
  }

  isProductInCart(product: Product): boolean {
    return this.cartItems().some(item => item.id === product.id);
  }

  getProductQuantity(productId: number) {
    return this.cartItems().find(item => item.id === productId)?.quantity || 0;
  }



}
