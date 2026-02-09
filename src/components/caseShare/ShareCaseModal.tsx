import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link, Mail, Copy, Check, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ShareCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  caseTitle: string;
  onShare: (options: ShareOptions) => Promise<{ shareLink: string }>;
}

interface ShareOptions {
  caseId: string;
  emails: string[];
  expiresInDays: number;
  allowDownload: boolean;
}

export function ShareCaseModal({
  isOpen,
  onClose,
  caseId,
  caseTitle,
  onShare,
}: ShareCaseModalProps) {
  const { toast } = useToast();
  const [emails, setEmails] = useState("");
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [allowDownload, setAllowDownload] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const emailList = emails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      
      const result = await onShare({
        caseId,
        emails: emailList,
        expiresInDays,
        allowDownload,
      });
      
      setShareLink(result.shareLink);
      toast({
        title: "Case shared successfully",
        description: emailList.length
          ? `Shared with ${emailList.length} recipient(s)`
          : "Share link generated",
      });
    } catch (error) {
      toast({
        title: "Failed to share",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copied to clipboard" });
  };

  const handleClose = () => {
    setEmails("");
    setShareLink("");
    setCopied(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Share Case
                  </h2>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {caseTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {shareLink ? (
                <div className="space-y-3">
                  <Label>Share Link</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl border border-border">
                      <Link className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground truncate">
                        {shareLink}
                      </span>
                    </div>
                    <button
                      onClick={copyLink}
                      className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This link will expire in {expiresInDays} days
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="emails">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Share via Email (Optional)
                    </Label>
                    <Input
                      id="emails"
                      placeholder="Enter emails separated by commas"
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expires">Link Expires In</Label>
                    <select
                      id="expires"
                      value={expiresInDays}
                      onChange={(e) => setExpiresInDays(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-foreground"
                    >
                      <option value={1}>1 day</option>
                      <option value={7}>7 days</option>
                      <option value={30}>30 days</option>
                      <option value={90}>90 days</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <Label htmlFor="download" className="cursor-pointer">
                      Allow Download
                    </Label>
                    <Switch
                      id="download"
                      checked={allowDownload}
                      onCheckedChange={setAllowDownload}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border">
              {shareLink ? (
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSharing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Generating Link...
                    </>
                  ) : (
                    <>
                      <Link className="w-5 h-5" />
                      Generate Share Link
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
