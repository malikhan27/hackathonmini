Here’s a well-structured and human-friendly **README** for your Event Management Application:

---

# Event Management App

Welcome to the **Event Management App** — a user-friendly platform that allows users to create events and manage participants, with an admin approval system to ensure everything stays organized and secure.

## Overview

This application enables users to:

* **Create Events** with key details like title, date, and description.
* **Submit Events for Admin Approval** — because only approved events can proceed to participant registration.
* **Add Participants** — but **only after the event is approved** by the admin.

Built using the modern React stack, this project is both developer-friendly and efficient in performance.

---

## Tech Stack

* **React** – Frontend Framework
* **Supabase** – Backend (Authentication, Database, Storage)
* **React Hook Form + Yup** – Form handling and validation
* **Context API** – Global state management
* **CopilotKit** – AI-enhanced developer experience (optional enhancement)

---

## How It Works

### 1. User Flow

* **Sign Up or Log In** as a user

  * Default user credentials for testing:

    * **Email**: `hello@mailinator.com`
    * **Password**: `234567`

* **Create an Event**

  * Fill out the event form using React Hook Form with Yup validation.
  * Once submitted, the event goes into a "Pending Approval" state.

* **Admin Approval**

  * Admin reviews and approves/rejects events.
  * Default admin credentials:

    * **Email**: `alikhancss27@gmail.com`
    * **Password**: `123456`

* **Add Participants**

  * Only after admin approval, participants can be added to the event.

---

## Key Features

* **Secure Authentication** with Supabase
* **Form Validation** using Yup & React Hook Form
* **Real-time Database Sync**
* **Admin Panel** to manage event approvals
* **Context API** for global state (authentication, user role, event status, etc.)
* **CopilotKit Integration** for potential AI-powered enhancements

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-management-app.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Supabase environment keys to `.env`

4. Run the app:

   ```bash
   npm start
   ```

---

## Notes

* You **cannot add participants until an event is approved** by the admin.
* Default credentials are only for demo/testing purposes.
* For production use, always ensure proper role-based access and security validations.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you'd like to include a demo image, deployment instructions, or a feature roadmap!
