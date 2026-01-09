package dev.jramde.book_network.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Long> {

    /**
     * Return all borrowed books.
     * @param pageable : list them
     * @param userId : user for which we want to return borrowed book.
     * @return all the books.
     */
    @Query("""
            SELECT history FROM BookTransactionHistory history
            WHERE history.user.id = :userId
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer userId);

    /**
     * Find all books which were borrowed and are returned.
     * @param pageable : listing in page
     * @param ownerId : the current user
     * @return all books
     */
    @Query("""
            SELECT history FROM BookTransactionHistory history
            WHERE history.book.owner.id = :ownerId
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, Integer ownerId);

    @Query("""
            SELECT (COUNT (*) > 0) AS isBorrowed
            FROM BookTransactionHistory transacHistory
            WHERE transacHistory.user.id = :userId
            AND transacHistory.book.id = :bookId
            AND transacHistory.returnApproved = false
            """)
    boolean isAlreadyBorrowedByUser(@Param("bookId") Integer bookId, @Param("userId") Integer userId);

    @Query("""
            SELECT transacHistory
            FROM BookTransactionHistory transacHistory
            WHERE transacHistory.user.id = :userId
            AND transacHistory.book.id = :bookId
            AND transacHistory.returned = false
            AND transacHistory.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(Integer bookId, Integer userId);

    /**
     * Find a returned book which is not approved yet.
     * @param bookId : returned book to approve
     * @param ownerId : owner of the book
     * @return the book
     */
    @Query("""
            SELECT transacHistory
            FROM BookTransactionHistory transacHistory
            WHERE transacHistory.book.owner.id = :ownerId
            AND transacHistory.book.id = :bookId
            AND transacHistory.returned = true
            AND transacHistory.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Integer bookId, Integer ownerId);
}
