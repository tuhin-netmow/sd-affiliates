# AI AGENT PROMPT

## Build SquadDeck Affiliate System Demo — Frontend Only

You are an expert **Next.js + TypeScript + shadcn/ui + Tailwind CSS** developer.

We already have an existing Next.js project.

The project is already configured with:

* Next.js
* TypeScript
* App Router
* Tailwind CSS
* shadcn/ui

Your task is to build a complete **SquadDeck Affiliate System Demo** inside the existing project.

---

# 1. VERY IMPORTANT — FRONTEND ONLY

This is a **demo/prototype application**.

Do NOT build a backend.

Do NOT create:

* Backend APIs
* Express server
* Database
* Prisma
* MongoDB
* PostgreSQL
* API routes
* Server actions for data persistence
* Real authentication
* Real payment integration
* Stripe integration
* PayPal integration
* Email integration
* Webhooks
* Real affiliate tracking
* Real cookies for attribution
* External services

Everything must use **dummy/mock data**.

The purpose is to demonstrate the proposed affiliate system to a client.

---

# 2. EXISTING PROJECT

The project is already installed.

Before coding:

1. Inspect the existing project structure.
2. Inspect `package.json`.
3. Inspect `src/app` or `app`.
4. Inspect existing layouts.
5. Inspect existing components.
6. Inspect existing shadcn/ui components.
7. Inspect existing Tailwind configuration.
8. Inspect existing theme/design system.

Do NOT initialize a new project.

Do NOT change the project from TypeScript to JavaScript.

Do NOT unnecessarily modify existing configuration.

Do NOT break existing application functionality.

Use **TypeScript** for all new files.

---

# 3. MAIN OBJECTIVE

Create a polished frontend demo showing how the SquadDeck Affiliate System will work.

The most important workflow is:

```text
Affiliate Application
        ↓
Admin Approval
        ↓
Affiliate Gets Referral Link
        ↓
Visitor Clicks Referral Link
        ↓
Visitor Signs Up
        ↓
Free SquadDeck Account
        ↓
Customer Upgrades
        ↓
Paid Subscription
        ↓
Commission Generated
        ↓
Commission Approved
        ↓
Commission Payable
        ↓
Affiliate Requests Payout
        ↓
Admin Approves Payout
        ↓
Payout Paid
```

Every step must be visually clear.

---

# 4. DUMMY DATA ONLY

Create realistic dummy data inside the frontend.

Use a centralized mock data file.

For example:

```text
src/
  lib/
    affiliate/
      mock-data.ts
```

Adapt this location to the existing project structure.

Do NOT create a database.

Do NOT fetch data from an API.

Do NOT create backend endpoints.

---

# 5. FRONTEND STATE

Use frontend state only.

If the project already has a state management system, reuse it if appropriate.

Otherwise use:

* React Context
* `useState`
* `useReducer`

Keep the implementation simple.

Create a centralized Affiliate Demo state.

For example:

```text
AffiliateDemoContext
```

The state should contain:

```text
affiliates
applications
referralLinks
campaigns
clicks
referrals
customers
commissions
payouts
coupons
tiers
bonuses
notifications
fraudCases
marketingAssets
auditLogs
```

---

# 6. IMPORTANT STATE BEHAVIOR

The dummy data must be interactive.

For example:

If the user clicks:

```text
Approve Affiliate
```

the dummy state should change:

```text
Pending → Active
```

and the UI should update immediately.

Also create a notification:

```text
Affiliate approved successfully.
```

And an audit log:

```text
Admin approved affiliate.
```

Everything remains in frontend memory.

A page refresh may reset the demo data. That is acceptable.

Do NOT implement database persistence.

---

# 7. DO NOT CREATE MOCK API FILES

Do not create fake API endpoints.

Do not create:

```text
/api/affiliate
/api/admin
```

Do not create Express APIs.

Do not create server-side data fetching.

Keep everything local to the frontend.

You may create frontend utility functions such as:

```text
approveAffiliate()
createReferral()
generateCommission()
requestPayout()
```

These functions should only modify local React state.

---

# 8. APPLICATION STRUCTURE

Create two main experiences:

## Affiliate Portal

For affiliates.

## Admin Portal

For SquadDeck administrators.

Also create:

## Demo Control Center

For demonstrating the complete workflow.

---

