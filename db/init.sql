-- Neon database initialization
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO todos (title, description, is_completed) VALUES
  ('Learn Neon', 'Explore serverless Postgres', false),
  ('Build an app', 'Create something awesome', false),
  ('Deploy', 'Ship it to production', false);
