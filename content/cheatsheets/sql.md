# Complete SQL Cheatsheet: Master Database Queries and Management

<!-- ADSENSE -->
## Introduction: Why Learn SQL?

SQL (Structured Query Language) remains the standard language for relational database management systems. Despite the rise of NoSQL and other alternatives, SQL continues to be an essential skill for developers, data analysts, and IT professionals. This comprehensive cheatsheet provides a structured guide to SQL fundamentals and advanced concepts.

### Why This Cheatsheet Matters:

- **Career Versatility**: SQL skills are required across multiple roles: software development, data analysis, business intelligence, and database administration
- **Data-Driven Decision Making**: Enable extraction of valuable insights from organizational data
- **Efficiency**: Write optimized queries that retrieve exactly what you need with minimal resources
- **Standardization**: Learn a language that works across various database systems with minor syntax adjustments
- **Interview Preparation**: SQL questions appear in technical interviews for a wide range of positions

<!-- ADSENSE -->
## Real-World Use Cases & Benefits

### When to Use SQL:
- **Data Analysis**: Extract, transform, and analyze data for business intelligence
- **Application Development**: Create database backends for web, mobile, and desktop applications
- **Reporting**: Generate automated reports for business operations and metrics
- **Data Integration**: Combine data from multiple sources into data warehouses
- **Transaction Processing**: Manage business transactions with ACID compliance
- **Data Governance**: Implement and enforce data integrity rules and constraints

### Main Benefits:
- **Data Integrity**: Enforce relationships and constraints to ensure data quality
- **Concurrency Control**: Handle multiple simultaneous operations safely
- **Scalability**: Manage databases from megabytes to petabytes in size
- **Security**: Control access with a robust permission system
- **Standardization**: Use a mature, widely-adopted language

<!-- ADSENSE -->
## SQL Database Fundamentals

### Types of SQL Commands

- **DDL (Data Definition Language)**: CREATE, ALTER, DROP, TRUNCATE
- **DML (Data Manipulation Language)**: SELECT, INSERT, UPDATE, DELETE
- **DCL (Data Control Language)**: GRANT, REVOKE
- **TCL (Transaction Control Language)**: COMMIT, ROLLBACK, SAVEPOINT

### Common Database Systems
- **MySQL/MariaDB**: Open-source, widely used for web applications
- **PostgreSQL**: Advanced open-source RDBMS with extensive features
- **Microsoft SQL Server**: Enterprise-ready with strong Windows integration
- **Oracle Database**: Enterprise-grade with extensive features and support
- **SQLite**: Embedded database, popular for mobile and desktop applications

<!-- ADSENSE -->
## Database Design and Schema

### Creating a Database
```sql
-- Create a new database
CREATE DATABASE ecommerce;

-- Use or switch to a database
USE ecommerce;
-- Or in PostgreSQL
\c ecommerce
```

### Creating Tables
```sql
-- Basic table creation
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table with foreign key relationship
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### Data Types
| Category | Common Types | Description |
|----------|--------------|-------------|
| **Numeric** | INT, BIGINT, SMALLINT, TINYINT | Integer values of different sizes |
| | DECIMAL, NUMERIC | Fixed-point numbers with exact precision |
| | FLOAT, DOUBLE | Floating-point numbers with approximate precision |
| **String** | CHAR(n) | Fixed-length character string |
| | VARCHAR(n) | Variable-length character string |
| | TEXT | Long text string |
| **Date/Time** | DATE | Date only (YYYY-MM-DD) |
| | TIME | Time only (HH:MM:SS) |
| | DATETIME, TIMESTAMP | Date and time |
| **Boolean** | BOOLEAN, BOOL | True/false values |
| **Binary** | BLOB, BINARY | Binary data storage |
| **Other** | JSON | JSON document storage (in supported DBMSs) |
| | ENUM | List of possible values |
| | UUID | Universally unique identifier |

### Constraints
```sql
-- Common constraints
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT NOT NULL DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (name),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### Altering Tables
```sql
-- Add a column
ALTER TABLE customers 
ADD COLUMN birth_date DATE;

-- Modify a column
ALTER TABLE customers 
MODIFY COLUMN phone VARCHAR(30);
-- Or in PostgreSQL
ALTER TABLE customers 
ALTER COLUMN phone TYPE VARCHAR(30);

-- Add a constraint
ALTER TABLE products
ADD CONSTRAINT fk_supplier
FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);

-- Drop a column
ALTER TABLE customers
DROP COLUMN birth_date;

-- Rename a table
ALTER TABLE customers
RENAME TO users;
-- Or in PostgreSQL
ALTER TABLE customers
RENAME TO users;
```

### Dropping and Truncating
```sql
-- Drop a table (removes table structure and data)
DROP TABLE IF EXISTS temp_logs;

-- Truncate a table (removes all data but keeps structure)
TRUNCATE TABLE logs;
```

### Indexes
```sql
-- Create an index
CREATE INDEX idx_customers_email
ON customers(email);

-- Create a composite index
CREATE INDEX idx_order_customer
ON orders(customer_id, order_date);

-- Create a unique index
CREATE UNIQUE INDEX idx_products_sku
ON products(sku);

-- Drop an index
DROP INDEX idx_customers_email;
```

<!-- ADSENSE -->
## Basic SQL Queries

### SELECT Statement
```sql
-- Basic select
SELECT * FROM customers;

-- Select specific columns
SELECT customer_id, first_name, last_name, email 
FROM customers;

-- Select with column alias
SELECT 
    first_name AS "First Name",
    last_name AS "Last Name"
FROM customers;

-- Select with expression
SELECT 
    product_name,
    price,
    price * 0.9 AS discounted_price
FROM products;
```

