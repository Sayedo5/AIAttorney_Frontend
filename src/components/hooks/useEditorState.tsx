import { useState, useCallback, useRef } from "react";
import type { EditorDocument, EditorVersion, EditorState } from "../editorScreen/editorTypes";

interface UseEditorStateOptions {
  onSave?: (document: EditorDocument) => Promise<void>;
  onVersionCreate?: (version: EditorVersion) => Promise<void>;
}

export function useEditorState(options: UseEditorStateOptions = {}) {
  const [state, setState] = useState<EditorState>({
    document: null,
    versions: [],
    currentVersionId: undefined,
    isPreviewingVersion: false,
    hasUnsavedChanges: false,
    isSaving: false,
    isLoading: false,
  });

  const originalContentRef = useRef<string>("");

  const loadDocument = useCallback(async (doc: EditorDocument) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    originalContentRef.current = doc.content;
    setState((prev) => ({
      ...prev,
      document: doc,
      isLoading: false,
      hasUnsavedChanges: false,
    }));
  }, []);

  const updateContent = useCallback((content: string) => {
    setState((prev) => {
      if (!prev.document) return prev;
      const hasChanges = content !== originalContentRef.current;
      return {
        ...prev,
        document: { ...prev.document, content },
        hasUnsavedChanges: hasChanges,
      };
    });
  }, []);

  const saveDocument = useCallback(async () => {
    if (!state.document || state.isSaving) return;

    setState((prev) => ({ ...prev, isSaving: true }));

    try {
      await options.onSave?.(state.document);
      originalContentRef.current = state.document.content;
      setState((prev) => ({
        ...prev,
        isSaving: false,
        hasUnsavedChanges: false,
        document: prev.document
          ? { ...prev.document, updatedAt: new Date() }
          : null,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, isSaving: false }));
      throw error;
    }
  }, [state.document, state.isSaving, options]);

  const createVersion = useCallback(
    async (name: string) => {
      if (!state.document) return;

      const version: EditorVersion = {
        id: Date.now().toString(),
        documentId: state.document.id,
        name,
        content: state.document.content,
        createdAt: new Date(),
      };

      await options.onVersionCreate?.(version);
      setState((prev) => ({
        ...prev,
        versions: [version, ...prev.versions],
      }));
    },
    [state.document, options]
  );

  const previewVersion = useCallback((versionId: string) => {
    const version = state.versions.find((v) => v.id === versionId);
    if (!version || !state.document) return;

    setState((prev) => ({
      ...prev,
      document: { ...prev.document!, content: version.content },
      currentVersionId: versionId,
      isPreviewingVersion: true,
    }));
  }, [state.versions, state.document]);

  const restoreVersion = useCallback(
    async (versionId: string) => {
      const version = state.versions.find((v) => v.id === versionId);
      if (!version || !state.document) return;

      setState((prev) => ({
        ...prev,
        document: { ...prev.document!, content: version.content },
        currentVersionId: undefined,
        isPreviewingVersion: false,
        hasUnsavedChanges: true,
      }));
    },
    [state.versions, state.document]
  );

  const exitVersionPreview = useCallback(() => {
    setState((prev) => ({
      ...prev,
      document: prev.document
        ? { ...prev.document, content: originalContentRef.current }
        : null,
      currentVersionId: undefined,
      isPreviewingVersion: false,
    }));
  }, []);

  return {
    ...state,
    loadDocument,
    updateContent,
    saveDocument,
    createVersion,
    previewVersion,
    restoreVersion,
    exitVersionPreview,
  };
}
