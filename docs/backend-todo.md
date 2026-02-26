# 🛠️ FULL BACKEND TO-DO LIST

- [x] **1. Project Setup & DB:** Initialize Express, connect MongoDB Atlas, and install dependencies (`mongoose`, `dotenv`, `cors`, `multer`, `csv-parser`, `bcrypt`, `jsonwebtoken`, `cloudinary`).
- [x] **2. Database Models:** Create `Student`, `Admin`, `Alumni`, `Timetable`, and `Event` schemas. Ensure `matricNo` is unique.
- [x] **3. Authentication:** Set up JWT login controller and role-based middleware to protect routes for the President and the 4 VPs.
- [x] **4. CSV Upload Logic:** Build the `/api/admin/upload-students` route to parse CSVs, generate `NACOS-26-XXXX` IDs for new matrics, and set `hasPaidDues` to true.
- [x] **5. Timetable API:** Build CRUD routes for VPs to manage their specific departmental tutorial timetables.
- [x] **6. Alumni & Events API:** Build protected routes for the President to upload Wall of Fame entries, news, and events (including image upload handling).
- [x] **7. Public Endpoints:** Build `GET` routes so the React frontend can fetch verification status, timetables, alumni, and news without needing to log in.
- [ ] **8. Frontend Integration:** Connect the Axios/Fetch calls in the React `src/pages` to these new backend endpoints.