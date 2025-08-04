# Copilot Instructions for CV Builder Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern CV/Resume Builder application built with React and Vite. The application allows users to create professional resumes with drag-and-drop functionality, image uploads, and multiple export formats.

## Tech Stack
- **Frontend**: React 18 with Vite
- **PDF Export**: html2pdf.js, jsPDF, html2canvas
- **Drag & Drop**: @dnd-kit/core and @dnd-kit/sortable
- **Forms**: react-hook-form for form validation
- **Icons**: lucide-react
- **File Operations**: file-saver

## Key Features
1. **Templates**: Professional, ATS-friendly CV templates
2. **Image Upload**: Profile photo upload with preview
3. **Export Formats**: PDF, HTML, Word document export
4. **Drag & Drop**: Reorderable sections and items
5. **Real-time Preview**: Live preview of CV changes
6. **Responsive Design**: Works on desktop and mobile
7. **Form Validation**: Client-side validation for all inputs

## Code Style Guidelines
- Use functional components with React hooks
- Follow ES6+ syntax and modern JavaScript practices
- Use CSS modules or styled-components for styling
- Implement proper error handling and loading states
- Ensure accessibility (a11y) compliance
- Write clean, readable, and maintainable code
- Use TypeScript-style JSDoc comments for documentation

## Component Structure
- Keep components small and focused on single responsibility
- Use custom hooks for shared logic
- Implement proper prop validation
- Follow React best practices for performance optimization

## Special Considerations
- Ensure PDF export maintains formatting and styling
- Optimize images for web performance
- Implement proper file size validation for uploads
- Make templates easily customizable and extensible
- Ensure ATS (Applicant Tracking System) compatibility
