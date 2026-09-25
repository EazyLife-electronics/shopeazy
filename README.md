# ShopEazy

ShopEazy is a managed retail and e-commerce application.

## Architecture baseline

- React + TypeScript + Vite
- Tailwind CSS
- Supabase + PostgreSQL
- Supabase Auth
- PostgreSQL Row Level Security (RLS)
- Server/database-side transactions for critical inventory operations
- Supabase Storage
- Vitest, React Testing Library, and Playwright
- GitHub with feature branches

## Core business rules

ShopEazy is not an open marketplace. Partners supply products and outlets, while ShopEazy controls the customer experience, catalog, ordering, and fulfillment.

Orders do not reserve or deduct inventory when submitted. Authorized fulfillment approval performs the stock check and inventory transaction atomically on the server/database side.

Customer and staff access must be enforced by backend/database authorization, not frontend visibility alone.

## Development

Development must use local Supabase/database infrastructure where practical. Production data is never modified during development unless explicitly requested.

See docs/architecture.md for the initial architectural decisions and constraints.
