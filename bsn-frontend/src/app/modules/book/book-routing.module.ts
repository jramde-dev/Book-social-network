import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";

const routes: Routes = [
  {
    path: "", component: MainComponent,

    // Because we want to display everything inside the main component
    children: [
      {path: "", title: "Books", component: BookListComponent},
      {path: "my-books", title: "My Books", component: MyBooksComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
