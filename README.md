# Professional CV Builder

A modern, feature-rich CV/Resume builder application built with React and Vite. Create professional, ATS-friendly resumes with drag-and-drop functionality, image uploads, and multiple export formats.

![CV Builder](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 📝 **Complete CV Management**
- **Personal Information**: Full contact details, profile summary, and social links
- **Work Experience**: Detailed job history with descriptions and dates
- **Education**: Academic background with GPA and additional information
- **Skills**: Technical, language, and soft skills with tag-based organization
- **Projects**: Portfolio projects with technologies and links
- **Certifications**: Professional certifications and credentials

### 🎨 **Professional Templates**
- **Modern Template**: Clean, contemporary design with gradient headers
- **Classic Template**: Traditional, professional layout with serif fonts
- **Minimal Template**: Clean, focused design with optimal white space

### 📸 **Image Upload & Management**
- Profile photo upload with preview
- Image optimization and cropping
- Support for JPG, PNG, GIF formats
- 5MB file size limit with validation

### 📤 **Multiple Export Formats**
- **PDF Export**: High-quality PDF generation with proper formatting
- **HTML Export**: Standalone HTML file with embedded styles
- **JSON Export**: Save and load CV data for backup/sharing

### 🎯 **ATS-Friendly Design**
- Applicant Tracking System compatible layouts
- Clean, readable formatting
- Proper heading hierarchy
- Optimized for automated parsing

### 💾 **Data Persistence**
- Automatic save to localStorage
- Real-time preview updates
- Data validation and error handling
- Import/export functionality

### 📱 **Responsive Design**
- Mobile-friendly interface
- Tablet and desktop optimization
- Flexible grid layouts
- Touch-friendly controls

### 🌍 **Internationalization**
- **Multi-language Support**: Full Swedish and English language support
- **Dynamic Language Switching**: Switch between languages with a single click
- **Comprehensive Translation**: All UI elements, forms, and templates translated
- **Browser Language Detection**: Automatic language detection based on browser settings

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd cv-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server

### Key Libraries
- **html2pdf.js** - Client-side PDF generation
- **react-hook-form** - Form validation and management
- **lucide-react** - Beautiful icon library
- **react-i18next** - Internationalization framework
- **i18next** - Translation management
- **file-saver** - File download functionality
- **file-saver** - File download functionality
- **@dnd-kit** - Drag and drop interactions

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Dev Server** - Hot module replacement
- **CSS Modules** - Scoped styling

## 📋 Usage Guide

### 1. **Personal Information**
- Upload a professional profile photo
- Fill in contact details and social links
- Write a compelling professional summary

### 2. **Work Experience**
- Add multiple positions with detailed descriptions
- Use bullet points for achievements
- Include employment dates and locations
- Mark current positions appropriately

### 3. **Education**
- Add degrees, institutions, and dates
- Include GPA if beneficial
- Add relevant coursework or honors

### 4. **Skills**
- Organize skills by category (Technical, Languages, Soft Skills)
- Add skills one at a time using the input fields
- Remove skills by clicking the × on skill tags

### 5. **Projects**
- Showcase personal and professional projects
- Include technology stacks and project URLs
- Describe impact and achievements

### 6. **Certifications**
- Add professional certifications and licenses
- Include issuing organizations and dates
- Provide verification links when available

### 7. **Templates & Export**
- Choose from Modern, Classic, or Minimal templates
- Preview changes in real-time
- Export as PDF for applications
- Save HTML version for web portfolios

## 🎨 Customization

### Template Styling
Each template uses different design approaches:

- **Modern**: Gradient headers, colorful skill tags, contemporary typography
- **Classic**: Traditional black borders, serif fonts, formal layout
- **Minimal**: Clean typography, generous white space, grid-based layout

### Theme Colors
Templates use customizable color schemes defined in the CV context:
- Primary Color: Main accent color
- Accent Color: Secondary highlight color
- Text Color: Main text color
- Background Color: Background color

## 📱 Responsive Behavior

- **Desktop (1024px+)**: Side-by-side editor and preview
- **Tablet (768px-1024px)**: Stacked layout with preview on top
- **Mobile (<768px)**: Single column with optimized touch interactions

## 🔧 Advanced Features

### Form Validation
- Required field validation
- Email format validation
- URL format validation
- File size and type validation

### Data Management
- Automatic localStorage persistence
- JSON import/export
- Real-time sync between forms and preview
- Undo/redo functionality (planned)

### Export Options
- **PDF**: Optimized for printing and digital sharing
- **HTML**: Self-contained file with embedded CSS
- **JSON**: Raw data for backup and migration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed description
3. Include screenshots and error messages

## 🚧 Roadmap

- [ ] Drag and drop section reordering
- [ ] Additional template designs
- [ ] Custom color themes
- [ ] Multi-language support
- [ ] Cloud storage integration
- [ ] Collaborative editing
- [ ] Word document export
- [ ] LinkedIn import functionality

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- PDF generation by [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Built with ❤️ for job seekers worldwide**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
