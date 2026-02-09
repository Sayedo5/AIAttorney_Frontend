import { useState, useCallback } from "react";

interface Version {
  id: string;
  documentId: string;
  name: string;
  content: string;
  createdAt: Date;
  createdBy?: string;
}

interface UseVersionsOptions {
  documentId: string;
  onSave?: (version: Version) => Promise<void>;
  onRestore?: (version: Version) => Promise<void>;
}

export function useVersions(options: UseVersionsOptions) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVersionId, setCurrentVersionId] = useState<string | undefined>();

  const loadVersions = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Fetch versions from API
      await new Promise((resolve) => setTimeout(resolve, 500));
      // setVersions(fetchedVersions);
    } finally {
      setIsLoading(false);
    }
  }, [options.documentId]);

  const createVersion = useCallback(
    async (name: string, content: string) => {
      const version: Version = {
        id: Date.now().toString(),
        documentId: options.documentId,
        name,
        content,
        createdAt: new Date(),
      };

      await options.onSave?.(version);
      setVersions((prev) => [version, ...prev]);
      return version;
    },
    [options]
  );

  const previewVersion = useCallback((versionId: string) => {
    setCurrentVersionId(versionId);
  }, []);

  const restoreVersion = useCallback(
    async (versionId: string) => {
      const version = versions.find((v) => v.id === versionId);
      if (!version) return;

      await options.onRestore?.(version);
      setCurrentVersionId(undefined);
    },
    [versions, options]
  );

  const exitPreview = useCallback(() => {
    setCurrentVersionId(undefined);
  }, []);

  const currentVersion = versions.find((v) => v.id === currentVersionId);
  const isPreviewingVersion = !!currentVersionId;

  return {
    versions,
    currentVersion,
    currentVersionId,
    isPreviewingVersion,
    isLoading,
    loadVersions,
    createVersion,
    previewVersion,
    restoreVersion,
    exitPreview,
  };
}
