import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
    products: any[] = [];
    message: string = '';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any[]>('/products-list', { withCredentials: true }).subscribe({
            next: (data) => { this.products = data; },
            error: (err) => { console.error(err); }
        });
    }

    addToCart(product: any): void {
        this.http.post<any>('/cart/add', product, { withCredentials: true }).subscribe({
            next: (data) => {
                this.message = `"${product.name}" added to cart!`;
                setTimeout(() => this.message = '', 2000);
            },
            error: (err) => { console.error(err); }
        });
    }
}
