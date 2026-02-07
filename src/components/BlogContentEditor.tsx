import { useRef, useCallback } from 'react';
import { Image, Link as LinkIcon, Heading1, Heading2, Heading3, Bold, Italic, List, ListOrdered } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  onUploadImage: (file: File) => Promise<string>;
  placeholder?: string;
  minHeight?: string;
}

/** Insert text at the current selection; returns new value and cursor position after insert */
function insertAtCursor(
  current: string,
  start: number,
  end: number,
  text: string
): { newValue: string; newCursor: number } {
  const before = current.slice(0, start);
  const after = current.slice(end);
  const newValue = before + text + after;
  const newCursor = start + text.length;
  return { newValue, newCursor };
}

/** Get start of the current line (for line-prefix insertions) */
function getLineStart(value: string, position: number): number {
  const lineStart = value.lastIndexOf('\n', position - 1);
  return lineStart === -1 ? 0 : lineStart + 1;
}

export default function BlogContentEditor({
  value,
  onChange,
  onUploadImage,
  placeholder = 'Write your blog or comparison content in **Markdown**…',
  minHeight = '280px',
}: BlogContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorAfterInsertRef = useRef<number | null>(null);

  const getSelection = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return { start: value.length, end: value.length };
    return { start: ta.selectionStart, end: ta.selectionEnd };
  }, [value.length]);

  const applyInsert = useCallback(
    (text: string) => {
      const { start, end } = getSelection();
      const { newValue, newCursor } = insertAtCursor(value, start, end, text);
      onChange(newValue);
      cursorAfterInsertRef.current = newCursor;
      setTimeout(() => {
        const ta = textareaRef.current;
        if (ta && cursorAfterInsertRef.current != null) {
          ta.focus();
          ta.setSelectionRange(cursorAfterInsertRef.current, cursorAfterInsertRef.current);
          cursorAfterInsertRef.current = null;
        }
      }, 0);
    },
    [value, onChange, getSelection]
  );

  const handleInsertImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const url = await onUploadImage(file);
        const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        applyInsert(`![${alt}](${url})`);
      } catch (err: any) {
        alert('Upload failed: ' + (err.message || err));
      }
    };
    input.click();
  };

  const handleInsertLink = () => {
    const text = prompt('Link text (what readers see):', 'Buy on Amazon');
    if (text == null) return; // user cancelled
    const url = prompt('Link URL (paste your affiliate link here):');
    if (url == null || url.trim() === '') return;
    const displayText = (text && text.trim()) || 'Buy on Amazon';
    applyInsert(`[${displayText}](${url.trim()})`);
  };

  /** Insert at start of current line (for headings, list markers) */
  const applyLinePrefix = useCallback(
    (prefix: string) => {
      const ta = textareaRef.current;
      const start = ta ? getLineStart(value, ta.selectionStart) : 0;
      const end = start;
      const { newValue, newCursor } = insertAtCursor(value, start, end, prefix);
      onChange(newValue);
      cursorAfterInsertRef.current = newCursor;
      setTimeout(() => {
        const el = textareaRef.current;
        if (el && cursorAfterInsertRef.current != null) {
          el.focus();
          el.setSelectionRange(cursorAfterInsertRef.current, cursorAfterInsertRef.current);
          cursorAfterInsertRef.current = null;
        }
      }, 0);
    },
    [value, onChange]
  );

  /** Wrap selection with markup, or insert placeholder if no selection */
  const applyWrap = useCallback(
    (before: string, after: string, placeholder: string) => {
      const { start, end } = getSelection();
      const selected = value.slice(start, end);
      const hasSelection = selected.length > 0;
      const text = hasSelection ? selected : placeholder;
      const newValue =
        value.slice(0, start) + before + text + after + value.slice(end);
      const newCursor = start + before.length + text.length + after.length;
      onChange(newValue);
      cursorAfterInsertRef.current = newCursor;
      setTimeout(() => {
        const el = textareaRef.current;
        if (el && cursorAfterInsertRef.current != null) {
          el.focus();
          if (hasSelection) {
            el.setSelectionRange(start + before.length, start + before.length + text.length);
          } else {
            el.setSelectionRange(newCursor, newCursor);
          }
          cursorAfterInsertRef.current = null;
        }
      }, 0);
    },
    [value, onChange, getSelection]
  );

  return (
    <div className="blog-content-editor">
      <div className="blog-content-editor-toolbar">
        <span className="blog-editor-toolbar-group" aria-label="Headings">
          <button type="button" onClick={() => applyLinePrefix('# ')} className="blog-editor-btn" title="Heading 1">
            <Heading1 size={18} />
            H1
          </button>
          <button type="button" onClick={() => applyLinePrefix('## ')} className="blog-editor-btn" title="Heading 2">
            <Heading2 size={18} />
            H2
          </button>
          <button type="button" onClick={() => applyLinePrefix('### ')} className="blog-editor-btn" title="Heading 3">
            <Heading3 size={18} />
            H3
          </button>
        </span>
        <span className="blog-editor-toolbar-group" aria-label="Formatting">
          <button type="button" onClick={() => applyWrap('**', '**', 'bold text')} className="blog-editor-btn" title="Bold">
            <Bold size={18} />
            Bold
          </button>
          <button type="button" onClick={() => applyWrap('*', '*', 'italic text')} className="blog-editor-btn" title="Italic">
            <Italic size={18} />
            Italic
          </button>
        </span>
        <span className="blog-editor-toolbar-group" aria-label="Lists">
          <button type="button" onClick={() => applyLinePrefix('- ')} className="blog-editor-btn" title="Bullet list">
            <List size={18} />
            List
          </button>
          <button type="button" onClick={() => applyLinePrefix('1. ')} className="blog-editor-btn" title="Numbered list">
            <ListOrdered size={18} />
            List #
          </button>
        </span>
        <span className="blog-editor-toolbar-group" aria-label="Insert">
          <button type="button" onClick={handleInsertImage} className="blog-editor-btn" title="Insert image">
            <Image size={18} />
            Image
          </button>
          <button type="button" onClick={handleInsertLink} className="blog-editor-btn" title="Insert link">
            <LinkIcon size={18} />
            Link
          </button>
        </span>
      </div>
      <textarea
        ref={textareaRef}
        className="blog-content-editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ minHeight }}
        spellCheck
      />
      {value.trim() && (
        <div className="blog-content-editor-preview">
          <span className="blog-content-editor-preview-label">Preview</span>
          <div className="blog-content-editor-preview-body">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
