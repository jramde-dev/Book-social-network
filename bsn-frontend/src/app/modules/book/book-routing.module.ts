import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {ManageBookComponent} from "./pages/manage-book/manage-book.component";
import {BorrowedBooksComponent} from "./pages/borrowed-books/borrowed-books.component";

const routes: Routes = [
  {
    path: "", component: MainComponent,

    // Because we want to display everything inside the main component
    children: [
      {path: "", title: "Books", component: BookListComponent},
      {path: "my-books", title: "My Books", component: MyBooksComponent},
      {path: "manage", title: "Book Management", component: ManageBookComponent},
      {path: "manage/:bookId", title: "Manage Book", component: ManageBookComponent},
      {path: "borrowed-books", title: "Borrowed Books", component: BorrowedBooksComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
