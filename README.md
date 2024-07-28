# 💰 Expense Tracker

Welcome to the Budgeting App! This application helps you manage your expenses, create budgets, save for your goals, and analyze your spending habits. It's built with a modern stack including React, Next.js, and Chart.js for data visualization.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **💸 Record Transactions:** Easily add and categorize your expenses.
- **📊 Create Budgets:** Set budgets for different categories and track your spending against them.
- **📈 Analyze Spending Habits:** Visualize your expenses with charts and graphs.
- **📅 Progress Tracking:** Monitor your budgeting progress and stay on track with your financial goals.
- **🎯 Save for Goals:** Set savings goals and track your progress towards achieving them.
- **🔍 Expense Breakdown:** Get a detailed breakdown of your spending by category.
- **📆 Monthly Trends:** Analyze your spending patterns over time with monthly trends.

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/alvinbengeorge/expense-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd expense-tracker
    ```
3. Install the dependencies:
    ```bash
    pip3 install -r requirements.txt
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    DB_URI=your_mongodb_uri
    DB_NAME=expense-tracker
    SECRET=your_secret
    ```

### Frontend

1. Navigate to the project directory:
    ```bash
    cd client
    ```
2. Install the dependencies:
    ```bash
    pnpm i
    ```
3. Create a `.env.local` file in the root directory and add your environment variables:
    ```env
    NEXT_PUBLIC_API_URL=your_api_url
    ```
4. Run build:
    ```bash
    pnpm build
    ```

## Usage

1. Start the backend server:
    ```bash
    uvicorn main:app --host=0.0.0.0 --port=8000 --workers 4
    ```
2. Start the development server:
    ```bash
    pnpm start 
    ```
3. Open your browser and navigate to `https://yourdomain.com`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License
