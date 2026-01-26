import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

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

  }

  onGoToPreviousPage() {

  }

  onGoToPage(index: number) {

  }

  onGoToNextPage() {

  }

  onGoToLastPage() {

  }

  get isLastPage() : boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }
}
