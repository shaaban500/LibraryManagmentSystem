-- 1. return book
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReturnBook`(
    IN bookIdParam INT,
    IN returnDateParam DATE
)
BEGIN
    DECLARE bookCount INT;
    
    -- Check if the book with the specified ID exists and is not returned
    SELECT COUNT(*)
    INTO bookCount
    FROM borrowings
    WHERE book_id = bookId AND is_returned = FALSE;

    IF bookCount > 0 THEN
        -- Begin transaction
        START TRANSACTION;
        
        -- Update borrowings table to set is_returned to true and update return date
        UPDATE borrowings
        SET is_returned = TRUE, return_date = returnDate
        WHERE book_id = bookId AND is_returned = FALSE;

        -- Update book quantity in books table, increase by 1
        UPDATE books
        SET quantity = quantity + 1
        WHERE book_id = bookId;

        -- Commit transaction
        COMMIT;
        
        SELECT 'Book returned successfully' AS message;
    ELSE
        SELECT 'Book not found or already returned' AS message;
    END IF;
END



