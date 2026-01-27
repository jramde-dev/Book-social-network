import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 1;
  message!: string;
  level!: string;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  /**
   * Retrieve all the books available in the database.
   */
  findAllBooks() {
    this.bookService.findAllBooks({page: this.page, size: this.size}).subscribe({
      next: (books: PageResponseBookResponse) => {
        console.table(books.content);
        this.bookResponse = books;
      }
    })
  }

  onGoToTheFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  onGoToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  onGoToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  onGoToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  onGoToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  onBorrowBook(book: BookResponse) {
    this.message = "";
    this.bookService.borrowBook({"book-id": book.id as number}).subscribe({
      next: () => {
        this.level = "success";
        this.message = "Book successfully added to your list."
      },
      error: (err) => {
        console.log(err);
        this.level="error";
        this.message = err.error.businessErrorMessage;
      }
    })
  }
}
