'use client';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start writing your content...',
  className = '',
}: RichTextEditorProps) {
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

  const MenuButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          >
            <Strikethrough className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
          >
            <Code className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive('heading', { level: 1 })}
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive('heading', { level: 3 })}
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1">
          <MenuButton onClick={() => setIsAddingLink(true)}>
            <LinkIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton onClick={() => setIsAddingImage(true)}>
            <ImageIcon className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Link Dialog */}
      {isAddingLink && (
        <div className="border-b p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <Label htmlFor="link-url" className="text-sm font-medium">
              Link URL:
            </Label>
            <Input
              id="link-url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  addLink();
                } else if (e.key === 'Escape') {
                  setIsAddingLink(false);
                  setLinkUrl('');
                }
              }}
            />
            <Button size="sm" onClick={addLink}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsAddingLink(false);
                setLinkUrl('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {isAddingImage && (
        <div className="border-b p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <Label htmlFor="image-url" className="text-sm font-medium">
              Image URL:
            </Label>
            <Input
              id="image-url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  addImage();
                } else if (e.key === 'Escape') {
                  setIsAddingImage(false);
                  setImageUrl('');
                }
              }}
            />
            <Button size="sm" onClick={addImage}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsAddingImage(false);
                setImageUrl('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
