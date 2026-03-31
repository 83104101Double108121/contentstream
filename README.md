# Content Filter App

A React + Redux based content filtering application with search, filtering, infinite scroll, and sorting features.

## 📦 Dependencies

### Core Dependencies
- ✅ **react** (^18.2.0) - React core library
- ✅ **react-dom** (^18.2.0) - React DOM rendering
- ✅ **react-scripts** (^5.0.1) - Create React App scripts
- ✅ **@reduxjs/toolkit** (^1.9.7) - Redux state management
- ✅ **react-redux** (^8.1.3) - React Redux binding
- ✅ **react-router-dom** (^7.13.2) - React routing library
- ✅ **styled-components** (^6.1.1) - CSS-in-JS styling library
- ✅ **react-infinite-scroll-component** (^6.1.0) - Infinite scroll component
- ✅ **react-loading-skeleton** (^3.4.0) - Skeleton loading component


## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.20.2
- npm >= 10.8.2

### Install Node.js with NVM (Recommended)

**What is NVM?**
NVM (Node Version Manager) allows you to install and manage multiple Node.js versions easily.

**Install NVM:**
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Windows
# Download and install from: https://github.com/coreybutler/nvm-windows/releases

# After installation, restart your terminal
```

**Install Node.js with NVM:**
```bash
# Install Node.js 20 (LTS)
nvm install 20

# Use Node.js 20
nvm use 20

# Set Node.js 20 as default
nvm alias default 20

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

**Alternative: Direct Installation**
If you prefer not to use NVM, you can download Node.js directly from:
- Official website: https://nodejs.org
- Download Node.js 20.x LTS version

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

The app will start at http://localhost:3000


## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ContentItem.js   # Individual content item component
│   ├── ContentsFilter.js # Price filter component
│   ├── ContentsList.js   # Content list with infinite scroll
│   ├── SearchBar.js      # Search input component
│   ├── SortBy.js         # Sort dropdown component
│   └── ContentPage.js    # Main page component
├── store/               # Redux state management
│   └── contentFilterSlice.js # Content filtering state
├── constants/           # Constants definitions
│   └── pricingOptions.js # Pricing options constants
├── utils/               # Utility functions
│   └── urlStateManager.js # URL state management
├── backend/             # API interface
│   └── api.js          # Data fetching API
├── App.js              # App root component
└── index.js           # App entry point
```

## 🎯 Technology Choices

### React Ecosystem
- **React 18.2.0**: Leveraging the latest concurrent features for improved application performance and user experience
- **Create React App**: Zero-configuration development environment for rapid project setup with built-in Webpack and Babel toolchain

### State Management
- **Redux Toolkit 1.9.7**: Modern Redux solution that reduces boilerplate code by 70% compared to traditional Redux, includes createSlice and createAsyncThunk with built-in best practices
- **React Redux 8.1.3**: Official React Redux binding providing modern Hooks API (useSelector, useDispatch) for seamless component integration

### Styling Solution
- **Styled Components 6.1.1**: CSS-in-JS solution offering component-level style encapsulation, dynamic styling capabilities, and theme system that perfectly aligns with React component architecture

### Feature Components
- **React Infinite Scroll Component 6.1.0**: Specialized infinite scroll implementation with mature scroll detection, loading state management, and comprehensive error handling
- **React Loading Skeleton 3.4.0**: Professional skeleton component providing modern loading experience that reduces perceived loading time compared to traditional spinners

### Routing Management
- **React Router Dom 7.13.2**: Most mature routing solution in React ecosystem, prepared for future feature expansion (detail pages, settings, etc.)