### Filtering with WHERE
```sql
-- Basic conditions
SELECT * FROM products
WHERE price > 100;

-- Multiple conditions
SELECT * FROM orders
WHERE status = 'shipped' AND total_amount > 50;

-- IN operator
SELECT * FROM products
WHERE category_id IN (1, 2, 3);

-- BETWEEN operator
SELECT * FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';

-- NULL checks
SELECT * FROM customers
WHERE phone IS NULL;

-- Pattern matching with LIKE
SELECT * FROM products
WHERE product_name LIKE 'Smart%';  -- Starts with "Smart"
SELECT * FROM products
WHERE product_name LIKE '%Phone%';  -- Contains "Phone"
SELECT * FROM products
WHERE product_name LIKE '_hone';  -- 5 characters ending with "hone"
```

### Sorting with ORDER BY
```sql
-- Ascending order (default)
SELECT * FROM products
ORDER BY price;

-- Descending order
SELECT * FROM products
ORDER BY price DESC;

-- Multiple sort criteria
SELECT * FROM customers
ORDER BY last_name ASC, first_name ASC;

-- Sort by column position
SELECT first_name, last_name FROM customers
ORDER BY 2, 1;  -- Order by last_name, then first_name
```

### Limiting Results
```sql
-- MySQL, SQLite, PostgreSQL
SELECT * FROM products
ORDER BY price DESC
LIMIT 10;

-- With offset (skip first 10, get next 10)
SELECT * FROM products
ORDER BY price DESC
LIMIT 10 OFFSET 10;

-- SQL Server
SELECT TOP 10 * FROM products
ORDER BY price DESC;

-- Oracle
SELECT * FROM products
ORDER BY price DESC
FETCH FIRST 10 ROWS ONLY;
```

<!-- ADSENSE -->
## Data Manipulation

### INSERT Statements
```sql
-- Insert a single row
INSERT INTO customers (customer_id, first_name, last_name, email, phone)
VALUES (101, 'John', 'Doe', 'john.doe@example.com', '555-1234');

-- Insert multiple rows
INSERT INTO products (product_id, name, price, category_id)
VALUES 
    (201, 'Smartphone', 699.99, 1),
    (202, 'Laptop', 1299.99, 1),
    (203, 'Headphones', 149.99, 1);

-- Insert with SELECT
INSERT INTO premium_customers (customer_id, first_name, last_name, email)
SELECT customer_id, first_name, last_name, email
FROM customers
WHERE total_purchases > 1000;
```

### UPDATE Statements
```sql
-- Update all rows in a table
UPDATE products
SET price = price * 1.1;

-- Update with condition
UPDATE customers
SET status = 'Inactive'
WHERE last_login_date < '2023-01-01';

-- Update multiple columns
UPDATE employees
SET 
    salary = salary * 1.05,
    last_review_date = CURRENT_DATE
WHERE department_id = 3;

-- Update with JOIN (MySQL syntax)
UPDATE orders o
JOIN customers c ON o.customer_id = c.customer_id
SET o.status = 'Priority'
WHERE c.membership_level = 'Premium';
```

### DELETE Statements
```sql
-- Delete with condition
DELETE FROM cart_items
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Delete all rows
DELETE FROM temp_logs;

-- Delete with JOIN (MySQL syntax)
DELETE o
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE c.status = 'Banned';
```

<!-- ADSENSE -->
## Joins and Relationships

### Types of Joins
```sql
-- INNER JOIN (returns only matching rows)
SELECT 
    o.order_id,
    c.first_name,
    c.last_name,
    o.order_date,
    o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;

-- LEFT JOIN (returns all rows from the left table)
SELECT 
    p.product_id,
    p.name,
    r.review_text,
    r.rating
FROM products p
LEFT JOIN reviews r ON p.product_id = r.product_id;

-- RIGHT JOIN (returns all rows from the right table)
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- FULL JOIN (returns all rows when there's a match in either table)
SELECT 
    s.student_id,
    s.name,
    c.course_name
FROM students s
FULL JOIN enrollments e ON s.student_id = e.student_id
FULL JOIN courses c ON e.course_id = c.course_id;

-- CROSS JOIN (cartesian product)
SELECT 
    p.name AS product,
    c.name AS color
FROM products p
CROSS JOIN colors c;
```

### Self Joins
```sql
-- Self join (e.g., employee hierarchy)
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

### JOINs with Multiple Tables
```sql
-- Join three or more tables
SELECT 
    o.order_id,
    c.first_name,
    c.last_name,
    p.name AS product_name,
    oi.quantity,
    oi.price AS unit_price
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2023-01-01';
```

<!-- ADSENSE -->
## Aggregate Functions and Grouping

### Common Aggregate Functions
```sql
-- COUNT
SELECT COUNT(*) FROM customers;
SELECT COUNT(DISTINCT country) FROM customers;

-- SUM
SELECT SUM(total_amount) FROM orders
WHERE order_date >= '2023-01-01';

-- AVG
SELECT AVG(price) FROM products
WHERE category_id = 1;

-- MIN and MAX
SELECT 
    MIN(price) AS lowest_price,
    MAX(price) AS highest_price
FROM products;

-- GROUP_CONCAT (MySQL) / STRING_AGG (PostgreSQL & SQL Server)
-- MySQL
SELECT 
    category_id,
    GROUP_CONCAT(name SEPARATOR ', ') AS products
FROM products
GROUP BY category_id;

-- PostgreSQL
SELECT 
    category_id,
    STRING_AGG(name, ', ') AS products
FROM products
GROUP BY category_id;
```

### GROUP BY Clause
```sql
-- Basic grouping
SELECT 
    category_id,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY category_id;

