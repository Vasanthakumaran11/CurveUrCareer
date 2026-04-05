# Career Guidance Platform

A comprehensive web-based career guidance and decision-support system for students after 12th grade with Firebase Firestore integration.

## Features

- **5-Step Assessment Process**: Academic background, interest discovery, skills assessment, and career expectations
- **Smart Recommendations**: Multi-factor scoring algorithm (40% Academic, 30% Interest, 20% Skills, 10% Expectations)
- **Data Visualization**: Interactive charts showing interest profiles and skills assessment
- **College Recommendations**: Categorized into Dream, Realistic, and Safe options with Firebase data
- **PDF Reports**: Downloadable comprehensive career guidance reports
- **Firebase Integration**: Real-time data storage and retrieval with Firestore
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

## Firebase Setup

### Prerequisites

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database in your Firebase project
3. Set up Firestore security rules for development (allow read/write for testing)

### Firestore Security Rules (Development)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Environment Configuration

1. Copy your Firebase config from the Firebase console (Project Settings > General > Your apps)
2. Create a `.env` file in the project root with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Data Structure

The app expects the following Firestore collections:

- **assessments**: Stores user assessment results
- **colleges**: Stores college data for recommendations

## Getting Started

### Installation

```bash
# Navigate to project directory
cd career-guidance-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── gamification/    # Interactive assessment components
│   └── ...              # Other UI components
├── data/               # Local course, college, and career path data
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # Firebase service layer
├── utils/              # Utility functions
├── firebase.js         # Firebase configuration
├── index.css           # Global styles
└── main.jsx            # App entry point
```

## Firebase Integration Details

### Service Layer

The app uses a clean service layer architecture:

- **`src/firebase.js`**: Firebase configuration and initialization
- **`src/services/firestoreService.js`**: All database operations with error handling

### Data Flow

1. **Assessment Completion**: Results are saved to Firebase only after assessment completion
2. **College Data**: Fetched from Firebase on app load, falls back to local data
3. **Session Management**: localStorage for persistence, sessionStorage for temporary data
4. **Error Handling**: Graceful degradation when Firebase is unavailable

### Key Features

- **Async Operations**: All Firebase calls use async/await with try-catch
- **Validation**: Firebase config validation before initialization
- **Fallback**: App works without Firebase (local data only)
- **Performance**: Minimal database writes, optimized for cost

## Usage

1. **Start Assessment**: Click "Start Assessment" on the home page
2. **Complete Steps**: Fill out academic background, interests, skills, and expectations
3. **View Results**: Get personalized course and college recommendations
4. **Download Report**: Generate and download a PDF report

## Customization

- **Update Courses**: Edit `src/data/coursesData.js`
- **Update Colleges**: Edit `src/data/collegesData.js` or Firebase collection
- **Modify Scoring**: Adjust weights in `src/utils/scoringLogic.js`
- **Change Styling**: Update `tailwind.config.js`
- **Firebase Config**: Update `.env` file with your Firebase credentials

## Troubleshooting

### Common Firebase Issues

- **"Firebase App not initialized"**: Check `.env` file and Firebase config
- **"Missing or invalid API key"**: Verify API key in `.env` file
- **"Firestore permission denied"**: Check Firestore security rules
- **Network errors**: Ensure internet connection and Firebase project is active

### Development Mode

For development, Firestore rules allow all read/write operations. Update rules for production deployment.

## License

MIT

## Author

Built with ❤️ for students seeking career guidance
