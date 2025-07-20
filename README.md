# 🧮 Advanced Calculator

A modern, feature-rich calculator built with React, TypeScript, and Tailwind CSS. This calculator provides both basic arithmetic operations and advanced mathematical functions including trigonometry, logarithms, and power operations.

![Calculator Preview](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Project Goals

- **Modern UI/UX**: Clean, responsive design with smooth animations and visual feedback
- **Advanced Mathematics**: Support for scientific calculations including trigonometry, logarithms, and power functions
- **Operation History**: Track and display calculation history with the ability to clear it
- **Type Safety**: Full TypeScript implementation for better code reliability and developer experience
- **Responsive Design**: Works seamlessly across different screen sizes and devices
- **Performance**: Optimized React components with efficient state management

## ✨ Features

### Basic Operations
- ✅ Addition, Subtraction, Multiplication, Division
- ✅ Decimal point support
- ✅ Clear (C) and Delete (DEL) functions
- ✅ Real-time calculation display

### Advanced Functions
- ✅ Square root (√)
- ✅ Logarithm base 10 (log)
- ✅ Natural logarithm (ln)
- ✅ Square (x²)
- ✅ Power function (x^y)
- ✅ Trigonometric functions (sin, cos, tan)
- ✅ Mathematical constants (π, e)

### User Experience
- ✅ Operation history with scrollable interface
- ✅ Error handling for invalid operations
- ✅ Keyboard-friendly interface
- ✅ Responsive grid layout
- ✅ Custom scrollbar styling

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.0 | Frontend framework for building user interfaces |
| **TypeScript** | ~5.8.3 | Type-safe JavaScript superset |
| **Vite** | ^7.0.4 | Fast build tool and development server |
| **Tailwind CSS** | ^4.1.11 | Utility-first CSS framework for styling |
| **ESLint** | ^9.30.1 | Code linting and quality assurance |

### Development Dependencies
- **@vitejs/plugin-react**: ^4.6.0 - React plugin for Vite
- **@types/react**: ^19.1.8 - TypeScript definitions for React
- **@types/react-dom**: ^19.1.6 - TypeScript definitions for React DOM
- **typescript-eslint**: ^8.35.1 - TypeScript ESLint integration
- **autoprefixer**: ^10.4.21 - PostCSS plugin for vendor prefixes

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the calculator in action.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint for code quality
```

## 📁 Project Structure

```
my-calculator/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Button.tsx        # Reusable button component
│   │   └── Display.tsx       # Calculator display component
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application-specific styles
│   ├── index.css            # Global styles and Tailwind imports
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite environment types
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
├── vite.config.ts           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## 🎨 Component Architecture

### [`App.tsx`](src/App.tsx)
The main application component that manages:
- Calculator state (input, operations, history)
- Button click handlers
- Mathematical operation logic
- History management

### [`Button.tsx`](src/components/Button.tsx)
Reusable button component featuring:
- Customizable styling through className props
- Click event handling
- TypeScript interface for type safety

### [`Display.tsx`](src/components/Display.tsx)
Calculator display component that:
- Shows current input/result
- Handles text overflow with proper styling
- Responsive text sizing

## 🧪 Mathematical Functions

The calculator implements various mathematical operations:

```typescript
// Basic operations: +, -, *, /
// Advanced functions:
sqrt(x)    // Square root
log(x)     // Base-10 logarithm
ln(x)      // Natural logarithm  
x^2        // Square
x^y        // Power function
sin(x°)    // Sine (degrees)
cos(x°)    // Cosine (degrees)
tan(x°)    // Tangent (degrees)
π          // Pi constant
e          // Euler's number
```

## 🎯 Future Enhancements

- [ ] Keyboard input support
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] History export functionality
- [ ] Themes and customization options
- [ ] Unit conversion features
- [ ] Graph plotting capabilities
- [ ] Scientific notation display

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the lightning-fast build tool
- TypeScript team for bringing type safety to JavaScript

---

**Made with ❤️ using React + TypeScript + Vite**

-----------------------------------------------------------------


MIT License

Copyright (c) 2025, Dr. Vagner Zeizer Carvalho Paes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.