-- Group by multiple columns
SELECT 
    country,
    city,
    COUNT(*) AS customer_count
FROM customers
GROUP BY country, city
ORDER BY country, customer_count DESC;

-- With JOIN
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count,
    AVG(p.price) AS avg_price,
    MIN(p.price) AS min_price,
    MAX(p.price) AS max_price,
    SUM(p.stock) AS total_stock
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_id, c.category_name;
```

### HAVING Clause
```sql
-- Filter grouped results
SELECT 
    category_id,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY category_id
HAVING COUNT(*) > 5 AND AVG(price) > 100;

-- With JOIN
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM products p
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_id, c.category_name
HAVING COUNT(p.product_id) > 10
ORDER BY product_count DESC;
```

<!-- ADSENSE -->
## Subqueries and CTEs

### Subqueries
```sql
-- Subquery in WHERE clause
SELECT product_id, name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Subquery with IN
SELECT customer_id, first_name, last_name
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE total_amount > 1000
);

-- Subquery in SELECT
SELECT 
    category_id,
    name,
    price,
    (SELECT AVG(price) FROM products p2 WHERE p2.category_id = p1.category_id) AS category_avg
FROM products p1;

-- Subquery in FROM
SELECT category_id, avg_price
FROM (
    SELECT 
        category_id,
        AVG(price) AS avg_price
    FROM products
    GROUP BY category_id
) AS category_stats
WHERE avg_price > 100;

-- Correlated subquery
SELECT 
    p.product_id,
    p.name,
    p.price,
    (
        SELECT COUNT(*)
        FROM order_items oi
        WHERE oi.product_id = p.product_id
    ) AS times_ordered
