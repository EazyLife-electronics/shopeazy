# ShopEazy Architecture

## 1. Application shape

One repository and one React application initially, with separate customer and staff/admin areas.

Business logic is organized by feature. Brand identity and business configuration are kept separate from application logic so the business can be rebranded later without rewriting the application.

## 2. Data model direction

The database is relational PostgreSQL. Core entities include business settings, staff profiles and roles, customers, partners, outlets, categories, products, inventory, inventory movements, orders, order items, fulfillment groups, returns, and audit logs.

The exact schema is introduced through versioned Supabase migrations after constraints, indexes, permissions, and lifecycle rules are reviewed.

## 3. Inventory integrity

Submitting an order does not change stock.

Authorized fulfillment approval is a database transaction:
1. Lock relevant inventory rows.
2. Check available quantities.
3. Abort if any required quantity is unavailable.
4. Deduct all approved quantities.
5. Record inventory movements.
6. Update fulfillment/order state as appropriate.
7. Record the audit event.
8. Commit.

Any failure rolls the entire operation back. No partial deduction is acceptable.

## 4. Order and fulfillment state

Order and fulfillment state are separate because one order may involve multiple outlets.

Initial order direction: DRAFT -> SUBMITTED -> PENDING_FULFILLMENT -> UNDER_REVIEW -> APPROVED -> PROCESSING -> READY -> COMPLETED

Possible exception and cancellation paths are handled explicitly.

Initial fulfillment direction: UNASSIGNED -> ASSIGNED -> UNDER_REVIEW -> APPROVED -> PROCESSING -> READY -> COMPLETED

Possible states include insufficient stock, reassignment required, failed, and cancelled.

These are design baselines, not yet database enums.

## 5. Authorization

Initial roles: ADMIN, PARTNER_MANAGER, PARTNER_STAFF, OUTLET_STAFF.

Authorization is enforced using PostgreSQL RLS and server-side/database functions. Frontend route guards and hidden controls are UX only.

Permissions should become explicit capabilities such as inventory.view, inventory.adjust, order.view, fulfillment.approve, fulfillment.reassign, return.process, partner.manage, outlet.manage, and settings.branding.

## 6. Branding

Business identity must be configurable: business name, short name, logo, favicon, primary/secondary colors, tagline, phone, WhatsApp, email, website, social links, and support information.

Core code must not depend on literal ShopEazy branding.

## 7. Security principles

- Never expose Supabase service-role credentials to the browser.
- Do not trust client-supplied authorization.
- Do not perform critical inventory mutations solely in frontend JavaScript.
- Validate business rules at the database/server boundary.
- Use constraints, foreign keys, indexes, RLS policies, and transactions as appropriate.
- Keep an auditable history for inventory and important operational actions.

## 8. Development safety

- main represents the stable branch.
- Significant work uses feature branches.
- Database changes use versioned migrations.
- Development uses local/test data.
- Production/live data is not touched unless explicitly requested.
- Prefer root-cause fixes over symptom patches.

## 9. Rejected premature complexity

The initial system will not introduce microservices, Kubernetes, multi-tenant architecture, or a separate backend server unless a demonstrated requirement appears.
