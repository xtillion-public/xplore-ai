# AI Mock Interview
This is a demo project for a mock interview application that uses AI to help students prepare for job interviews. Just upload a screenshot of your resume and AI will generate a series of timed questions to help you prepare for your next interview.

## Features

- **[TypeScript](https://www.typescriptlang.org/docs/)** - For type safety and improved developer experience
- **[Next.js](https://nextjs.org/docs)** - Full-stack React framework
- **[TailwindCSS](https://tailwindcss.com/docs)** - Utility-first CSS for rapid UI development
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable UI components
- **[Node.js](https://nodejs.org/docs/latest/api/)** - Runtime environment
- **[Turborepo](https://turbo.build/repo/docs)** - Optimized monorepo build system

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Git** (version 2.0 or higher)
  - Check if installed: `git --version`
  - Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

- **Node.js** (version 18.0 or higher)
  - Check if installed: `node --version`
  - Download: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
  - Node.js includes npm (Node Package Manager) which you'll need

- **npm** (comes with Node.js, version 9.0 or higher)
  - Check if installed: `npm --version`

- **A code editor** (optional but recommended)
  - [VS Code](https://code.visualstudio.com/) is a popular free choice

## Getting Started

### 1. Clone the Repository

First, open your terminal and clone this repository to your local machine:

```bash
git clone <repository-url>
```

Then navigate into the project directory:

```bash
cd ai-interview-demo
```

### 2. Set Up Environment Variables

Before running the application, you need to configure environment variables for both the server and web applications.

#### Server Environment Variables

1. Navigate to the server directory:
   ```bash
   cd apps/server
   ```

2. Create a `.env` file in the `apps/server` directory:
   ```bash
   touch .env
   ```

3. Open the `.env` file in your code editor and add the following:
   ```
   API_URL=<your-openai-api-url>
   API_KEY=<your-openai-api-key>
   CORS_ORIGIN=http://localhost:3001
   ```

   Replace `<your-openai-api-url>` and `<your-openai-api-key>` with your actual OpenAI API credentials. The `CORS_ORIGIN` allows the web application to communicate with the API server.

4. **How to get OpenAI API credentials:**
   - Go to [https://platform.openai.com/](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to the API section to get your API key and endpoint URL

#### Web Environment Variables

5. Navigate to the web directory:
   ```bash
   cd ../web
   ```

6. Create a `.env` file in the `apps/web` directory:
   ```bash
   touch .env
   ```

7. Open the `.env` file in your code editor and add the following:
   ```
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

   This tells the web application where to find the API server.

8. Navigate back to the project root:
   ```bash
   cd ../..
   ```

### 3. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This may take a few minutes as it downloads all necessary dependencies.

### 4. Run the Development Server

Start both the frontend and backend servers:

```bash
npm run dev
```

You should see output indicating that both servers are running.

### 5. Open the Application

Open your browser and navigate to:
- **Web Application**: [http://localhost:3001](http://localhost:3001)
- **API Server**: [http://localhost:3000](http://localhost:3000)

🎉 You're all set! The application should now be running on your local machine.







## Project Structure

```
my-better-t-app/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Next)
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps

## Need Help?

If you encounter any trouble running the application, have questions, or have suggestions on how to improve this project, feel free to reach out:

- **Email**: [psuau@xtillion.com](mailto:psuau@xtillion.com)
- **LinkedIn**: [Pedro Suau](https://www.linkedin.com/in/pedro-suau-92a578185/)

I'm happy to help and always open to feedback!

### Learn More About Xtillion

Want to learn more about what we're working on? Check out our insights and perspectives on AI, data strategy, and technology at [Xtillion's blog](https://www.xtillion.com/what-we-think).
