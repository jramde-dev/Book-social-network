import {Component, Input} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  private _book: BookResponse = {};
  private _bookCover: string | undefined;
  private _manager: boolean = false;

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get book(): BookResponse {
    return this._book;
  }

  get manager(): boolean {
    return this._manager;
  }

  @Input()
  set manager(value: boolean) {
    this._manager = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover && !this._bookCover) {
      const bookCover = this._book.cover;
      this._bookCover = 'data:image/jpg;base64,' + bookCover;
    }
    return "https://images.unsplash.com/photo-1768124362942-3e4113f6f73e?q=80&w=784&auto=format" +
      "&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  onShowDetails() {

  }

  onBorrow() {

  }

  onAddToWaitingList() {

  }

  onEdit() {

  }

  onShare() {

  }

  onArchive() {

  }
}
