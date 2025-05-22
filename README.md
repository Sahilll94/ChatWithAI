# ChatWithAI - A Modern Gemini AI Chat Interface
ChatWithAI is a modern, responsive web application that provides an intuitive interface for interacting with Google's Gemini AI. Built with React and Vite, it offers a clean, user-friendly experience with features like chat history, dark mode, and code syntax highlighting.

## Features

- 🎨 **Modern UI/UX Design**
  - Clean and intuitive interface
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Beautiful card-based interaction system

- 🌓 **Dark/Light Mode**
  - Toggle between dark and light themes
  - Persistent theme preference
  - Smooth theme transitions

- 💬 **Chat Features**
  - Real-time conversation with Gemini AI
  - Markdown and code syntax support
  - Chat history with timestamp
  - Ability to create and manage multiple chat sessions

- 💾 **Data Persistence**
  - Local storage for chat history
  - Theme preference saving
  - Session management

- 🎯 **Smart Features**
  - Code block formatting with syntax highlighting
  - Markdown rendering
  - Smart conversation handling
  - Loading animations and visual feedback

## Technologies Used

- React 18
- Vite
- Google Generative AI SDK
- CSS3 with Modern Features
- Local Storage API
- Highlight.js for code syntax highlighting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd ChatWithAI
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file in the root directory and add your Gemini API key:
\`\`\`
VITE_API_KEY=your_gemini_api_key_here
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:5173`

## Usage

1. **Starting a New Chat**
   - Click the "+" button in the sidebar to start a new chat
   - Type your message in the input box at the bottom
   - Press Enter or click the send button to get a response

2. **Managing Chats**
   - View chat history in the sidebar
   - Click on any previous chat to continue the conversation
   - Delete unwanted chats with the delete button

3. **Theme Switching**
   - Toggle between light and dark modes using the theme switch
   - Your preference will be saved for future visits

4. **Code and Markdown**
   - The app automatically formats code blocks
   - Supports markdown formatting for better readability
   - Syntax highlighting for various programming languages

## Project Structure

\`\`\`
ChatWithAI/
├── src/
│   ├── Components/          # React components
│   │   ├── Main/           # Main chat interface
│   │   └── SideBar/        # Sidebar navigation
│   ├── Context/            # React context for state management
│   ├── config/             # Configuration files
│   └── assets/             # Images and icons
├── public/                 # Public assets
└── package.json           # Project dependencies
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Google's Gemini AI API
- UI/UX inspired by modern chat applications
- Special thanks to the React and Vite communities

## Contact

For any questions or suggestions, please contact the developer through:
[Contact Form](https://sahilfolio.live/#contact)

---
Made with ❤️ by Sahil
