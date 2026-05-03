# Clinic Admin Dashboard Guide

## Overview
The Clinic Admin Dashboard allows clinic administrators to manage their clinic's doctors, specialties, and respond to patient quote requests.

## Access
- **URL**: `/clinic-admin/login`
- **Credentials**: Use the clinic admin credentials provided when your clinic was registered

## Features

### 1. Dashboard Overview
- View total number of doctors
- Track pending and responded quote requests
- Quick access to add doctors
- Preview of recent doctors and quote requests

### 2. Doctor Management (`/clinic-admin/doctors`)
- **Add Doctor**: Click "+ Add Doctor" button
  - Required fields: First Name, Last Name, Specialty, Experience Years, Diploma
  - Optional fields: Photo URL, Biography
- **Edit Doctor**: Click "Edit" on any doctor row
- **Delete Doctor**: Click "Delete" on any doctor row (requires confirmation)

### 3. Specialty Management (`/clinic-admin/specialties`)
- View current specialties offered by your clinic
- Add new specialties from the available list
- Remove specialties from your clinic (requires confirmation)

### 4. Quote Requests (`/clinic-admin/quote-requests`)
- View all pending quote requests from patients
- See patient details: name, email, phone, country, date of birth
- View treatment description and specialty requested
- **Respond to Requests**:
  - Click "Respond" button
  - Enter estimated price (in TND)
  - Provide detailed message about treatment, timeline, etc.
  - Submit response

## Navigation
The sidebar provides quick access to all sections:
- **Overview**: Dashboard home
- **Doctors**: Manage clinic doctors
- **Specialties**: Manage clinic specialties
- **Quote Requests**: View and respond to patient inquiries

## User Profile
- View your name and role in the bottom left corner
- Click logout icon to sign out

## Tips
- Keep doctor information up-to-date with accurate experience and qualifications
- Respond to quote requests promptly to improve patient satisfaction
- Ensure your clinic offers relevant specialties for your services
- Use clear, professional language when responding to quote requests