# 9. DEMO CONTROL CENTER

Create:

```text
/demo
```

This is the most important page for client demonstrations.

The page should clearly explain:

### Step 1

Affiliate

```text
James Wilson
```

### Step 2

Referral Click

Button:

```text
Simulate Referral Click
```

Result:

```text
✓ Referral click recorded
```

### Step 3

Signup

Button:

```text
Simulate Signup
```

Result:

```text
✓ Riverside Basketball Club created

Plan:
Free

Affiliate:
James Wilson
```

### Step 4

Upgrade

Button:

```text
Upgrade Customer to Pro
```

Result:

```text
✓ Customer upgraded

Plan:
Pro

Monthly Revenue:
$49
```

### Step 5

Commission

Button:

```text
Generate Commission
```

Calculation:

```text
$49 × 25% = $12.25
```

Status:

```text
Pending
```

### Step 6

Approve

Button:

```text
Approve Commission
```

Status:

```text
Approved
```

### Step 7

Make Payable

Button:

```text
Make Commission Payable
```

Status:

```text
Payable
```

### Step 8

Request Payout

Button:

```text
Request Payout
```

Status:

```text
Pending Review
```

### Step 9

Approve Payout

Button:

```text
Approve Payout
```

Status:

```text
Approved
```

### Step 10

Mark Paid

Button:

```text
Mark Payout Paid
```

Status:

```text
Paid
```

---

# 10. RESET DEMO

Add a button:

```text
Reset Demo
```

When clicked:

* Restore original dummy data
* Reset demo workflow
* Reset commissions
* Reset payouts
* Reset notifications
* Reset audit logs

Show confirmation before resetting.

---

# 11. AFFILIATE PORTAL NAVIGATION

Create:

```text
Dashboard
My Links
Campaigns
Coupons
Referrals
Customers
Commissions
Earnings
Payouts
Analytics
Marketing Materials
Bonuses
Leaderboard
Notifications
Profile
Settings
```

Use the existing project's navigation/layout if possible.

---

# 12. AFFILIATE DASHBOARD

Route:

```text
/affiliate/dashboard
```

Create KPI cards:

```text
Total Clicks
1,248

Signups
186

Paid Customers
74

Conversion Rate
5.9%

Revenue Generated
$8,420

Pending Commission
$485

Payable Commission
$720

Total Earned
$2,840
```

Add:

* Revenue chart
* Conversion chart
* Recent referrals
* Recent commissions
* Tier progress
* Quick actions

Quick actions:

```text
Create Referral Link
View Referrals
Request Payout
Marketing Materials
```

---

# 13. REFERRAL LINKS

Route:

```text
/affiliate/links
```

Display:

* Link name
* Referral code
* URL
* Campaign
* Clicks
* Signups
* Customers
* Revenue
* Commission
* Status

Actions:

* Copy
* Edit
* Delete
* Analytics

Create Link dialog:

```text
Link Name
Campaign
Landing Page
Referral Code
UTM Source
UTM Medium
UTM Campaign
```

When the user creates a link:

* Add it to local state
* Update the list
* Show success toast

---

# 14. CAMPAIGNS

Route:

```text
/affiliate/campaigns
```

Dummy campaigns:

```text
Summer Sports Campaign
Football Club Campaign
Coach Referral Campaign
2026 Growth Campaign
```

Display:

* Status
* Start date
* End date
* Clicks
* Signups
* Customers
* Revenue
* Commission

Actions:

* Create
* Edit
* Pause
* Activate
* View

All actions update frontend state.

---

# 15. COUPONS

Route:

```text
/affiliate/coupons
```

Display:

* Coupon code
* Discount
* Usage
* Customers
* Revenue
* Commission
* Expiration
* Status

Example:

```text
SQUADJAMES20
20% OFF
```

Button:

```text
Request Coupon
```

The request should appear in the admin coupon management page.

---

# 16. REFERRALS

Route:

```text
/affiliate/referrals
```

Display:

* Customer
* Organization
* Referral date
* Signup date
* Plan
* Status
* Revenue
* Commission
* Attribution
* Campaign
* Coupon

Statuses:

```text
Clicked
Signed Up
Free
Trial
Paid
Cancelled
Refunded
```

Clicking a referral should open a detail Sheet/Drawer.

---

