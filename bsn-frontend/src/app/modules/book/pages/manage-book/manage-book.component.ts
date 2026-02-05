import {Component} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent {
  defaultImage: string = "https://images.unsplash.com/photo-1768124362942-3e4113f6f73e?q=80&w=784&auto=format";
  selectedPicture: string | undefined;
  selectedBookCover: any;
  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {author: "", isbn: "", synopsis: "", title: ""};

  constructor(private bookService: BookService, private router: Router) {
  }

  onSelectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedBookCover = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPicture = e.target.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  onSaveBook() {
    this.bookService.createBook({
      body: this.bookRequest
    }).subscribe({
      // book id returned by the backend
      next: (bookId) => {
        if (this.selectedBookCover) {
          this.bookService.uploadCoverPicture({
            bookId: bookId,
            body: {
              file: this.selectedBookCover
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            },
            error: (error) => {
              console.log('Cover upload error:', error);
              this.errorMsg = error.error?.businessValidationErrors || ['Failed to upload cover picture'];
            }
          })
        } else {
          this.router.navigateByUrl('/books/my-books');
        }
      },
      error: (error) => {
        console.log(error);
        this.errorMsg = error.error.businessValidationErrors;
      }
    })
  }
}
