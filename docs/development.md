# Development Guide

## Branching

Use main for stable work. Create a feature branch for significant changes.

Examples: feature/project-foundation, feature/database-foundation, feature/auth-staff.

## Environment

Never commit real credentials. Copy .env.example to a local environment file and provide development credentials there.

The initial setup will use the Supabase CLI/local stack where practical so application development does not depend on production data.

## Database changes

Database changes must be represented by versioned Supabase migrations. Do not make undocumented production schema changes during development.

## Testing

Foundation and business-critical changes should eventually include unit tests for deterministic business logic, integration/database tests for authorization and transactions, and Playwright end-to-end tests for critical user workflows.

Inventory approval, cancellation, return, and authorization paths require particular attention to failure and concurrency cases.
