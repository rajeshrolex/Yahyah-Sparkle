-- Database Schema for Yahyah-Sparkle with Initial Data

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) DEFAULT NULL,
    category_id INT NULL,
    images TEXT NULL, -- JSON array of file paths
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    background_image VARCHAR(255) NULL,
    heading VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    primary_cta_text VARCHAR(50) NULL,
    primary_cta_link VARCHAR(255) NULL,
    secondary_cta_text VARCHAR(50) NULL,
    secondary_cta_link VARCHAR(255) NULL,
    is_enabled TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default admin user (password is bcrypt hashed for "Sandanithin@2026")
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2y$10$X7vfGwTtvuR8zFzB8tFyaeWHqjyEOQgxA4AOVF1FWotTfICcpgDAi', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Seed default categories
INSERT INTO categories (id, name, description)
VALUES 
(1, 'Combo Offers', 'Festival specials and package discounts'),
(2, 'Cleaning Liquids', 'Premium single-bottle cleaning liquids')
ON DUPLICATE KEY UPDATE name=name;

-- Seed default products
INSERT INTO products (id, name, description, price, category_id, images, is_active)
VALUES 
(
    1, 
    'Super Sale Dhamaka Offer (8 Litres)', 
    'Ashadam and Bonalu Festival Offer! Contains 4 Litres of Red and 4 Litres of Blue YahYah Sparkle liquids. Red liquid: Rs.350, Blue liquid: Rs.250.', 
    1400.00, 
    1, 
    '["uploads/eight_litres.png"]', 
    1
),
(
    2, 
    'YahYah Sparkle Red', 
    'Advanced Red Multi Cleaner for deep clean. Specially formulated for white marble, tiles, toilets, and removing hard cement marks.', 
    350.00, 
    2, 
    '["uploads/red_cleaner.jpg"]', 
    1
),
(
    3, 
    'YahYah Sparkle Blue', 
    'Advanced Blue Salt Cleaner for stubborn stains. Ideal for removing hard salt stains from bathroom tiles, buckets, and floors.', 
    250.00, 
    2, 
    '["uploads/blue_cleaner.jpg"]', 
    1
)
ON DUPLICATE KEY UPDATE name=name;

-- Seed default hero content
INSERT INTO hero (id, heading, description, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, is_enabled, background_image)
VALUES (
    1,
    'SUPER SALE DHAMAKA OFFER',
    'Ashadam and Bonalu Festival Offer. Get 8 Litres (4 Red + 4 Blue) of YahYah Sparkle cleaning liquids for just Rs. 1400!',
    'Call: 7671842007',
    'tel:+917671842007',
    'WhatsApp Now',
    'https://wa.me/917671842007?text=Hi,%20I%20am%20interested%20in%20the%20Super%20Sale%20Dhamaka%20Offer.%20Please%20confirm%20my%20booking.',
    1,
    ''
) ON DUPLICATE KEY UPDATE heading=heading;
