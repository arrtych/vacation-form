# Vacation Request Submission Web App

This is a simple React-based web application designed to allow employees to submit vacation requests. The app automatically calculates vacation dates based on the user's input and lists all submitted vacation requests for the current user.

## Features

Vacation Requests:

- Submit a vacation request with start date, end date, vacation days, and an optional comment.
- Automatically calculate the end date when a start date and number of vacation days are entered.
- Automatically calculate the number of vacation days when a start and end date are provided.
- List all submitted vacation requests on the index page.

Business Logic:

- Dynamic recalculation of start and end dates when any vacation details change.
- Prevent invalid vacation requests (e.g., negative vacation days or start date after the end date).

## Technologies Used

- Frontend: ReactJS (with React Hooks)
- UI Components: Material UI
- React Context API
- JSON Server

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js

#### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/arrtych/vacation-form.git

   ```

2. **Navigate to the project directory**:
   ```bash
    cd vacation-form
   ```
3. **Install dependencies**:
   ```bash
    npm install
   ```

#### Usage

1. **Start the development server**:

   ```bash
    npm run dev
   ```

2. **Access the app**:
   Open your browser and navigate to http://localhost:3000.
