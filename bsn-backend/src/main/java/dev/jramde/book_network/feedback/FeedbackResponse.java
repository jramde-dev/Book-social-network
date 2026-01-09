package dev.jramde.book_network.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author : Juldas RAMDE, ramde266@gmail.com.
 * @since : 16/10/2025, 04:39
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse {
    private Double note;
    private String comment;
    private boolean ownFeedback;

}
