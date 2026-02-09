import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface ToolbarAction {
  id: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

interface EditorToolbarProps {
  onAction: (action: string) => void;
  activeFormats?: string[];
}

const formatActions: ToolbarAction[] = [
  { id: "bold", icon: Bold, label: "Bold" },
  { id: "italic", icon: Italic, label: "Italic" },
  { id: "underline", icon: Underline, label: "Underline" },
  { id: "strikethrough", icon: Strikethrough, label: "Strikethrough" },
];

const headingActions: ToolbarAction[] = [
  { id: "h1", icon: Heading1, label: "Heading 1" },
  { id: "h2", icon: Heading2, label: "Heading 2" },
  { id: "h3", icon: Heading3, label: "Heading 3" },
];

const listActions: ToolbarAction[] = [
  { id: "bullet-list", icon: List, label: "Bullet List" },
  { id: "number-list", icon: ListOrdered, label: "Numbered List" },
  { id: "quote", icon: Quote, label: "Quote" },
];

const alignActions: ToolbarAction[] = [
  { id: "align-left", icon: AlignLeft, label: "Align Left" },
  { id: "align-center", icon: AlignCenter, label: "Align Center" },
  { id: "align-right", icon: AlignRight, label: "Align Right" },
  { id: "align-justify", icon: AlignJustify, label: "Justify" },
];

const historyActions: ToolbarAction[] = [
  { id: "undo", icon: Undo, label: "Undo" },
  { id: "redo", icon: Redo, label: "Redo" },
];

export function EditorToolbar({ onAction, activeFormats = [] }: EditorToolbarProps) {
  const renderActionGroup = (actions: ToolbarAction[]) => (
    <div className="flex items-center gap-1">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAction(action.id)}
          className={`p-2 rounded-lg transition-colors ${
            activeFormats.includes(action.id)
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground hover:text-foreground"
          }`}
          title={action.label}
        >
          <action.icon className="w-4 h-4" />
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="sticky top-14 z-30 bg-background border-b border-border overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 px-4 py-2 min-w-max">
        {renderActionGroup(historyActions)}
        <div className="w-px h-6 bg-border" />
        {renderActionGroup(formatActions)}
        <div className="w-px h-6 bg-border" />
        {renderActionGroup(headingActions)}
        <div className="w-px h-6 bg-border" />
        {renderActionGroup(listActions)}
        <div className="w-px h-6 bg-border" />
        {renderActionGroup(alignActions)}
      </div>
    </div>
  );
}
