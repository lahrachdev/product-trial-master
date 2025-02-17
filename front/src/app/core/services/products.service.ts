import { Injectable, inject } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { API_BASE_URL } from "../../app.config";
import { Product } from "../models/product.model";


@Injectable({
    providedIn: "root"
})
export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = inject(API_BASE_URL);
    private readonly path = `${this.baseUrl}/products`;

    // Modify loadProducts() to return an Observable<Product[]>
    public loadProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError(() => this.http.get<Product[]>("assets/products.json")),
            catchError(() => of([])) // If both fail, return an empty array
        );
    }
}
