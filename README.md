# ACTAtek Configurator

A React application for configuring ACTAtek models.
 
## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd ACTAtek-Configurator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

## Deployment

This project is configured to deploy automatically to **GitHub Pages** using GitHub Actions.

### Setup

1. Go to your repository **Settings** on GitHub.
2. Navigate to **Pages** (under Code and automation).
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow file `.github/workflows/deploy.yml` will handle the rest upon pushing to the `main` branch.

## Project Structure

- `src/`: Source code
- `public/`: Static assets
- `.github/workflows/`: CI/CD configurations
