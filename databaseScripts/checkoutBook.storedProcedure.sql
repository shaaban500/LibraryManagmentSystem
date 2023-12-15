CREATE PROCEDURE CheckoutBook (
    IN bookIdParam INT,
    IN borrowerIdParam INT,
    IN checkoutDateParam DATE,
    IN dueDateParam DATE
)
BEGIN
    DECLARE quantityAvailable INT;

    START TRANSACTION;

    -- Retrieve and lock the row for update
    SELECT quantity INTO quantityAvailable FROM books WHERE id = bookIdParam FOR UPDATE;

    -- Check if the book is available
    IF quantityAvailable > 0 THEN
        -- Insert borrowing record
        INSERT INTO borrowings (book_id, borrower_id, checkout_date, due_date)
        VALUES (bookIdParam, borrowerIdParam, checkoutDateParam, dueDateParam);

        -- Decrease book quantity by 1
        UPDATE books SET quantity = quantity - 1 WHERE id = bookIdParam;

        COMMIT;
    ELSE
        -- Rollback if the book is not available
        ROLLBACK;
    END IF;
END 