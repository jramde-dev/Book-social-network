import {Component} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent {
  defaultImage: string = "https://images.unsplash.com/photo-1768124362942-3e4113f6f73e?q=80&w=784&auto=format";
  selectedImage: string | undefined;
  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {author: "", isbn: "", synopsis: "", title: ""};

  onSelectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const selectedBook: File = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = e.target.result as string;
      }

      reader.readAsDataURL(selectedBook);
    }
  }
}