# 17. REFERRAL LIFECYCLE COMPONENT

Create reusable:

```text
AffiliateLifecycleTimeline
```

Show:

```text
Referral Click
      ↓
Signup
      ↓
Free Account
      ↓
Paid Subscription
      ↓
Commission
      ↓
Payable
      ↓
Payout
      ↓
Paid
```

Use it in:

* Referral detail
* Customer detail
* Demo page
* Commission detail

---

# 18. CUSTOMERS

Route:

```text
/affiliate/customers
```

Show:

* Organization
* Contact
* Plan
* Signup date
* Subscription status
* Monthly revenue
* Lifetime revenue
* Commission

Customer detail should show:

* Organization
* Referral
* Subscription
* Payment history
* Commission history
* Campaign
* Coupon
* Attribution

---

# 19. COMMISSIONS

Route:

```text
/affiliate/commissions
```

Display:

* Date
* Customer
* Plan
* Type
* Amount
* Status
* Reference

Statuses:

```text
Pending
Approved
Payable
Paid
Reversed
Refunded
```

Add filtering.

---

# 20. EARNINGS

Route:

```text
/affiliate/earnings
```

Show:

```text
Lifetime Earnings
Pending
Approved
Payable
Paid
Reversed
Current Balance
```

Explain:

```text
Pending
Commission is waiting for approval.

Approved
Commission has been validated.

Payable
Commission is available for payout.

Paid
Commission has already been paid.
```

---

# 21. PAYOUTS

Route:

```text
/affiliate/payouts
```

Show:

```text
Available Balance
Minimum Payout
Next Payout
Payout Method
```

Button:

```text
Request Payout
```

Requesting a payout should update local state.

---

# 22. ANALYTICS

Route:

```text
/affiliate/analytics
```

Show:

* Clicks
* Visitors
* Signups
* Paid conversions
* Conversion rate
* Revenue
* Commission

Filters:

```text
Last 7 Days
Last 30 Days
Last 90 Days
This Year
```

Use charts.

---

# 23. MARKETING MATERIALS

Route:

```text
/affiliate/marketing
```

Categories:

```text
Logos
Banners
Social Media
Videos
Screenshots
Email Templates
PDFs
Sales Materials
```

Show realistic dummy assets.

Download buttons can simply show:

```text
Demo download started.
```

No real storage is required.

---

# 24. BONUSES

Route:

```text
/affiliate/bonuses
```

Examples:

```text
First 10 Customers
Reward: $100
Progress: 7/10
```

```text
$1,000 Revenue Milestone
Reward: $150
```

Show progress bars.

---

# 25. LEADERBOARD

Route:

```text
/affiliate/leaderboard
```

Tabs:

* Monthly
* Quarterly
* All Time

Show:

* Rank
* Affiliate
* Customers
* Revenue
* Commission

---

# 26. NOTIFICATIONS

Route:

```text
/affiliate/notifications
```

Dummy notifications:

```text
New referral generated.

New customer signed up.

Your commission was approved.

Your payout was processed.

You reached Gold Tier.
```

Allow:

* Mark read
* Mark all read

---

# 27. PROFILE

Route:

```text
/affiliate/profile
```

Fields:

* Name
* Company
* Website
* Phone
* Country
* Social media
* Promotional channels

Use local state for editing.

---

# 28. SETTINGS

Route:

```text
/affiliate/settings
```

Sections:

* Account
* Notifications
* Payout Preferences
* Security
* Privacy
* Terms

All controls can be demo-only.

---

# 29. ADMIN PORTAL

Create admin navigation:

```text
Dashboard
Affiliates
Applications
Referrals
Customers
Commissions
Payouts
Commission Rules
Affiliate Tiers
Campaigns
Coupons
Bonuses
Marketing Materials
Fraud Detection
Reports
Notifications
Terms & Conditions
Audit Logs
Settings
```

---

# 30. ADMIN DASHBOARD

Route:

```text
/admin/affiliates
```

Show:

```text
Total Affiliates
Active Affiliates
Pending Applications
Total Clicks
Total Signups
Paid Customers
Conversion Rate
Referral Revenue
Total Commission
Pending Payouts
Fraud Cases
```

Add charts:

* Affiliate growth
* Referral growth
* Revenue
* Commission

---

# 31. APPLICATION MANAGEMENT

Route:

