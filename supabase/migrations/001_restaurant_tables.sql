-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tagline TEXT,
  description TEXT,
  cuisine VARCHAR(100),
  location TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  hours TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  price_range VARCHAR(10),
  specialties TEXT[], -- Array of specialties
  images TEXT[], -- Array of image URLs
  history TEXT,
  awards TEXT[], -- Array of awards
  fun_facts TEXT[], -- Array of fun facts
  theme JSONB, -- Theme configuration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create published_pages table
CREATE TABLE IF NOT EXISTS published_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  url_slug VARCHAR(255) UNIQUE NOT NULL,
  page_data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_name ON restaurants(name);
CREATE INDEX IF NOT EXISTS idx_published_pages_slug ON published_pages(url_slug);
CREATE INDEX IF NOT EXISTS idx_published_pages_restaurant ON published_pages(restaurant_id);

-- Insert sample restaurant data
INSERT INTO restaurants (
  id,
  name,
  tagline,
  description,
  cuisine,
  location,
  phone,
  email,
  website,
  hours,
  rating,
  review_count,
  price_range,
  specialties,
  images,
  history,
  awards,
  fun_facts,
  theme
) VALUES (
  'sample-restaurant-1',
  'Spice Garden',
  'Authentic Indian Cuisine with Modern Flair',
  'Experience the rich flavors of traditional Indian cuisine reimagined for the modern palate. Our chefs use only the finest spices and freshest ingredients.',
  'Indian',
  '123 Food Street, Gourmet District, Mumbai',
  '+91 98765 43210',
  'hello@spicegarden.com',
  'www.spicegarden.com',
  'Mon-Sun: 11:00 AM - 11:00 PM',
  4.6,
  342,
  '₹₹',
  ARRAY['Butter Chicken', 'Biryani', 'Tandoori Platter', 'Dal Makhani'],
  ARRAY[
    '/placeholder.svg?height=400&width=600&text=Restaurant+Interior',
    '/placeholder.svg?height=400&width=600&text=Signature+Dish',
    '/placeholder.svg?height=400&width=600&text=Chef+Special'
  ],
  'Founded in 2010 by Chef Raj Kumar, Spice Garden began as a small family restaurant with recipes passed down through generations.',
  ARRAY[
    'Best Indian Restaurant 2022 - Food & Travel Magazine',
    'Chef of the Year 2021 - Culinary Association of India'
  ],
  ARRAY[
    'Our spice blend includes 24 different ingredients sourced from across India',
    'Our tandoor oven reaches temperatures of 480°C for the perfect naan',
    'We make over 200 pieces of fresh naan bread every day'
  ],
  '{"primaryColor": "#d97706", "secondaryColor": "#f59e0b", "backgroundColor": "#ffffff", "textColor": "#1f2937"}'::jsonb
) ON CONFLICT (id) DO NOTHING;
