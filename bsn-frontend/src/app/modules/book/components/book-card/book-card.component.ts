import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  private _book: BookResponse = {};
  private _bookCover: string | undefined;

  // To show if it is the manager or not
  private _manager: boolean = false;

  // In order to communicate event with the parent
  // Output because actions go from child toward the parent.
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  // If there is no cover we display a default image
  get bookCover(): string | undefined {
    if (this._book.cover) {
      const bookCover = this._book.cover;
      return 'data:image/jpg;base64,' + bookCover;
    }
    return "https://images.unsplash.com/photo-1768124362942-3e4113f6f73e?q=80&w=784&auto";
  }

  get manager(): boolean {
    return this._manager;
  }

  @Input()
  set manager(value: boolean) {
    this._manager = value;
  }

  onShowDetails() {
    this.details.emit(this.book);
  }

  onBorrow() {
    this.borrow.emit(this.book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this.book);
  }

  onEdit() {
    this.edit.emit(this.book);
  }

  onShare() {
    this.share.emit(this.book);
  }

  onArchive() {
    this.archive.emit(this.book);
  }
}
