# MoneyMgr - Personal Finance Tracking Application

## 📊 Overview

MoneyMgr is a modern, feature-rich personal finance management application built with Next.js and Material UI. It provides a comprehensive solution for tracking expenses and income, analyzing spending patterns, and exporting financial data for record-keeping.

![Transaction Dashboard](https://github.com/user-attachments/assets/a019d9b6-29ec-496b-a30f-208f7873665d)

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5, React 19.1
- **UI Library**: Material UI 7.3 with styled components
- **State Management**: React Query (TanStack Query)
- **Data Visualization**: Highcharts
- **Date Handling**: Day.js
- **Data Export**: jsPDF, jsPDF-autotable
- **Notifications**: React Hot Toast

## ✨ Features

### 💰 Transaction Management

- Add, edit, and delete financial transactions
- Categorize transactions with customizable categories and emojis
- Filter transactions by date, category, or transaction type
- Quick view of recent transactions with detailed information

### 📈 Financial Analysis

- Interactive charts powered by Highcharts
- Monthly and yearly expense breakdowns
- Category-wise spending analysis
- Toggle between income and expense views

![Analysis Dashboard](https://github.com/user-attachments/assets/7dbf82f1-dea1-456a-9b6c-b115ac4621a7)

### 🏷️ Category Management

- Create custom categories for better organization
- Separate income and expense categories
- Add emoji icons to categories for visual identification
- Manage and delete existing categories

![Category Management](https://github.com/user-attachments/assets/5d6b5b74-6814-4e54-bb55-9b669729796b)

### 📑 Data Export

- Export transactions as CSV or PDF
- Customizable date range for exports
- Properly formatted tables in PDF exports with jsPDF
- Preview transactions before exporting

![Export Functionality](https://github.com/user-attachments/assets/12c73b70-1e8a-408a-a584-e47e8ba4ec48)

## 🛠️ Installation and Setup

1. **Clone the repository**

   ```
   git clone https://github.com/RohanPrasadGupta/moneyMgr.git
   cd moneyMgr
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Start the development server**

   ```
   npm run dev
   ```

4. **Build for production**

   ```
   npm run build
   ```

5. **Start the production server**
   ```
   npm start
   ```

## 🧩 Project Structure

```
moneyMgr/
├── app/                    # Next.js application directory
│   ├── components/         # React components
│   │   ├── analysisComp/   # Data visualization components
│   │   ├── categoryComp/   # Category management components
│   │   ├── exportPage/     # Data export components
│   │   ├── header/         # Header components
│   │   ├── navbar/         # Navigation components
│   │   ├── transactions/   # Transaction management components
│   │   └── Homepage.jsx    # Main dashboard component
│   ├── constant/           # Constants and configuration
│   ├── pages/              # Page definitions
│   ├── services/           # API services and hooks
│   └── layout.js           # Root layout
├── public/                 # Static assets
├── next.config.mjs         # Next.js configuration
└── package.json            # Project dependencies
```

## 🌟 Key Features

### Smart Transaction Management

The app provides a comprehensive transaction management system with:

- Intelligent date-based grouping of transactions
- Real-time validation and feedback
- Smooth animations for a polished user experience

### Advanced Data Visualization

Leveraging Highcharts for sophisticated financial data visualization:

- Responsive charts that adapt to different screen sizes
- Interactive elements for exploring data points
- Consistent color scheme for better data interpretation

### Efficient Data Export

- PDF exports with proper emoji handling
- CSV exports with UTF-8 encoding for international character support
- Custom date range selection for targeted exports

## 🔮 Future Enhancements

- **Multi-currency Support**: Add capability to manage transactions in different currencies
- **Budget Planning**: Create budget goals and track progress
- **Recurring Transactions**: Set up automatic recurring transactions
- **Cloud Sync**: Synchronize data across multiple devices
- **Dark Mode**: Implement a full dark mode theme option

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Developed by [RohanPrasadGupta](https://github.com/RohanPrasadGupta)
