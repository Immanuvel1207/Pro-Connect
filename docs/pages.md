# 📄 Pro-connect - Pages Overview

This document provides a complete breakdown of all pages in **Pro-connect**, including their functionality, structure, and purpose.

---

## **🏠 1. Landing Page**
### 📌 Purpose:
- Introduction to **Pro-connect**.
- Provides **Login** and **Register** buttons.

### 🏗️ Structure:
- ✅ **Hero Section** → A brief description of Pro-connect.
- ✅ **Call to Action (CTA)** → Buttons for **Login** and **Register**.
- ✅ **Navigation Bar** → Links to **About, Features, and Contact**.

---

## **🔑 2. Register Page**
### 📌 Purpose:
- Allows new users to create an account.

### 🏗️ Structure:
- 📋 **Form Fields**:
  - **Name** (Unique username).
  - **Email** (For authentication).
  - **Password** (Secured with hashing).
  - **GitHub ID** (To showcase projects).
  - **Skills** (Technologies known).
  - **College Name** (Optional).
- 🔒 **Submit Button** → Registers user and stores details in the database.
- 🔗 **Login Link** → If already registered.

---

## **🔐 3. Login Page**
### 📌 Purpose:
- Authenticates users to access the platform.

### 🏗️ Structure:
- 📋 **Form Fields**:
  - **Email**.
  - **Password**.
- ✅ **Login Button** → Authenticates using JWT.
- 🔗 **Register Link** → If the user is new.

---

## **🖥️ 4. Dashboard**
### 📌 Purpose:
- Main **homepage** after login.
- Displays all **projects, help requests, and recommendations**.

### 🏗️ Structure:
- 🗂 **Project Listings** → Displayed as cards.
- 📌 **Help Requests** → Developers requesting help.
- 🎯 **Recommendations** → Suggested developers based on skills.
- 🔎 **Search Bar** → Filter projects by **skills, category, or college**.
- ➕ **Post Project Button** → To create a new project.
- 📩 **Chat Icon** → Open messaging system.

---

## **📄 5. Project Detail Page**
### 📌 Purpose:
- Shows complete details of a selected project.

### 🏗️ Structure:
- 🏷 **Project Title**.
- 📝 **Abstract & Description**.
- 🔗 **GitHub Repository Link**.
- 🎯 **Required Skills**.
- 📆 **Posted Date & Developer Info**.
- ✅ **Apply to Join Button** → Express interest in collaboration.
- 📩 **Message Creator Button** → Direct messaging.

---

## **➕ 6. Post a Project**
### 📌 Purpose:
- Allows users to **post their project details**.

### 🏗️ Structure:
- 📋 **Form Fields**:
  - **Project Title**.
  - **Abstract** (Brief summary).
  - **Full Description**.
  - **GitHub Repository Link**.
  - **Required Skills**.
- ✅ **Submit Button** → Saves project to the database.

---

## **🔍 7. Request Help Page**
### 📌 Purpose:
- Developers can request **specific skills** for their projects.

### 🏗️ Structure:
- 📋 **Form Fields**:
  - **Skill Required** (e.g., "React Developer").
  - **Project Name** (Optional).
  - **Additional Notes**.
- ✅ **Submit Button** → Posts the request.
- 📝 **Requests are visible on the Dashboard**.

---

## **📩 8. Messaging System**
### 📌 Purpose:
- Allows **real-time** communication between developers.

### 🏗️ Structure:
- 💬 **Chat Box** → Displays recent messages.
- 🖊 **Input Field** → Type and send messages.
- 🟢 **Active Status** → Shows online users.
- 🔄 **WebSockets (Socket.io)** → Enables real-time messaging.

---

## **👤 9. Profile Page**
### 📌 Purpose:
- Allows users to **manage their personal information**.

### 🏗️ Structure:
- 🏷 **User Details**:
  - Name, Email, GitHub ID, College, Skills.
- 📝 **Edit Profile Button** → Update details.
- 📌 **Project Contributions** → List of past projects.

---

## **⚙️ 10. Admin Panel**
### 📌 Purpose:
- Allows **admins** to manage users and projects.

### 🏗️ Structure:
- 📌 **User Management** → Block/unblock users.
- 📂 **Project Moderation** → Remove inappropriate projects.
- 🚨 **Report Handling** → View flagged content.

---

# 🔄 Navigation Flow
```plaintext
[ Landing Page ] ---> [ Register / Login ] ---> [ Dashboard ]
                             |
                             ├──> [ Project Details ]
                             ├──> [ Post a Project ]
                             ├──> [ Request Help ]
                             ├──> [ Messaging System ]
                             ├──> [ Profile Page ]
                             └──> [ Admin Panel (if Admin) ]