FROM products p;
```

### Common Table Expressions (CTEs)
```sql
-- Basic CTE
WITH customer_orders AS (
    SELECT 
        customer_id,
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.first_name,
    c.last_name,
    co.order_count,
    co.total_spent
FROM customers c
JOIN customer_orders co ON c.customer_id = co.customer_id
WHERE co.total_spent > 1000;

-- Multiple CTEs
WITH 
monthly_sales AS (
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') AS month,
        SUM(total_amount) AS monthly_total
    FROM orders
    WHERE order_date >= '2023-01-01'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),
average_sales AS (
    SELECT AVG(monthly_total) AS avg_monthly_sales
    FROM monthly_sales
)
SELECT 
    ms.month,
    ms.monthly_total,
    a.avg_monthly_sales,
    ms.monthly_total - a.avg_monthly_sales AS difference
FROM monthly_sales ms, average_sales a
ORDER BY ms.month;

-- Recursive CTE
-- PostgreSQL/SQL Server example for hierarchy
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level employees (no manager)
    SELECT 
        employee_id,
        first_name,
        last_name,
        manager_id,
        1 AS level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT 
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT 
    employee_id,
    first_name,
    last_name,
    level,
    REPEAT('  ', level - 1) || first_name || ' ' || last_name AS hierarchy
FROM employee_hierarchy
ORDER BY level, first_name;
```

<!-- ADSENSE -->
## Advanced SQL Features

### Window Functions
```sql
-- ROW_NUMBER()
SELECT 
    product_id,
    category_id,
    name,
    price,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS price_rank
FROM products;

-- RANK() and DENSE_RANK()
SELECT 
    product_id,
    category_id,
    name,
    price,
    RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS price_rank,
    DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS dense_price_rank
FROM products;

-- Running totals
SELECT 
    order_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Moving averages
SELECT 
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3_days
FROM orders;

-- Percentiles
SELECT 
    product_id,
    category_id,
    name,
    price,
    NTILE(4) OVER (PARTITION BY category_id ORDER BY price) AS price_quartile
FROM products;

-- LAG and LEAD
SELECT 
    order_id,
    order_date,
    total_amount,
    LAG(total_amount) OVER (ORDER BY order_date) AS prev_order_amount,
    LEAD(total_amount) OVER (ORDER BY order_date) AS next_order_amount
FROM orders;
```

### Conditional Logic
```sql
-- CASE expression
SELECT 
    product_id,
    name,
    price,
    CASE 
        WHEN price < 50 THEN 'Budget'
        WHEN price BETWEEN 50 AND 200 THEN 'Mid-Range'
        ELSE 'Premium'
    END AS price_category
FROM products;

-- CASE with aggregate functions
SELECT 
    CASE 
        WHEN price < 50 THEN 'Budget'
        WHEN price BETWEEN 50 AND 200 THEN 'Mid-Range'
        ELSE 'Premium'
    END AS price_category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY price_category;

-- COALESCE (returns first non-NULL value)
SELECT 
    product_id,
    name,
    COALESCE(description, 'No description available') AS description,
    price
FROM products;

-- NULLIF (returns NULL if the two expressions are equal)
SELECT 
    product_id,
    current_stock,
    previous_stock,
    NULLIF(current_stock, previous_stock) AS stock_changed
FROM inventory;

-- IF/IIF function (MySQL/SQL Server)
-- MySQL
SELECT 
    product_id,
    name,
    price,
    IF(stock > 0, 'In Stock', 'Out of Stock') AS stock_status
FROM products;

-- SQL Server
SELECT 
    product_id,
    name,
    price,
    IIF(stock > 0, 'In Stock', 'Out of Stock') AS stock_status
FROM products;
```

### String Functions
```sql
-- String concatenation
-- MySQL
SELECT 
    CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;

-- SQL Server/PostgreSQL
SELECT 
    first_name || ' ' || last_name AS full_name
FROM customers;

-- Substring
SELECT 
    product_id,
    name,
    SUBSTRING(description, 1, 100) AS short_description
FROM products;

-- Upper and lower case
SELECT 
    UPPER(first_name) AS first_name_upper,
    LOWER(email) AS email_lower
FROM customers;

-- Replace
SELECT 
    product_id,
    REPLACE(name, 'Smartphone', 'Mobile Phone') AS updated_name
FROM products;

-- Length
SELECT 
    product_id,
    name,
    LENGTH(description) AS description_length
FROM products;

-- Trim
SELECT 
    TRIM(' Hello World ') AS trimmed_string;
```

### Date and Time Functions
```sql
-- Current date and time
SELECT 
    CURRENT_DATE AS today,
    CURRENT_TIME AS now,
    CURRENT_TIMESTAMP AS timestamp;

-- Extract components
-- MySQL
SELECT 
    order_id,
    order_date,
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    DAY(order_date) AS day,
    DAYNAME(order_date) AS day_name
FROM orders;

-- PostgreSQL
SELECT 
    order_id,
    order_date,
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    EXTRACT(DAY FROM order_date) AS day,
    TO_CHAR(order_date, 'Day') AS day_name
FROM orders;

-- Date arithmetic
-- MySQL
SELECT 
    order_id,
    order_date,
    DATE_ADD(order_date, INTERVAL 7 DAY) AS expected_delivery,
    DATEDIFF(CURRENT_DATE, order_date) AS days_since_order
FROM orders;

-- PostgreSQL
SELECT 
    order_id,
    order_date,
    order_date + INTERVAL '7 days' AS expected_delivery,
    CURRENT_DATE - order_date AS days_since_order
FROM orders;

-- Formatting dates
-- MySQL
SELECT 
    order_id,
    DATE_FORMAT(order_date, '%m/%d/%Y') AS formatted_date
FROM orders;

-- PostgreSQL
SELECT 
    order_id,
    TO_CHAR(order_date, 'MM/DD/YYYY') AS formatted_date
FROM orders;
```

### Transactions
```sql
-- Start a transaction
BEGIN;
-- or
START TRANSACTION;

-- Execute operations
INSERT INTO orders (order_id, customer_id, order_date, total_amount)
VALUES (10001, 101, CURRENT_TIMESTAMP, 299.99);

INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES 
    (10001, 201, 1, 199.99),
    (10001, 202, 2, 49.99);

UPDATE products
SET stock = stock - 1
WHERE product_id = 201;

UPDATE products
SET stock = stock - 2
WHERE product_id = 202;

-- Commit the transaction
COMMIT;

-- Or rollback in case of error
ROLLBACK;

-- Savepoints
BEGIN;

INSERT INTO orders (order_id, customer_id, order_date, total_amount)
VALUES (10001, 101, CURRENT_TIMESTAMP, 299.99);

SAVEPOINT after_order;

INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES 
    (10001, 201, 1, 199.99),
    (10001, 202, 2, 49.99);

-- If there's an issue with order items
ROLLBACK TO after_order;

-- Continue with different order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (10001, 203, 1, 299.99);

COMMIT;
```

### Views
```sql
-- Create a simple view
CREATE VIEW customer_summary AS
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email;

-- Query from a view
SELECT * FROM customer_summary
WHERE total_spent > 1000;

-- Updatable view (simple view that can be updated)
CREATE VIEW active_products AS
SELECT 
    product_id,
    name,
    description,
    price,
    stock
FROM products
WHERE status = 'Active';

-- Update through a view
UPDATE active_products
SET price = price * 1.1
WHERE stock < 10;

-- Create a materialized view (PostgreSQL)
CREATE MATERIALIZED VIEW sales_by_month AS
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(total_amount) AS total_sales,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

-- Refresh a materialized view
REFRESH MATERIALIZED VIEW sales_by_month;
```

### Stored Procedures
```sql
-- MySQL
DELIMITER //
CREATE PROCEDURE update_product_price(
    IN p_product_id INT,
    IN p_new_price DECIMAL(10, 2)
)
BEGIN
    UPDATE products
    SET price = p_new_price
    WHERE product_id = p_product_id;
    
    SELECT 'Price updated successfully' AS message;
END //
DELIMITER ;

-- Call a procedure
CALL update_product_price(201, 249.99);

-- Procedure with business logic
DELIMITER //
CREATE PROCEDURE process_order(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    OUT p_order_id INT
)
BEGIN
    DECLARE v_price DECIMAL(10, 2);
    DECLARE v_stock INT;
    DECLARE v_total DECIMAL(10, 2);
    
    -- Get product details
    SELECT price, stock INTO v_price, v_stock 
    FROM products 
    WHERE product_id = p_product_id;
    
    -- Check if enough stock
    IF v_stock >= p_quantity THEN
        -- Calculate total
        SET v_total = v_price * p_quantity;
        
        -- Create order
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (p_customer_id, CURRENT_TIMESTAMP, v_total, 'Processing');
        
        -- Get the new order ID
        SET p_order_id = LAST_INSERT_ID();
        
        -- Add order items
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (p_order_id, p_product_id, p_quantity, v_price);
        
        -- Update stock
        UPDATE products
        SET stock = stock - p_quantity
        WHERE product_id = p_product_id;
        
        SELECT 'Order processed successfully' AS message;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
END //
DELIMITER ;

-- Using the procedure with output parameter
CALL process_order(101, 201, 2, @new_order_id);
SELECT @new_order_id AS order_id;
```

### Triggers
```sql
-- MySQL
DELIMITER //
CREATE TRIGGER before_product_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    -- Log changes to the price
    IF NEW.price <> OLD.price THEN
        INSERT INTO price_change_log (
            product_id,
            old_price,
            new_price,
            change_date
        )
        VALUES (
            OLD.product_id,
            OLD.price,
            NEW.price,
            CURRENT_TIMESTAMP
        );
    END IF;
    
    -- Set the updated_at timestamp
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- Trigger for inventory management
DELIMITER //
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Update product stock
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE product_id = NEW.product_id;
    
    -- Check if stock is low
    DECLARE v_stock INT;
    SELECT stock INTO v_stock
    FROM products
    WHERE product_id = NEW.product_id;
    
    IF v_stock < 5 THEN
        INSERT INTO stock_alerts (product_id, current_stock, alert_date)
        VALUES (NEW.product_id, v_stock, CURRENT_TIMESTAMP);
    END IF;
END //
DELIMITER ;
```

<!-- ADSENSE -->
## Performance and Optimization

### Indexing Strategies
```sql
-- Basic indexes (review)
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_date ON orders(order_date);

-- Composite indexes
CREATE INDEX idx_customers_name ON customers(last_name, first_name);

-- Covering indexes
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date, status);

