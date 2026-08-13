# Navrachna Stage 2.4 Data Migration Log

**Migration Timestamp**: 2026-08-13T19:11:52.867Z  
**Source Codebase**: Navrachna Website Static Datasets  
**Target Architecture**: Supabase PostgreSQL Database & Storage Buckets  

---

## 1. Migration Execution Summary
- **Site Settings**: 1 global settings record created.
- **Startup Categories**: 9 taxonomy sectors created.
- **Programs**: 5 core incubation tracks migrated ('newgen-iedc', 'msme-bi', 'startinup', 'iic-itsec', 'kartavyam').
- **Cohorts**: 5 academic/funding year cycles created ('2023-24' down to '2019-20').
- **Facilities**: 7 physical laboratory & workspace records created.
- **Policies**: 3 core policy PDF document records created.
- **Announcements**: 4 public update bulletins created.
- **FAQs**: 4 categorized general Q&A pairs created.
- **Testimonials**: 3 founder quotes and outcome metric records created.

---

## 2. Leadership Data Conflict Log (MANUAL REVIEW REQUIRED)

| Role | LandingPage.jsx | AboutPage.jsx | Conflict Resolution Status |
| :--- | :--- | :--- | :--- |
| **Chairman** | Shri R.P. Chadha | Shri B.L. Gupta | **UNRESOLVED / HELD FOR REVIEW** |
| **Director** | Prof. (Dr.) Mayank Garg | Dr. Manish Sharma | **UNRESOLVED / HELD FOR REVIEW** |
| **Advisor** | Dr. Surya Prasad Mishra | Prof. (Dr.) Sanjay Yadav | **UNRESOLVED / HELD FOR REVIEW** |
| **Vice Chairman** | Shri Sohil Gupta | Shri Sohil Gupta | **MATCHED (Identical)** |

---

## 3. Asset Migration Pointer Strategy
All image assets referenced in React data modules (.png, .jpg, .webp) are mapped to public URLs in Supabase Storage Buckets (people-photos/, startup-logos/, facility-images/, project-media/, policy-documents/).

---

## 4. 1NF Mentor & Mentee Normalization Plan
- Mentee strings containing multiple names (e.g. Shivani Dubey and Md Samiruddin) will be split into distinct people records during the database seed script execution.
- Relational connections will be inserted into project_people with role_in_project = 'mentor' or 'mentee'.
