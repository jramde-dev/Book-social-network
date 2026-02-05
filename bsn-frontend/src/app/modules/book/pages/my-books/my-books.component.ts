import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 2;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooksByOwner();
  }

  /**
   * Retrieve all the books available in the database.
   */
  findAllBooksByOwner() {
    this.bookService.findAllBooksByOwner({page: this.page, size: this.size}).subscribe({
      next: (books: PageResponseBookResponse) => {
        this.bookResponse = books;
      }
    })
  }

  onGoToTheFirstPage() {
    this.page = 0;
    this.findAllBooksByOwner();
  }

  onGoToPreviousPage() {
    this.page--;
    this.findAllBooksByOwner();
  }

  onGoToPage(page: number) {
    this.page = page;
    this.findAllBooksByOwner();
  }

  onGoToNextPage() {
    this.page++;
    this.findAllBooksByOwner();
  }

  onGoToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooksByOwner();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  archiveBook(response: BookResponse) {

  }

  shareBook(response: BookResponse) {

  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }
}
