import {Component, OnInit} from '@angular/core';
import {PageResponseBorredBookResponse} from "../../../../services/models/page-response-borred-book-response";
import {BorredBookResponse} from "../../../../services/models/borred-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.scss']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: PageResponseBorredBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: "", note: 0}
  page: number = 0;
  size: number = 5;
  selectedBook: BorredBookResponse | undefined = undefined;

  constructor(private bookService: BookService, private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({page: this.page, size: this.size}).subscribe({
      next: (borrowedBooks: PageResponseBorredBookResponse) => {
        this.borrowedBooks = borrowedBooks;
      }
    })
  }

  onReturnBorrowedBook(book: BorredBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
    console.log("Borrowed book id is : ", this.feedbackRequest.bookId)
  }

  onReturnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      "book-id": this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
        // We'll come later
      }
    });
  }

  onGoToTheFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  onGoToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  onGoToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  onGoToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  onGoToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }
}