```text
/admin/affiliates/applications
```

Show:

* Applicant
* Company
* Website
* Country
* Promotional channel
* Date
* Status

Actions:

```text
View
Approve
Reject
Request Information
```

Approve:

```text
Pending → Active
```

Reject:

```text
Pending → Rejected
```

Create notification and audit log.

---

# 32. AFFILIATE MANAGEMENT

Route:

```text
/admin/affiliates/list
```

Show:

* Affiliate
* Referral Code
* Status
* Tier
* Clicks
* Customers
* Revenue
* Commission

Actions:

* View
* Edit
* Suspend
* Reactivate
* Ban

---

# 33. AFFILIATE DETAIL

Route:

```text
/admin/affiliates/[id]
```

Tabs:

```text
Overview
Referrals
Customers
Commissions
Payouts
Campaigns
Coupons
Fraud
Activity
```

Admin actions:

* Change status
* Change tier
* Change commission
* Adjust commission
* Add note

---

# 34. ADMIN REFERRALS

Route:

```text
/admin/affiliates/referrals
```

Show complete attribution:

```text
Affiliate
↓
Referral Click
↓
Signup
↓
Organization
↓
Subscription
↓
Revenue
↓
Commission
```

Example:

```text
Affiliate:
James Wilson

Organization:
Riverside Basketball Club

Plan:
Pro

Revenue:
$49/month

Commission:
$12.25/month

Attribution:
Last Touch
```

---

# 35. ADMIN COMMISSIONS

Route:

```text
/admin/affiliates/commissions
```

Show all commission transactions.

Actions:

```text
Approve
Reject
Reverse
Adjust
```

Show calculation:

```text
$49 × 25% = $12.25
```

---

# 36. COMMISSION RULES

Route:

```text
/admin/affiliates/commission-rules
```

Demo configuration:

```text
Starter: 25%
Pro: 25%

Bronze: 20%
Silver: 25%
Gold: 30%
Platinum: 35%
```

Allow frontend editing.

No database persistence is required.

---

# 37. AFFILIATE TIERS

Route:

```text
/admin/affiliates/tiers
```

Create:

```text
Bronze
Silver
Gold
Platinum
```

Each includes:

* Minimum customers
* Revenue requirement
* Commission rate
* Benefits

Changing the values should update the local demo state.

---

# 38. ADMIN CAMPAIGNS

Route:

```text
/admin/affiliates/campaigns
```

Admin can:

* Create
* Edit
* Activate
* Pause
* End
* Assign affiliates

---

# 39. ADMIN COUPONS

Route:

```text
/admin/affiliates/coupons
```

Admin can:

* Create
* Approve
* Reject
* Activate
* Deactivate
* Edit discount
* Edit expiration
* Assign affiliate

---

# 40. ADMIN BONUSES

Route:

```text
/admin/affiliates/bonuses
```

Allow creation of:

* Customer milestone
* Revenue milestone
* Monthly bonus
* Campaign bonus
* Tier bonus

---

# 41. FRAUD DETECTION

Route:

```text
/admin/affiliates/fraud
```

Show dummy fraud cases:

```text
Self Referral
Duplicate Organization
Suspicious IP
Click Spam
Coupon Abuse
Abnormal Conversion
Refund Pattern
Chargeback Pattern
```

Actions:

```text
Investigate
Mark Safe
Reject
Reverse Commission
Suspend Affiliate
Ban Affiliate
```

Everything is frontend-only.

---

# 42. PAYOUT MANAGEMENT

Route:

```text
/admin/affiliates/payouts
```

Show:

* Affiliate
* Amount
* Method
* Requested date
* Status
* Reference

Statuses:

```text
Pending
Approved
Processing
Paid
Rejected
```

Actions:

```text
Approve
Reject
Processing
Mark Paid
```

---

# 43. REPORTS

Route:

```text
/admin/affiliates/reports
```

Reports:

* Affiliate performance
* Referrals
* Revenue
* Commissions
* Payouts
* Campaigns
* Coupons
* Tiers
* Bonuses
* Fraud

Use dummy data.

Export buttons can simply display:

```text
Demo export generated.
```

No backend is required.

---

# 44. AUDIT LOGS

Route:

```text
/admin/affiliates/audit-logs
```

Show:

