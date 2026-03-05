import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './shopping-cart.html',
    styleUrls: ['./shopping-cart.css']
})
export class ShoppingCartComponent implements OnInit {
    cart: any[] = [];
    message: string = '';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart(): void {
        this.http.get<any[]>('/cart', { withCredentials: true }).subscribe({
            next: (data) => {
                this.cart = data.map(item => ({ ...item, selected: false }));
            },
            error: (err) => { console.error(err); }
        });
    }

    getTotal(item: any): number {
        return item.price * item.quantity;
    }

    updateCart(): void {
        const updates = this.cart.map(item => ({ _id: item._id, quantity: item.quantity }));
        this.http.post<any>('/cart/update', updates, { withCredentials: true }).subscribe({
            next: (data) => {
                this.message = 'Shopping cart updated!';
                this.loadCart();
                setTimeout(() => this.message = '', 2000);
            }
        });
    }

    removeSelected(): void {
        const ids = this.cart.filter(item => item.selected).map(item => item._id);
        if (ids.length === 0) {
            this.message = 'Please select items to remove.';
            setTimeout(() => this.message = '', 2000);
            return;
        }
        this.http.post<any>('/cart/remove', { ids }, { withCredentials: true }).subscribe({
            next: (data) => {
                this.message = 'Selected items removed!';
                this.loadCart();
                setTimeout(() => this.message = '', 2000);
            }
        });
    }
}
