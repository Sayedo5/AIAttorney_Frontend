import { useEffect, useRef, useState } from "react";

interface EditorWebViewProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export function EditorWebView({
  initialContent = "",
  onChange,
  placeholder = "Start typing your document...",
}: EditorWebViewProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!initialContent);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
      setIsEmpty(false);
    }
  }, [initialContent]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || "";
      setIsEmpty(!textContent.trim());
      onChange?.(content);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="relative min-h-[calc(100vh-180px)] p-4">
      {isEmpty && (
        <div className="absolute top-4 left-4 right-4 pointer-events-none text-muted-foreground">
          {placeholder}
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="min-h-full outline-none text-foreground prose prose-sm max-w-none"
        style={{
          lineHeight: 1.8,
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
