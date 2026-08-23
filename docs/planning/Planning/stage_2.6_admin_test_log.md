# Stage 2.6: Admin Security & CMS Test Log

**Project**: Navrachna Website  
**Branch**: `prod-development`  
**Supabase Reference**: `obnqhrmfbctslwoylsjq` (`https://obnqhrmfbctslwoylsjq.supabase.co`)  
**Vercel Endpoint**: `https://navrachna-dev.vercel.app/admin`  
**Audit Date**: August 14, 2026  

---

## 1. Security & RLS Test Matrix

| # | Test Scenario | Actor / Role | Target Endpoint / Action | Expected Result | Actual Result | Status |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Direct URL access without auth | Anonymous Visitor | Navigate to `/admin/dashboard` | Redirect to `/admin/login` | Redirected | **PASS** |
| **2** | Direct URL access to CMS settings | Anonymous Visitor | Navigate to `/admin/settings` | Redirect to `/admin/login` | Redirected | **PASS** |
| **3** | Direct URL access to CMS announcements | Anonymous Visitor | Navigate to `/admin/announcements` | Redirect to `/admin/login` | Redirected | **PASS** |
| **4** | Non-admin user login | Standard Auth User | Log in via `/admin/login` | Redirect to `/admin/unauthorized` | Redirected | **PASS** |
| **5** | Admin / Editor login | Admin User (`admin_users`) | Log in via `/admin/login` | Access `/admin/dashboard` | Dashboard Granted | **PASS** |
| **6** | Anonymous database write | Anonymous Visitor | `INSERT INTO site_settings` | Postgres RLS Denial (HTTP 403) | Permission Denied | **PASS** |
| **7** | Anonymous database update | Anonymous Visitor | `UPDATE announcements` | Postgres RLS Denial (HTTP 403) | Permission Denied | **PASS** |
| **8** | Admin Site Settings CMS update | Admin User | Update phone/email in `/admin/settings` | DB Updated & Header/Footer updated | Updated Live | **PASS** |
| **9** | Admin Announcement creation | Admin User | Insert bulletin in `/admin/announcements` | DB Inserted & Ticker updated | Live Ticker Active | **PASS** |
| **10**| Admin Announcement edit | Admin User | Update bulletin in `/admin/announcements` | DB Updated & Ticker updated | Live Ticker Updated | **PASS** |
| **11**| Admin Announcement deletion | Admin User | Delete bulletin in `/admin/announcements` | DB Deleted with safety confirmation | Removed from DB | **PASS** |
| **12**| Admin Sign Out | Admin User | Click Sign Out button | Session cleared & redirect to login | Session Cleared | **PASS** |

---

## 2. Directory Isolation Audit for Branch Merging

- **Admin Module Isolation**: 100% of Admin CMS code is placed inside `src/admin/`:
  - `src/admin/context/AuthContext.jsx`
  - `src/admin/services/authService.js`
  - `src/admin/services/adminServices.js`
  - `src/admin/components/ProtectedAdminRoute.jsx`
  - `src/admin/components/AdminLayout.jsx`
  - `src/admin/pages/AdminLoginPage.jsx`
  - `src/admin/pages/AdminDashboardPage.jsx`
  - `src/admin/pages/AdminUnauthorizedPage.jsx`
  - `src/admin/pages/AdminSettingsPage.jsx`
  - `src/admin/pages/AdminAnnouncementsPage.jsx`

- **Branch Merging Process to `main`**:
  When merging public site features to `main` (`https://navrachna.vercel.app`), `src/admin/` can be git-ignored or excluded from `main` without breaking public routes.
