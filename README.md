# Globopersona - Marketing Automation Platform

A modern, professional marketing and automation platform built with React.js and Vite. This application provides a clean, responsive UI for managing marketing campaigns, contacts, and analytics.

## 🎯 Project Overview

This project is a **frontend UI redesign** of a marketing automation platform, based on the Globopersona project requirements. It demonstrates professional UI/UX design, responsive layouts, and modern web development practices.

### Key Features

✅ **Professional Dashboard** - Overview with key metrics and recent campaigns  
✅ **Campaign Management** - Create, edit, and monitor marketing campaigns  
✅ **Contact Management** - Manage audience segments and contact lists  
✅ **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices  
✅ **Modern UI/UX** - Clean interface with smooth animations and intuitive navigation  
✅ **Mock Data** - Client-side data management (no backend required)  

## 📋 Technical Requirements Met

- ✅ **Framework**: React.js with Vite
- ✅ **Styling**: Vanilla CSS with modern design system
- ✅ **Component Architecture**: Reusable, maintainable components
- ✅ **Responsive Design**: Desktop-first approach with mobile breakpoints
- ✅ **Clean Code**: Well-structured folder organization and readable code
- ✅ **SEO Best Practices**: Meta tags, semantic HTML, proper heading hierarchy

## 🎨 Pages Implemented

### 1. Dashboard
- Key performance metrics (Total Campaigns, Active Contacts, Open Rate, Click Rate)
- Recent campaigns table with status indicators
- Quick action cards for common tasks

### 2. Campaigns List
- Searchable and filterable campaign list
- Status badges (Active, Completed, Scheduled, Draft)
- Campaign metrics (Audience size, Opens, Clicks, Budget)
- Action buttons (View, Edit, Delete)

### 3. Campaign Create/Edit Form
- Multi-section form with validation
- Basic Information section
- Audience & Targeting section
- Schedule & Budget section
- Form actions (Save as Draft, Create/Update Campaign)

### 4. Contacts List
- Contact overview with stats
- Search and filter functionality
- Segment badges (Premium, New, Returning, Inactive)
- Contact management actions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd c:\Projects\React\Assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173` or `http://localhost:5174`)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📁 Project Structure

```
Assignment/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Header.jsx            # Top header bar
│   │   ├── Header.css
│   │   ├── Dashboard.jsx         # Dashboard page
│   │   ├── Campaigns.jsx         # Campaigns list page
│   │   ├── CampaignForm.jsx      # Campaign create/edit form
│   │   └── Contacts.jsx          # Contacts list page
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css                   # Layout and component styles
│   ├── index.css                 # Design system and utilities
│   └── main.jsx                  # App entry point
├── index.html                    # HTML template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- Buttons (Primary, Secondary, Outline, Danger)
- Badges (Success, Warning, Danger, Info, Primary)
- Form Elements (Input, Select, Textarea)
- Cards, Tables, Stats Cards
- Empty States

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1024px and above (default)
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Mobile Features
- Collapsible sidebar with hamburger menu
- Stacked stat cards
- Horizontal scrolling tables
- Touch-friendly buttons and controls

## 🎯 Navigation

The application uses client-side routing with the following pages:
- **Dashboard** - Main overview
- **Campaigns** - Campaign list and management
- **Create Campaign** - New campaign form
- **Edit Campaign** - Edit existing campaign
- **Contacts** - Contact list and management
- **Reports** - (Placeholder)
- **Insights** - (Placeholder)
- **Settings** - (Placeholder)
- **Help & Support** - (Placeholder)

## 🛠️ Technologies Used

- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool and dev server
- **Vanilla CSS** - Styling with custom properties
- **Google Fonts (Inter)** - Typography

## 📝 Code Quality

- **Component-based architecture** for reusability
- **CSS custom properties** for consistent theming
- **Semantic HTML** for accessibility
- **Clean folder structure** for maintainability
- **Responsive utilities** for adaptive layouts

## 🌟 Highlights

### UX/UI Excellence
- **Smooth animations** and hover effects
- **Intuitive navigation** with active state indicators
- **Clear visual hierarchy** with proper spacing
- **Professional color scheme** with good contrast
- **Consistent component design** across pages

### Functionality
- **Search and filter** capabilities
- **CRUD operations** (Create, Read, Update, Delete)
- **Form validation** and user feedback
- **Empty states** for better user guidance
- **Mobile-optimized** interactions

## 🎥 Demo Videos

Browser interaction recordings are saved in the artifacts directory showing:
- Dashboard navigation
- Campaigns page with data table
- Campaign creation form
- Mobile responsive design with sidebar

## 📄 License

This is a demonstration project created for the Globopersona UI Redesign Assessment.

## 👨‍💻 Developer

Created as part of the Frontend UI Redesign Assessment.

---

**Note**: This is a frontend-only application with mock data. All data is stored in component state and localStorage. For a production application, you would integrate with a real backend API.