* User
* Action
* Entity
* Previous value
* New value
* Reason
* Timestamp

Actions performed during the demo should create audit records in local state.

---

# 45. TERMS & CONDITIONS

Route:

```text
/admin/affiliates/terms
```

Show demo affiliate terms covering:

* Commission
* Attribution
* Refund
* Chargeback
* Self-referral
* Spam
* PPC
* Coupons
* Fraud
* Termination

No real legal integration is required.

---

# 46. RESETTABLE DEMO STATE

Create:

```text
Reset Demo
```

The reset should restore:

* Affiliates
* Applications
* Referrals
* Customers
* Commissions
* Payouts
* Coupons
* Campaigns
* Notifications
* Fraud cases
* Audit logs

to their original dummy state.

---

# 47. DUMMY DATA

Create realistic data approximately:

```text
25 Affiliates
8 Pending Applications
150 Referral Clicks
75 Unique Visitors
32 Signups
18 Paid Customers
4 Campaigns
8 Coupons
50 Commission Transactions
12 Payouts
4 Tiers
10 Bonuses
15 Fraud Cases
20 Marketing Assets
```

Use realistic names:

```text
James Wilson
Sarah Mitchell
Daniel Carter
Olivia Brown
Michael Anderson
Emma Taylor
David Thompson
```

Sports organizations:

```text
Riverside Basketball Club
Manchester Youth Football Academy
Elite Hockey Association
Northside Cricket Club
Premier Volleyball Academy
```

---

# 48. DATA MUST BE CONNECTED

Do not create random data independently on every page.

For example:

```text
James Wilson
      ↓
JAMES123
      ↓
Referral Link
      ↓
Riverside Basketball Club
      ↓
Pro Plan
      ↓
$49/month
      ↓
25% Commission
      ↓
$12.25
      ↓
Payout
```

The same records must appear consistently throughout the application.

---

# 49. IMPORTANT BUSINESS RULES

Use these demo values.

### Attribution

```text
90-day attribution window
Last eligible affiliate touch
```

### Starter

```text
$19/month
25% commission
$4.75 commission
```

### Pro

```text
$49/month
25% commission
$12.25 commission
```

### Payout

```text
Minimum payout: $50
```

### Tiers

```text
Bronze: 20%
Silver: 25%
Gold: 30%
Platinum: 35%
```

These are demo values only.

---

# 50. REFUND DEMO

Add:

```text
Simulate Refund
```

When clicked:

Before:

```text
Commission:
$12.25
Status:
Approved
```

After:

```text
Commission:
-$12.25 reversal

Status:
Reversed
```

Update:

* Earnings
* Balance
* Commission history
* Notifications
* Audit logs

---

# 51. TIER DEMO

Allow the user to simulate additional customers.

For example:

```text
Current Customers: 24
Gold requirement: 25
```

Click:

```text
Add Demo Customer
```

Result:

```text
25 customers
```

Show:

```text
🎉 Affiliate upgraded to Gold

Commission:
25% → 30%
```

Update the dashboard.

---

# 52. COUPON DEMO

Allow:

```text
Select Affiliate
Select Coupon
Simulate Usage
```

Update:

* Usage
* Revenue
* Customers
* Commission

---

# 53. UI DESIGN

The application should look like a modern SaaS product.

Use:

* Clean sidebar
* Professional dashboard
* Cards
* Tables
* Tabs
* Dialogs
* Drawers
* Charts
* Progress bars
* Badges
* Toasts

Avoid:

* Overly flashy design
* Excessive gradients
* Huge decorative elements
* Unnecessary animations

Focus on clarity.

---

# 54. CLIENT-FRIENDLY EXPLANATIONS

Important sections should contain simple descriptions.

Example:

### Affiliate Attribution

"Attribution connects a referred visitor to their SquadDeck organization so the affiliate receives credit when that organization becomes a customer."

### Commission

"Commission is the amount an affiliate earns from a referred customer."

### Payable

"Payable commission is approved commission that is ready to be paid to the affiliate."

---

# 55. RESPONSIVE

Make the demo responsive for:

* Desktop
* Tablet
* Mobile

Tables should become horizontally scrollable or responsive.

Sidebar should collapse on smaller screens.

---

# 56. ACCESSIBILITY

Use:

* Accessible buttons
* Form labels
* Keyboard navigation
* Dialog accessibility
* Focus states
* Tooltips
* Proper headings