-- Function-based indexes (PostgreSQL/Oracle)
CREATE INDEX idx_products_name_lower ON products(LOWER(name));

-- Partial indexes (PostgreSQL)
CREATE INDEX idx_orders_recent ON orders(order_date)
WHERE order_date > CURRENT_DATE - INTERVAL '90 days';

-- Include columns (SQL Server/PostgreSQL)
-- SQL Server
CREATE INDEX idx_orders_customer 
ON orders(customer_id)
INCLUDE (order_date, status);

-- PostgreSQL
CREATE INDEX idx_orders_customer 
ON orders(customer_id)
INCLUDE (order_date, status);
```

### Query Optimization
```sql
-- Using EXPLAIN to analyze query performance
EXPLAIN SELECT * FROM orders
WHERE customer_id = 101
ORDER BY order_date DESC;

-- Using EXPLAIN ANALYZE for detailed performance data (PostgreSQL)
EXPLAIN ANALYZE SELECT * FROM orders
WHERE customer_id = 101
ORDER BY order_date DESC;

-- Avoid SELECT *
-- Instead of:
SELECT * FROM products
WHERE category_id = 1;

-- Use:
SELECT product_id, name, price, stock
FROM products
WHERE category_id = 1;

-- Optimize JOINs order
-- Less efficient (if categories is large and few products match the condition):
SELECT p.product_id, p.name, c.category_name
FROM categories c
JOIN products p ON c.category_id = p.category_id
WHERE p.price > 100;

-- More efficient:
SELECT p.product_id, p.name, c.category_name
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.price > 100;

-- Use EXISTS instead of IN for better performance with subqueries
-- Less efficient:
SELECT *
FROM customers
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
    WHERE total_amount > 1000
);

-- More efficient:
SELECT *
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
    AND o.total_amount > 1000
);

-- Avoid functions on indexed columns
-- Less efficient:
SELECT *
FROM products
WHERE YEAR(created_at) = 2023;

-- More efficient:
SELECT *
FROM products
WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';
```

### Common Table Expressions vs. Temporary Tables
```sql
-- Using a CTE
WITH high_value_orders AS (
    SELECT 
        customer_id, 
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_spent
    FROM orders
    WHERE total_amount > 1000
    GROUP BY customer_id
)
SELECT 
    c.first_name,
    c.last_name,
    hvo.order_count,
    hvo.total_spent
FROM customers c
JOIN high_value_orders hvo ON c.customer_id = hvo.customer_id;

-- Using a temporary table
CREATE TEMPORARY TABLE high_value_orders AS
SELECT 
    customer_id, 
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_spent
FROM orders
WHERE total_amount > 1000
GROUP BY customer_id;

CREATE INDEX idx_hvo_customer ON high_value_orders(customer_id);

SELECT 
    c.first_name,
    c.last_name,
    hvo.order_count,
    hvo.total_spent
FROM customers c
JOIN high_value_orders hvo ON c.customer_id = hvo.customer_id;

DROP TEMPORARY TABLE high_value_orders;
```

### Partitioning
```sql
-- Table partitioning by date (PostgreSQL example)
CREATE TABLE orders (
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL
) PARTITION BY RANGE (order_date);

-- Create partitions
CREATE TABLE orders_2022 PARTITION OF orders
FOR VALUES FROM ('2022-01-01') TO ('2023-01-01');

CREATE TABLE orders_2023 PARTITION OF orders
FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Insert data normally
INSERT INTO orders (order_id, customer_id, order_date, total_amount, status)
VALUES (10001, 101, '2023-06-15', 299.99, 'Completed');

-- Query data (automatically uses correct partition)
SELECT * FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
```

<!-- ADSENSE -->
## Database Administration

### User Management
```sql
-- Create user
-- MySQL
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';

-- PostgreSQL
CREATE USER app_user WITH PASSWORD 'password';

-- Grant privileges
-- MySQL
GRANT SELECT, INSERT, UPDATE, DELETE ON ecommerce.* TO 'app_user'@'localhost';

-- PostgreSQL
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- Grant admin privileges
-- MySQL
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;

-- PostgreSQL
ALTER USER admin WITH SUPERUSER;

-- Revoke privileges
-- MySQL
REVOKE DELETE ON ecommerce.customers FROM 'app_user'@'localhost';

-- PostgreSQL
REVOKE DELETE ON customers FROM app_user;

-- View user privileges
-- MySQL
SHOW GRANTS FOR 'app_user'@'localhost';

-- PostgreSQL
SELECT * FROM information_schema.role_table_grants WHERE grantee = 'app_user';

-- Change password
-- MySQL
ALTER USER 'app_user'@'localhost' IDENTIFIED BY 'new_password';

-- PostgreSQL
ALTER USER app_user WITH PASSWORD 'new_password';

