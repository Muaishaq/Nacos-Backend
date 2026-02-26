# ⚙️ FULL BACKEND SPECIFICATION (Admin-First MERN Stack)

## 1. Architecture & Stack
* **Runtime/Framework:** Node.js & Express.js
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT & bcrypt (For President and 4 Dept VPs)
* **File Handling:** `multer` and `csv-parser` for CSV uploads. Cloudinary or local storage for image uploads.

## 2. Database Models
1. **Student:** `matricNo` (Unique), `name`, `department` (CS, SE, CYB, IT), `level` (100-500), `nacosId` (Auto-generated `NACOS-26-XXXX`), `hasPaidDues` (Boolean).
2. **Admin:** `username`, `passwordHash`, `role` (President, VP_CS, VP_SE, VP_CYB, VP_IT).
3. **Alumni (Wall of Fame):** `fullName`, `gradYear`, `currentRole`, `imageUrl` (Only President can add).
4. **Timetable:** `department`, `day`, `time`, `courseTitle`, `venue` (VPs can add/edit).
5. **Event/News:** `title`, `content`, `date`, `category` (Sports, Tech Guild, General), `imageUrl` (President can add).

## 3. Core API Routes
* **Auth:** * `POST /api/auth/login` (Returns JWT for President/VPs)
* **Admin (Protected - President):** * `POST /api/admin/upload-students` (CSV upload to generate IDs and update dues).
  * `POST /api/admin/alumni` (Uploads new alumni).
  * `POST /api/admin/events` (Creates news and events).
* **VPs (Protected - Departmental VPs):** * `POST/PUT/DELETE /api/vp/timetable` (Manages department-specific timetables).
* **Public:** * `GET /api/verify/:matricNo` (Checks student ID and dues).
  * `GET /api/alumni` (Fetches Wall of Fame).
  * `GET /api/timetable` (Fetches department timetables).
  * `GET /api/events` (Fetches news/events for the frontend).