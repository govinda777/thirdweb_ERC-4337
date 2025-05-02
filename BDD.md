# Behavior-Driven Development (BDD) Documentation

## Project Overview
This project is a Next.js application that integrates with ThirdWeb for Web3 functionality, implementing ERC-4337 (Account Abstraction) standards.

## Local Development Stack

### Core Technologies
- **Next.js** (v13) - React framework for server-rendered applications
- **React** (v18.2) - JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript superset
- **ThirdWeb SDK** (v4.0.38) - Web3 development platform
- **Ethers.js** (v5.7.2) - Ethereum library for interacting with the blockchain

### Development Tools
- **Node.js** - JavaScript runtime
- **Yarn/NPM** - Package managers
- **ESLint** - Code linting
- **TypeScript** - Type checking and compilation

### Testing Stack
- **Cucumber.js** - BDD testing framework
- **Chai** - Assertion library
- **Puppeteer** - Headless browser for testing
- **@cucumber/pretty-formatter** - Test reporting

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher recommended)
- Yarn or NPM package manager
- Git

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Development Commands
- `yarn dev` - Start development server
- `yarn build` - Build production version
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run Cucumber tests
- `yarn test:report` - Run tests with HTML report generation

### Project Structure
```
├── components/     # React components
├── const/         # Constants and configurations
├── features/      # Cucumber feature files
├── lib/           # Library code
├── pages/         # Next.js pages
├── public/        # Static assets
├── src/           # Source code
├── styles/        # CSS styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Testing with Cucumber

### Writing Features
Features are written in Gherkin syntax and stored in the `features/` directory. Each feature file should:
- Describe a specific functionality
- Include scenarios with Given-When-Then steps
- Be clear and testable

### Running Tests
- Run all tests: `yarn test`
- Generate HTML report: `yarn test:report`

### Test Reports
Test reports are generated in HTML format and can be found in `cucumber-report.html` after running the report command.

## Best Practices
1. Write clear, testable feature files
2. Keep step definitions organized and reusable
3. Use TypeScript for type safety
4. Follow the project's ESLint configuration
5. Maintain consistent code formatting

## Troubleshooting
If you encounter issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify your Node.js version
4. Check the Cucumber.js configuration in `cucumber.js`