-- Delete user
-- MySQL
DROP USER 'app_user'@'localhost';

-- PostgreSQL
DROP USER app_user;
```

### Backup and Restore
```sql
-- MySQL backup (using command line)
mysqldump -u username -p --databases ecommerce > ecommerce_backup.sql

-- MySQL restore
mysql -u username -p ecommerce < ecommerce_backup.sql

-- PostgreSQL backup
pg_dump -U username -d ecommerce -f ecommerce_backup.sql

-- PostgreSQL restore
psql -U username -d ecommerce -f ecommerce_backup.sql

-- Backup specific tables
-- MySQL
mysqldump -u username -p ecommerce customers orders > customers_orders_backup.sql

-- PostgreSQL
pg_dump -U username -d ecommerce -t customers -t orders -f customers_orders_backup.sql
```

### Monitoring and Troubleshooting
```sql
-- MySQL: Show active connections
SHOW PROCESSLIST;

-- MySQL: Kill a session
KILL CONNECTION 123;

-- PostgreSQL: Show active connections
SELECT * FROM pg_stat_activity;

-- PostgreSQL: Terminate a session
SELECT pg_terminate_backend(pid);

-- Check table sizes
-- MySQL
SELECT 
    table_name, 
    table_rows,
    data_length + index_length AS total_size,
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS total_size_mb
FROM information_schema.TABLES
WHERE table_schema = 'ecommerce'
ORDER BY total_size DESC;

-- PostgreSQL
SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Find slow queries
-- MySQL (requires slow query log to be enabled)
SHOW VARIABLES LIKE 'slow_query%';
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;  -- Log queries taking more than 2 seconds

-- PostgreSQL (using pg_stat_statements extension)
CREATE EXTENSION pg_stat_statements;

SELECT 
    query,
    calls,
    total_time,
    total_time / calls AS avg_time,
    rows / calls AS avg_rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

<!-- ADSENSE -->
## Database Security

### SQL Injection Prevention
```sql
-- Vulnerable code (DO NOT USE)
"SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

-- Secure approach using parameterized queries
-- In a programming language (e.g., Node.js with MySQL)
connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    function(error, results, fields) {
        // Handle results
    }
);

-- Using stored procedures (MySQL)
DELIMITER //
CREATE PROCEDURE authenticate_user(IN p_username VARCHAR(50), IN p_password VARCHAR(100))
BEGIN
    SELECT * FROM users
    WHERE username = p_username AND password_hash = p_password;
END //
DELIMITER ;

-- Call securely
CALL authenticate_user('john_doe', 'hashed_password');
```

### Data Encryption
```sql
-- MySQL: Encrypt sensitive data
-- Create a column for encrypted data
ALTER TABLE customers
ADD COLUMN credit_card_encrypted VARBINARY(255);

-- Insert encrypted data
INSERT INTO customers (first_name, last_name, credit_card_encrypted)
VALUES ('John', 'Doe', AES_ENCRYPT('1234-5678-9012-3456', 'encryption_key'));

-- Retrieve and decrypt
SELECT 
    first_name,
    last_name,
    AES_DECRYPT(credit_card_encrypted, 'encryption_key') AS credit_card
FROM customers;

-- PostgreSQL: Using pgcrypto extension
CREATE EXTENSION pgcrypto;

-- Encrypt data
INSERT INTO customers (first_name, last_name, credit_card_encrypted)
VALUES ('John', 'Doe', pgp_sym_encrypt('1234-5678-9012-3456', 'encryption_key'));

-- Decrypt data
SELECT 
    first_name,
    last_name,
    pgp_sym_decrypt(credit_card_encrypted, 'encryption_key') AS credit_card
FROM customers;
```

### Role-Based Access Control
```sql
-- PostgreSQL: Create roles
CREATE ROLE sales_staff;
CREATE ROLE reports_viewer;
CREATE ROLE data_admin;

-- Grant permissions to roles
GRANT SELECT ON orders, customers TO sales_staff;
GRANT INSERT, UPDATE ON orders TO sales_staff;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO reports_viewer;

GRANT ALL PRIVILEGES ON DATABASE ecommerce TO data_admin;

-- Assign users to roles
CREATE USER alice WITH PASSWORD 'password';
CREATE USER bob WITH PASSWORD 'password';
CREATE USER charlie WITH PASSWORD 'password';

GRANT sales_staff TO alice;
GRANT reports_viewer TO bob;
GRANT data_admin TO charlie;

-- Row-level security (PostgreSQL)
-- Enable RLS on a table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY sales_region_policy ON orders
    USING (region_id IN (
        SELECT region_id FROM employee_regions
        WHERE employee_id = current_user_id()
    ));
```

<!-- ADSENSE -->
## Advanced SQL Patterns

### Hierarchical Data Queries
```sql
-- Recursive CTE for hierarchical data (PostgreSQL, SQL Server, Oracle)
WITH RECURSIVE category_tree AS (
    -- Base case: top-level categories (no parent)
    SELECT 
        category_id,
        name,
        parent_id,
        0 AS level,
        name AS path
    FROM categories
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: subcategories
    SELECT 
        c.category_id,
        c.name,
        c.parent_id,
        ct.level + 1,
        ct.path || ' > ' || c.name
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.category_id
)
SELECT 
    category_id,
    name,
    level,
    path
FROM category_tree
ORDER BY path;

-- Finding all descendants of a category
WITH RECURSIVE subcategories AS (
    -- Base case: starting category
    SELECT 
        category_id,
        name,
        parent_id
    FROM categories
    WHERE category_id = 10
    
    UNION ALL
    
    -- Recursive case: all children
    SELECT 
        c.category_id,
        c.name,
        c.parent_id
    FROM categories c
    JOIN subcategories sc ON c.parent_id = sc.category_id
)
SELECT * FROM subcategories;

-- Finding all ancestors of a category
WITH RECURSIVE ancestors AS (
    -- Base case: starting category
    SELECT 
        category_id,
        name,
        parent_id
    FROM categories
    WHERE category_id = 15
    
    UNION ALL
    
    -- Recursive case: all parents
    SELECT 
        c.category_id,
        c.name,
        c.parent_id
    FROM categories c
    JOIN ancestors a ON c.category_id = a.parent_id
)
SELECT * FROM ancestors
WHERE category_id != 15;  -- Exclude the starting category
```

