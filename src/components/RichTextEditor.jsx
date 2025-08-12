import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './RichTextEditor.css'

const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[100px] p-3 border border-gray-300 rounded-md',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </button>
        <div className="toolbar-divider"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
        >
          1. List
        </button>
        <div className="toolbar-divider"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
        >
          H3
        </button>
        <div className="toolbar-divider"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="toolbar-btn"
          disabled={!editor.can().chain().focus().undo().run()}
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="toolbar-btn"
          disabled={!editor.can().chain().focus().redo().run()}
        >
          ↷
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
