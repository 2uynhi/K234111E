import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BookAPIService } from '../../myservices/book-api.service';
import { Book } from '../../myclasses/Book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css'],
})
export class BookFormComponent {
  book: Partial<Book> = {
    title: '',
    price: 0,
    description: '',
    cover: '',
    author: '',
  };
  isEdit = false;
  id: number | null = null;
  errMessage = '';
  selectedFile: File | null = null;
  previewUrl = '';

  constructor(
    private api: BookAPIService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.api.getById(this.id).subscribe({
        next: (b: Book) => {
          this.book = { ...b };
          if (b.cover) this.previewUrl = this.api.getCoverUrl(b.cover);
        },
        error: (err: Error) => (this.errMessage = err?.message || 'Không tải được sách'),
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.book.cover = '';
    this.previewUrl = '';
  }

  save(): void {
    this.errMessage = '';
    if (this.selectedFile) {
      this.api.uploadCover(this.selectedFile).subscribe({
        next: (res: { filename: string }) => {
          this.book.cover = res.filename;
          this.submit();
        },
        error: (err: Error) => (this.errMessage = err?.message || 'Lỗi tải ảnh'),
      });
    } else {
      this.submit();
    }
  }

  private submit(): void {
    const payload = {
      title: this.book.title,
      price: this.book.price,
      description: this.book.description,
      cover: this.book.cover || '',
      author: this.book.author || '',
      publishDate: this.book.publishDate || new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    if (this.isEdit && this.id != null) {
      this.api.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err: Error) => (this.errMessage = err?.message || 'Lỗi cập nhật'),
      });
    } else {
      this.api.create(payload).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err: Error) => (this.errMessage = err?.message || 'Lỗi thêm sách'),
      });
    }
  }
}
