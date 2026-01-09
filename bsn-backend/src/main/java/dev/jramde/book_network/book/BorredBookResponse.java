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
public class BorredBookResponse {
    private Integer id;
    private String title;
    private String author;
    private String isbn;
    private double rate;
    private boolean returned;
    private boolean returnApproved;
}
