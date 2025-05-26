
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
