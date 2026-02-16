import { useState, useCallback } from "react";
import { ArrowLeft, Save, MoreVertical, Eye, History, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorToolbar } from "@/components/editorScreen/EditorToolbar";
import { EditorWebView } from "@/components/editorScreen/EditorWebView";
import { VersionDrawer } from "@/components/editorScreen/VersionDrawer";
import { ChatInterface } from "@/components/editorScreen/ChatInterface";
import { useEditorState } from "@/components/hooks/useEditorState";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface EditorScreenProps {
  onBack?: () => void;
  documentId?: string;
  templateId?: string;
}

export default function EditorScreen({ onBack, documentId, templateId }: EditorScreenProps) {
  const { toast } = useToast();
  const [showVersions, setShowVersions] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditorState({
    onSave: async (doc) => {
      // API call placeholder
      toast({ title: "Saved", description: "Document saved successfully." });
    },
    onVersionCreate: async (version) => {
      toast({ title: "Version Created", description: `"${version.name}" saved.` });
    },
  });

  const handleContentChange = useCallback(
    (content: string) => {
      editor.updateContent(content);
    },
    [editor]
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2 bg-card border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate max-w-[180px]">
              {editor.document?.title || "Untitled Document"}
            </p>
            {editor.hasUnsavedChanges && (
              <p className="text-[10px] text-orange-500">Unsaved changes</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPreview(!isPreview)}
            className={isPreview ? "text-primary" : ""}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.saveDocument()}
            disabled={!editor.hasUnsavedChanges || editor.isSaving}
          >
            <Save className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowVersions(true)}>
                <History className="h-4 w-4 mr-2" /> Version History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowChat(true)}>
                <MessageSquare className="h-4 w-4 mr-2" /> AI Assistant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Toolbar */}
      {!isPreview && <EditorToolbar onAction={(action) => console.log("toolbar:", action)} />}

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorWebView
          initialContent={editor.document?.content || ""}
          onChange={handleContentChange}
          placeholder="Start drafting your legal document..."
        />
      </div>

      {/* Version Drawer */}
      {showVersions && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowVersions(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Versions</span>
              <Button variant="ghost" size="icon" onClick={() => setShowVersions(false)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <VersionDrawer
              versions={editor.versions}
              currentVersionId={editor.currentVersionId}
              onPreview={editor.previewVersion}
              onRestore={editor.restoreVersion}
            />
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <ChatInterface
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        onSendMessage={async (msg) => `AI response to: ${msg}`}
      />
    </div>
  );
}
