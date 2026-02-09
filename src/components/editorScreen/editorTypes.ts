// Editor Types

export interface EditorDocument {
  id: string;
  title: string;
  content: string;
  templateId?: string;
  status: "draft" | "final";
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorVersion {
  id: string;
  documentId: string;
  name: string;
  content: string;
  createdAt: Date;
  createdBy?: string;
}

export interface EditorState {
  document: EditorDocument | null;
  versions: EditorVersion[];
  currentVersionId?: string;
  isPreviewingVersion: boolean;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  isLoading: boolean;
}

export interface EditorActions {
  loadDocument: (id: string) => Promise<void>;
  saveDocument: () => Promise<void>;
  updateContent: (content: string) => void;
  createVersion: (name: string) => Promise<void>;
  previewVersion: (versionId: string) => void;
  restoreVersion: (versionId: string) => Promise<void>;
  exitVersionPreview: () => void;
}

export interface ToolbarFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  heading: "h1" | "h2" | "h3" | null;
  list: "bullet" | "number" | null;
  align: "left" | "center" | "right" | "justify";
}

export interface EditorCommand {
  type: string;
  value?: string | number;
}
