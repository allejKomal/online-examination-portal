# Exam Application

A modern, feature-rich examination application built with Next.js, TypeScript, and Redux Toolkit. This application provides a comprehensive platform for conducting online exams with support for both single-choice and multiple-choice questions.

## 🚀 Features

### Core Functionality

- **Question Management**: Support for single-choice and multiple-choice questions
- **Exam Interface**: Clean, intuitive exam-taking experience
- **Answer Tracking**: Real-time tracking of user responses
- **Question Navigation**: Easy navigation between questions
- **Mark for Review**: Ability to mark questions for later review

### User Experience

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components for a polished look
- **Real-time Updates**: Instant feedback and state management
- **Accessibility**: Keyboard navigation and screen reader support

### Technical Features

- **TypeScript**: Full type safety and better development experience
- **Redux Toolkit**: Efficient state management
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Component Library**: Reusable UI components

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd next
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Main exam dashboard
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Application sidebar
│   ├── nav-projects.tsx  # Navigation components
│   └── site-header.tsx   # Site header
├── store/                 # Redux store configuration
│   ├── exam-slice.ts     # Exam state management
│   └── store.ts          # Store configuration
├── types/                 # TypeScript type definitions
├── lib/                   # Utility functions and constants
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## 🎯 Usage

### Starting an Exam

1. Navigate to the dashboard
2. Choose between "Question-wise" or "All Questions" view
3. Answer questions using radio buttons (single choice) or checkboxes (multiple choice)
4. Use navigation controls to move between questions
5. Mark questions for review as needed

### Question Types

- **Single Choice**: Select one answer from multiple options
- **Multiple Choice**: Select multiple answers from available options

### Navigation

- **Previous/Next**: Navigate between questions sequentially
- **Save & Next**: Save current answer and move to next question
- **Mark for Review**: Flag questions for later review

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind CSS

The project uses Tailwind CSS with custom configuration. Modify `tailwind.config.js` for theme customization.

### Redux Store

Redux store configuration can be found in `store/store.ts`. Add new slices as needed for additional features.

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adaptive layout with optimized touch interactions
- **Mobile**: Mobile-first design with collapsible navigation

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

- Unit tests for components
- Integration tests for Redux slices
- E2E tests for critical user flows

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Configure build settings
3. Deploy automatically on push to main branch

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Next.js team** for the amazing framework
- **Redux Toolkit** for state management
- **Tailwind CSS** for the utility-first CSS approach

## 📞 Support

If you have any questions or need help:

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the maintainers directly

## 🔮 Roadmap

### Upcoming Features

- [ ] User authentication and authorization
- [ ] Exam timer and auto-submission
- [ ] Results analysis and reporting
- [ ] Question bank management
- [ ] Multi-language support
- [ ] Offline exam capability
- [ ] Advanced analytics dashboard

### Long-term Goals

- [ ] AI-powered question generation
- [ ] Adaptive testing algorithms
- [ ] Integration with LMS platforms
- [ ] Mobile app development
- [ ] Advanced proctoring features

---

**Made with ❤️ by the Exam Application Team**
