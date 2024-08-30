# Real Estate Platform Frontend

Welcome to the frontend repository of the Real Estate Platform. This application provides a user-friendly interface for browsing property listings, managing user accounts, and navigating through various features related to real estate.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview

The Real Estate Platform frontend is designed to interact with the backend services to provide a seamless experience for users looking to buy or rent properties. It includes features for user authentication, property listings, and role-based access control, all built with Angular and styled with Tailwind CSS.

## Features

- **User Authentication**: Sign in and out with token-based authentication.
- **Property Listings**: View detailed listings of properties, including images and descriptions.
- **Role-Based Access Control**: Different user roles (e.g., admins and interns) with specific access rights.
- **Responsive Design**: Modern and responsive UI using Tailwind CSS.
- **Dynamic Navigation**: Navigation based on user authentication status.

## Technology Stack

- **Frontend**: Angular
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **HTTP Client**: Angular's HttpClient

## Screenshots

1. **Home Page**

![Homepage Screenshot](https://firebasestorage.googleapis.com/v0/b/portifolio-mathews.appspot.com/o/ilandpropertyhome.jpg?alt=media&token=7b966419-0ba8-4d91-9ee0-1231fcbf907c)

2. **Property details page**;

![prorty deatils Screenshot](https://firebasestorage.googleapis.com/v0/b/portifolio-mathews.appspot.com/o/property%20deatils.jpg?alt=media&token=09b00d06-7e63-4271-b581-9a955409de7c)

3. **Login page**;

![login page Screenshot](https://firebasestorage.googleapis.com/v0/b/portifolio-mathews.appspot.com/o/login.jpg?alt=media&token=92020818-5b69-4b8f-93c3-7dfa84daf121)

## Installation

To get started with the frontend application, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/real-estate-frontend.git
   cd real-estate-frontend

   ```

2. **Install Dependencies**:

   ```bash
   npm install

   ```

3. **Run application**;

   ```bash
   ng serve
   ```

## Configuration

**API Base URL**: Update the base URL for API requests in src/environments/environment.ts.
**Authentication\*\***: Ensure the authentication service is properly configured to match the backend setup.

## Usage

1. **Login**: Use the login form to authenticate users. On successful login, a JWT token will be stored and used for subsequent API requests.
2. **View Properties**: Browse the property listings and view details of each property.
3. **Role-Based Access**: Navigate the application based on user roles and permissions.