### Pivot and Unpivot
```sql
-- PIVOT in SQL Server
SELECT 
    product_id,
    [Q1] AS Q1_2023,
    [Q2] AS Q2_2023,
    [Q3] AS Q3_2023,
    [Q4] AS Q4_2023
FROM (
    SELECT 
        product_id,
        'Q' + CAST(DATEPART(QUARTER, order_date) AS VARCHAR) AS quarter,
        quantity
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE YEAR(order_date) = 2023
) AS source
PIVOT (
    SUM(quantity)
    FOR quarter IN ([Q1], [Q2], [Q3], [Q4])
) AS pivoted;

-- Pivot in MySQL (using conditional aggregation)
SELECT 
    product_id,
    SUM(CASE WHEN QUARTER(order_date) = 1 THEN quantity ELSE 0 END) AS Q1_2023,
    SUM(CASE WHEN QUARTER(order_date) = 2 THEN quantity ELSE 0 END) AS Q2_2023,
    SUM(CASE WHEN QUARTER(order_date) = 3 THEN quantity ELSE 0 END) AS Q3_2023,
    SUM(CASE WHEN QUARTER(order_date) = 4 THEN quantity ELSE 0 END) AS Q4_2023
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE YEAR(order_date) = 2023
GROUP BY product_id;

-- UNPIVOT in SQL Server
SELECT 
    product_id,
    quarter,
    sales
FROM (
    SELECT 
        product_id,
        Q1_2023,
        Q2_2023,
        Q3_2023,
        Q4_2023
    FROM quarterly_sales
) p
UNPIVOT (
    sales
    FOR quarter IN (Q1_2023, Q2_2023, Q3_2023, Q4_2023)
) AS unpivoted;

-- Unpivot in MySQL
SELECT 
    product_id,
    'Q1_2023' AS quarter,
    Q1_2023 AS sales
FROM quarterly_sales
UNION ALL
SELECT 
    product_id,
    'Q2_2023' AS quarter,
    Q2_2023 AS sales
FROM quarterly_sales
UNION ALL
SELECT 
    product_id,
    'Q3_2023' AS quarter,
    Q3_2023 AS sales
FROM quarterly_sales
UNION ALL
SELECT 
    product_id,
    'Q4_2023' AS quarter,
    Q4_2023 AS sales
FROM quarterly_sales;
```

### Analytical Queries
```sql
-- Year-over-year comparison
SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    SUM(total_amount) AS monthly_sales,
    LAG(SUM(total_amount)) OVER (
        PARTITION BY EXTRACT(MONTH FROM order_date)
        ORDER BY EXTRACT(YEAR FROM order_date)
    ) AS prev_year_sales,
    SUM(total_amount) - LAG(SUM(total_amount)) OVER (
        PARTITION BY EXTRACT(MONTH FROM order_date)
        ORDER BY EXTRACT(YEAR FROM order_date)
    ) AS yoy_difference,
    ROUND(
        (SUM(total_amount) - LAG(SUM(total_amount)) OVER (
            PARTITION BY EXTRACT(MONTH FROM order_date)
            ORDER BY EXTRACT(YEAR FROM order_date)
        )) / NULLIF(LAG(SUM(total_amount)) OVER (
            PARTITION BY EXTRACT(MONTH FROM order_date)
            ORDER BY EXTRACT(YEAR FROM order_date)
        ), 0) * 100,
        2
    ) AS yoy_percent_change
FROM orders
GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date)
ORDER BY year, month;

-- Cumulative distribution
SELECT 
    product_id,
    category_id,
    price,
    PERCENT_RANK() OVER (PARTITION BY category_id ORDER BY price) AS price_percent_rank,
    CUME_DIST() OVER (PARTITION BY category_id ORDER BY price) AS price_cumulative_dist
FROM products;

-- Moving averages and totals
SELECT 
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7_days,
    SUM(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_total
FROM orders;

-- Pareto analysis (80/20 rule)
WITH product_sales AS (
    SELECT 
        p.product_id,
        p.name,
        SUM(oi.quantity * oi.price) AS total_sales
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    GROUP BY p.product_id, p.name
),
ranked_sales AS (
    SELECT 
        product_id,
        name,
        total_sales,
        SUM(total_sales) OVER () AS grand_total,
        SUM(total_sales) OVER (ORDER BY total_sales DESC) AS running_total,
        ROW_NUMBER() OVER (ORDER BY total_sales DESC) AS sales_rank
    FROM product_sales
)
SELECT 
    product_id,
    name,
    total_sales,
    ROUND(total_sales / grand_total * 100, 2) AS percent_of_total,
    ROUND(running_total / grand_total * 100, 2) AS cumulative_percent,
    sales_rank
FROM ranked_sales
ORDER BY sales_rank;
```