---

# 57. LOADING / EMPTY STATES

Create realistic:

* Loading states
* Empty states
* No-results states

Example:

```text
No referral links yet.

Create your first referral link to start tracking customers.

[Create Referral Link]
```

---

# 58. TOASTS

Important actions should display a toast.

Examples:

```text
Affiliate approved successfully.

Referral link created.

Customer upgraded successfully.

Commission generated.

Commission approved.

Payout requested.

Payout marked as paid.

Commission reversed.
```

---

# 59. CONFIRMATION DIALOGS

Require confirmation for:

* Suspend affiliate
* Ban affiliate
* Reject commission
* Reverse commission
* Reject payout
* Delete campaign
* Delete referral link
* Reset demo

---

# 60. NO BACKEND — FINAL RULE

This requirement overrides everything else.

The application must remain:

**100% frontend-only.**

Use:

```text
Next.js
TypeScript
React
shadcn/ui
Tailwind CSS
Dummy Data
React State
```

Do NOT introduce:

```text
Database
API
Backend
Server
Prisma
Express
Stripe
PayPal
Webhooks
Email Services
External Affiliate Services
```

---

# 61. IMPLEMENTATION ORDER

Follow this order.

## Phase 1

Inspect the existing project.

Do not modify unrelated code.

## Phase 2

Create:

* TypeScript types
* Dummy data
* Affiliate demo context/state
* Business logic utilities

## Phase 3

Build shared components:

* Sidebar
* Header
* Stat cards
* Tables
* Status badges
* Filters
* Dialogs
* Drawers
* Charts
* Timeline
* Empty states

## Phase 4

Build Affiliate Portal.

## Phase 5

Build Admin Portal.

## Phase 6

Build Demo Control Center.

## Phase 7

Connect every screen to the same frontend state.

## Phase 8

Test the complete workflow.

## Phase 9

Polish responsive design and UX.

---

# 62. FINAL ACCEPTANCE TEST

The following must work entirely with dummy data.

Start:

```text
James Wilson
```

Then:

```text
Simulate Referral Click
```

Expected:

```text
Click +1
```

Then:

```text
Simulate Signup
```

Expected:

```text
New customer
Free account
Affiliate attribution
```

Then:

```text
Upgrade to Pro
```

Expected:

```text
Pro
$49/month
```

Then:

```text
Generate Commission
```

Expected:

```text
$49 × 25% = $12.25
Pending
```

Then:

```text
Approve Commission
```

Expected:

```text
Approved
```

Then:

```text
Make Payable
```

Expected:

```text
Payable
```

Then:

```text
Request Payout
```

Expected:

```text
Pending
```

Then:

```text
Approve Payout
```

Expected:

```text
Approved
```

Then:

```text
Mark Payout Paid
```

Expected:

```text
Paid
```

Finally:

```text
Simulate Refund
```

Expected:

```text
Commission Reversed
-$12.25
```

All dashboards, tables, counters, notifications and audit logs should reflect these changes.

---

# 63. FINAL OUTPUT FROM THE AI AGENT

After completing the implementation, provide:

### Routes created

List all routes.

### Components created

List important reusable components.

### TypeScript types created

List the main interfaces/types.

### Dummy data

Explain where dummy data is stored.

### State management

Explain how frontend state works.

### Interactive workflow

Explain the complete:

```text
Referral
→ Signup
→ Free
→ Paid
→ Commission
→ Payable
→ Payout
→ Paid
```

### Existing files changed

Clearly list any existing project files that were modified.

### Backend

State clearly:

**No backend has been implemented.**

### Persistence

State clearly:

**Data is frontend-only and resets when the demo state is reset or the application is refreshed, depending on the implementation.**

---

# FINAL INSTRUCTION

Build this as a **client demonstration application**, not a production backend system.

The client should be able to open the demo and understand:

**How an affiliate joins → promotes SquadDeck → refers a sports organization → that organization becomes a paid customer → the affiliate earns commission → the affiliate requests and receives a payout.**

Prioritize:

1. Clear workflow
2. Realistic dummy data
3. Interactive frontend state
4. Professional UI
5. Consistent data across pages
6. Easy client demonstration
7. Clean reusable TypeScript components

Do not build anything backend-related at this stage.
