# Smart Drawing Analysis App

An interactive drawing application that analyzes hand-drawn content using Google's Gemini AI API. Features include real-time drawing, grid support, and intelligent analysis of drawings.

## Features

- Interactive canvas drawing
- Adjustable grid system with customizable size
- Real-time drawing analysis using Gemini AI
- Responsive design with sidebar tools
- Multiple color options and brush sizes
- Clear and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd drawing-analysis-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm start
```

## Deployment

1. Build the production version:
```bash
npm run build
```

2. The build folder will contain the production-ready files. You can deploy this to any static hosting service:

- Vercel: Simply connect your repository and Vercel will handle the build process
- Netlify: Connect repository or drag and drop the build folder
- GitHub Pages: Push the build folder to gh-pages branch

## Environment Variables

- `REACT_APP_GEMINI_API_KEY`: Your Google Gemini API key (required)

## Project Structure

```
drawing-analysis-app/
├── public/
├── src/
│   ├── components/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── .env
├── package.json
└── README.md
```

## Development

- Use `npm start` for development
- Run `npm test` for testing
- Use `npm run build` for production build

## Troubleshooting

If the grid is not working:
1. Ensure the grid toggle button is enabled
2. Check if gridSize value is being properly set
3. Verify that the canvas dimensions are calculated correctly
4. Clear the canvas and try drawing again

## License

MIT License