### Temporal Data Queries
```sql
-- MySQL 8+ Temporal Tables
-- Create table with system versioning
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    valid_from DATETIME(6) GENERATED ALWAYS AS ROW START,
    valid_to DATETIME(6) GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (valid_from, valid_to)
) WITH SYSTEM VERSIONING;

-- Query current data
SELECT * FROM products;

-- Query historical data
SELECT * FROM products FOR SYSTEM_TIME ALL
WHERE product_id = 101
ORDER BY valid_from;

-- Query data as of a specific point in time
SELECT * FROM products FOR SYSTEM_TIME AS OF '2023-01-15 12:00:00';

-- SQL Server Temporal Tables
-- Create table with system versioning
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    valid_from DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL,
    valid_to DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
    PERIOD FOR SYSTEM_TIME (valid_from, valid_to)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.products_history));

-- Query current data
SELECT * FROM products;

-- Query historical data
SELECT * FROM products FOR SYSTEM_TIME ALL
WHERE product_id = 101
ORDER BY valid_from;

-- Query data as of a specific point in time
SELECT * FROM products FOR SYSTEM_TIME AS OF '2023-01-15 12:00:00';

-- Query data between two timestamps
SELECT * FROM products 
FOR SYSTEM_TIME BETWEEN '2023-01-01' AND '2023-02-01'
WHERE product_id = 101;
```

<!-- ADSENSE -->
## Interview Preparation Tips

### Common SQL Interview Questions

1. **"What is the difference between INNER JOIN and LEFT JOIN?"**
   - INNER JOIN returns only matching rows from both tables
   - LEFT JOIN returns all rows from the left table and matching rows from the right table
   
2. **"What is normalization and why is it important?"**
   - Process of organizing data to minimize redundancy
   - Divided into normal forms (1NF, 2NF, 3NF, etc.)
   - Benefits: reduces data duplication, improves data integrity, simplifies queries

3. **"Explain the difference between GROUP BY and HAVING"**
   - GROUP BY groups rows with similar values in specified columns
   - HAVING filters the groups based on a condition
   - WHERE filters rows before grouping, HAVING filters after grouping

4. **"How would you find duplicate records in a table?"**
   ```sql
   SELECT email, COUNT(*)
   FROM customers
   GROUP BY email
   HAVING COUNT(*) > 1;
   ```

5. **"What is a subquery and when would you use it?"**
   - Query nested inside another query
   - Used for: complex filtering, calculated fields, performing operations requiring multiple steps

6. **"How can you optimize a slow running query?"**
   - Analyze with EXPLAIN
   - Add appropriate indexes
   - Limit the number of rows/columns returned
   - Rewrite to avoid functions on indexed columns
   - Consider denormalization for read-heavy workloads

7. **"What's the difference between DELETE, TRUNCATE, and DROP commands?"**
   - DELETE removes rows based on a condition, can be rolled back, triggers fire
   - TRUNCATE removes all rows quickly, can't be easily rolled back, resets auto-increment
   - DROP removes the entire table structure and data, can't be rolled back

8. **"Explain the concept of indexing and its benefits"**
   - Data structure that improves query performance
   - Trade-off between faster reads and slower writes
   - Types: B-tree, hash, bitmap, etc.
   - Benefits: faster data retrieval, improved sorting/grouping, enforcement of uniqueness

### Code Examples to Practice

1. **Find the second highest salary**
```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Alternative using window functions
SELECT salary
FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM employees
) ranked
WHERE rank = 2;
```

2. **Calculate running totals**
```sql
-- Using window functions
SELECT 
    order_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Without window functions
SELECT 
    o1.order_id,
    o1.order_date,
    o1.total_amount,
    SUM(o2.total_amount) AS running_total
FROM orders o1
JOIN orders o2 ON o2.order_date <= o1.order_date
GROUP BY o1.order_id, o1.order_date, o1.total_amount
ORDER BY o1.order_date;
```

3. **Find customers who placed orders in consecutive months**
```sql
WITH monthly_orders AS (
    SELECT 
        customer_id,
        DATE_FORMAT(order_date, '%Y-%m') AS order_month
    FROM orders
    GROUP BY customer_id, DATE_FORMAT(order_date, '%Y-%m')
),
customer_months AS (
    SELECT 
        customer_id,
        order_month,
        LAG(order_month) OVER (PARTITION BY customer_id ORDER BY order_month) AS prev_month
    FROM monthly_orders
)
SELECT DISTINCT c.customer_id, c.first_name, c.last_name
FROM customer_months cm
JOIN customers c ON cm.customer_id = c.customer_id
WHERE PERIOD_DIFF(
    REPLACE(cm.order_month, '-', ''),
    REPLACE(cm.prev_month, '-', '')
) = 1;
```

<!-- ADSENSE -->
## Resources for Further Learning

- **Documentation**:
  - [MySQL Documentation](https://dev.mysql.com/doc/)
  - [PostgreSQL Documentation](https://www.postgresql.org/docs/)
  - [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)
  - [SQLite Documentation](https://www.sqlite.org/docs.html)
  
- **Interactive Learning**:
  - [SQLZoo](https://sqlzoo.net/)
  - [SQL Fiddle](http://sqlfiddle.com/)
  - [LeetCode SQL Problems](https://leetcode.com/problemset/database/)
  - [HackerRank SQL Challenges](https://www.hackerrank.com/domains/sql)
  
- **Books**:
  - "SQL Cookbook" by Anthony Molinaro
  - "SQL Performance Explained" by Markus Winand
  - "SQL Antipatterns" by Bill Karwin
  
- **Advanced Topics**:
  - Query optimization techniques
  - Database design patterns
  - SQL in data warehousing (dimensional modeling)
  - Advanced indexing strategies
  - Partitioning strategies

---

*This cheatsheet is designed to support both learning and reference. Keep it handy during development and interviews to quickly access SQL concepts and patterns. For specific database systems, always refer to the official documentation for syntax variations.*