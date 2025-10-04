'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Code, Heading1, Heading2, Heading3, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Minus, Quote, Redo, Strikethrough, Undo, } from 'lucide-react';
import { useState } from 'react';
export function RichTextEditor({ content = '', onChange, placeholder = 'Start writing your content...', className = '', }) {
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [isAddingImage, setIsAddingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Link.configure({
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder,
            }),
            Typography,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
            },
        },
    });
    if (!editor) {
        return null;
    }
    const addLink = () => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setIsAddingLink(false);
        }
    };
    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
            setIsAddingImage(false);
        }
    };
    const MenuButton = ({ onClick, isActive = false, disabled = false, children, }) => (_jsx(Button, { type: 'button', variant: isActive ? 'default' : 'ghost', size: 'sm', onClick: onClick, disabled: disabled, className: 'h-8 w-8 p-0', children: children }));
    return (_jsxs("div", { className: `border rounded-lg ${className}`, children: [_jsxs("div", { className: 'border-b p-2 flex flex-wrap items-center gap-1', children: [_jsxs("div", { className: 'flex items-center gap-1 border-r pr-2 mr-2', children: [_jsx(MenuButton, { onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), children: _jsx(Bold, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), children: _jsx(Italic, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), children: _jsx(Strikethrough, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code'), children: _jsx(Code, { className: 'h-4 w-4' }) })] }), _jsxs("div", { className: 'flex items-center gap-1 border-r pr-2 mr-2', children: [_jsx(MenuButton, { onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), children: _jsx(Heading1, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), children: _jsx(Heading2, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }), children: _jsx(Heading3, { className: 'h-4 w-4' }) })] }), _jsxs("div", { className: 'flex items-center gap-1 border-r pr-2 mr-2', children: [_jsx(MenuButton, { onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), children: _jsx(List, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), children: _jsx(ListOrdered, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), children: _jsx(Quote, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().setHorizontalRule().run(), children: _jsx(Minus, { className: 'h-4 w-4' }) })] }), _jsxs("div", { className: 'flex items-center gap-1 border-r pr-2 mr-2', children: [_jsx(MenuButton, { onClick: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo(), children: _jsx(Undo, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo(), children: _jsx(Redo, { className: 'h-4 w-4' }) })] }), _jsxs("div", { className: 'flex items-center gap-1', children: [_jsx(MenuButton, { onClick: () => setIsAddingLink(true), children: _jsx(LinkIcon, { className: 'h-4 w-4' }) }), _jsx(MenuButton, { onClick: () => setIsAddingImage(true), children: _jsx(ImageIcon, { className: 'h-4 w-4' }) })] })] }), isAddingLink && (_jsx("div", { className: 'border-b p-2 bg-gray-50', children: _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx(Label, { htmlFor: 'link-url', className: 'text-sm font-medium', children: "Link URL:" }), _jsx(Input, { id: 'link-url', value: linkUrl, onChange: e => setLinkUrl(e.target.value), placeholder: 'https://example.com', className: 'flex-1', onKeyDown: e => {
                                if (e.key === 'Enter') {
                                    addLink();
                                }
                                else if (e.key === 'Escape') {
                                    setIsAddingLink(false);
                                    setLinkUrl('');
                                }
                            } }), _jsx(Button, { size: 'sm', onClick: addLink, children: "Add" }), _jsx(Button, { size: 'sm', variant: 'outline', onClick: () => {
                                setIsAddingLink(false);
                                setLinkUrl('');
                            }, children: "Cancel" })] }) })), isAddingImage && (_jsx("div", { className: 'border-b p-2 bg-gray-50', children: _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx(Label, { htmlFor: 'image-url', className: 'text-sm font-medium', children: "Image URL:" }), _jsx(Input, { id: 'image-url', value: imageUrl, onChange: e => setImageUrl(e.target.value), placeholder: 'https://example.com/image.jpg', className: 'flex-1', onKeyDown: e => {
                                if (e.key === 'Enter') {
                                    addImage();
                                }
                                else if (e.key === 'Escape') {
                                    setIsAddingImage(false);
                                    setImageUrl('');
                                }
                            } }), _jsx(Button, { size: 'sm', onClick: addImage, children: "Add" }), _jsx(Button, { size: 'sm', variant: 'outline', onClick: () => {
                                setIsAddingImage(false);
                                setImageUrl('');
                            }, children: "Cancel" })] }) })), _jsx(EditorContent, { editor: editor })] }));
}
//# sourceMappingURL=rich-text-editor.js.map