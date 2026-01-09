package dev.jramde.book_network.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String author;
    private String isbn;
    private String synopsis; // book description
    private String owner;
    private byte[] cover;
    private double rate;
    private boolean shareable;
    private boolean archived;
}
