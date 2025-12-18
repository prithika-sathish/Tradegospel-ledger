
# Ledger System (Role-Based, Immutable)

Minimal ledger API built with **NestJS + PostgreSQL** demonstrating **database-enforced immutability** and **role-based access control**.

---

## Tech Stack

* Node.js (NestJS)
* PostgreSQL
* TypeORM

---

## Database Setup

### Credentials (for evaluation)

```
Database: ledger_db

DB Admin User: ledger_admin
Password: adminpass

App DB User: ledger_app
Password: apppass
```

### Key DB Guarantees

* `ledger_app` can **only SELECT and INSERT**
* UPDATE / DELETE are blocked at DB level
* Trigger prevents mutations and emits audit notifications

---

## Run Locally

```bash
npm install
npm run start:dev
```

Server runs at:

```
http://localhost:3000
```

---

## Role Simulation

Roles are passed via HTTP header:

```
x-role: admin
x-role: viewer
```

---

## API Endpoints

### Create Ledger Entry (admin only)

```powershell
Invoke-RestMethod `
  -Uri http://localhost:3000/ledger `
  -Method POST `
  -Headers @{ "x-role" = "admin" } `
  -ContentType "application/json" `
  -Body '{"amount":1000,"description":"test"}'
```

### Read Ledger (admin / viewer)

```powershell
Invoke-RestMethod http://localhost:3000/ledger
Invoke-RestMethod http://localhost:3000/ledger/1
```

### Viewer Insert (blocked)

```powershell
Invoke-RestMethod `
  -Uri http://localhost:3000/ledger `
  -Method POST `
  -Headers @{ "x-role" = "viewer" } `
  -ContentType "application/json" `
  -Body '{"amount":500,"description":"fail"}'
```

Returns `403 Forbidden`.

---

## Immutability Proof (DB-Level)

Connect as app user:

```bat
psql -U ledger_app -d ledger_db
```

Try:

```sql
DELETE FROM ledger_entries;
UPDATE ledger_entries SET amount = 1;
```

Result:

```
ERROR: Ledger entries are immutable
```

---

## Audit of Mutation Attempts

* UPDATE / DELETE attempts trigger a **PostgreSQL NOTIFY event**
* Notifications include operation, actor, and timestamp
* Rollback-safe (works even when mutation is rejected)

