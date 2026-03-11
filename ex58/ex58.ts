import { Component, OnInit } from '@angular/core';
import { Fashion } from './fashion';
import { FashionService } from './fashion.service';

@Component({
  selector: 'app-ex58',
  standalone: false,
  templateUrl: './ex58.html',
  styleUrls: ['./ex58.css']
})
export class Ex58 implements OnInit {
  viewMode: 'client' | 'admin' = 'client';
  
  fashions: Fashion[] = [];
  filteredFashions: Fashion[] = [];
  cart: Fashion[] = [];
  
  // Client View state
  styles: string[] = ['Casual', 'Formal', 'Sportswear'];
  selectedStyle: string = '';
  selectedFashionClient: Fashion | null = null;
  
  // Admin View state
  showEditMode: boolean = false;
  currentFashion: Fashion = this.createEmptyFashion();

  constructor(private fashionService: FashionService) {}

  ngOnInit() {
    this.loadFashions();
    this.loadCart();
  }

  createEmptyFashion(): Fashion {
    return { _id: '', title: '', details: '', thumbnail: '', style: '' };
  }

  loadFashions() {
    this.fashionService.getFashions().subscribe(data => {
      this.fashions = data;
      this.filterByStyle(); // initial filter
    });
  }

  // --- Client Methods ---
  filterByStyle() {
    if (this.selectedStyle) {
      this.fashionService.getFashionsByStyle(this.selectedStyle).subscribe(data => {
        this.filteredFashions = data;
      });
    } else {
      this.filteredFashions = this.fashions;
    }
  }

  viewFashionClient(f: Fashion) {
    this.selectedFashionClient = f;
  }
  
  closeFashionClient() {
      this.selectedFashionClient = null;
  }

  addToCart(f: Fashion) {
    this.fashionService.addToCart(f).subscribe(res => {
      this.cart = res.cart;
      alert("Added to cart!");
    });
  }

  loadCart() {
    this.fashionService.getCart().subscribe(data => {
      this.cart = data;
    });
  }
  
  clearCart() {
     // Optional: you can add a clear cart function if you want to use the DELETE /cart
  }

  // --- Admin Methods ---
  openAddFashion() {
    this.currentFashion = this.createEmptyFashion();
    this.showEditMode = true;
  }

  editFashion(f: Fashion) {
    this.currentFashion = JSON.parse(JSON.stringify(f));
    this.showEditMode = true;
  }

  deleteFashion(id: string) {
    if (window.confirm('Are you sure you want to delete this Fashion?')) {
      this.fashionService.deleteFashion(id).subscribe(() => {
        this.loadFashions();
      });
    }
  }

  saveFashion() {
    if (this.currentFashion._id) {
      this.fashionService.updateFashion(this.currentFashion._id, this.currentFashion).subscribe(() => {
        this.showEditMode = false;
        this.loadFashions();
      });
    } else {
      const { _id, ...newFashionData } = this.currentFashion;
      this.fashionService.addFashion(newFashionData as any).subscribe(() => {
        this.showEditMode = false;
        this.loadFashions();
      });
    }
  }
  
  cancelEdit() {
    this.showEditMode = false;
  }
}
