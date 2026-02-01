# Career Guidance Platform

A comprehensive web-based career guidance and decision-support system for students after 12th grade.

## Features

- **5-Step Assessment Process**: Academic background, interest discovery, skills assessment, and career expectations
- **Smart Recommendations**: Multi-factor scoring algorithm (40% Academic, 30% Interest, 20% Skills, 10% Expectations)
- **Data Visualization**: Interactive charts showing interest profiles and skills assessment
- **College Recommendations**: Categorized into Dream, Realistic, and Safe options
- **PDF Reports**: Downloadable comprehensive career guidance reports
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
# Navigate to project directory
cd career-guidance-platform

# Install dependencies (if not already installed)
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
├── data/               # Course, college, and career path data
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── utils/              # Utility functions
└── index.css           # Global styles
```

## Usage

1. **Start Assessment**: Click "Start Assessment" on the home page
2. **Complete Steps**: Fill out academic background, interests, skills, and expectations
3. **View Results**: Get personalized course and college recommendations
4. **Download Report**: Generate and download a PDF report

## Customization

- **Update Courses**: Edit `src/data/coursesData.js`
- **Update Colleges**: Edit `src/data/collegesData.js`
- **Modify Scoring**: Adjust weights in `src/utils/scoringLogic.js`
- **Change Styling**: Update `tailwind.config.js`

## License

MIT

## Author

Built with ❤️ for students seeking career guidance
