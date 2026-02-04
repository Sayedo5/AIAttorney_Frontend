import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  FileText, 
  ChevronRight,
  ArrowLeft,
  X,
  Download,
  Copy,
  Check
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { drafterCategories, drafterTemplates as baseTemplates, DrafterTemplate, TemplateField } from "@/data/drafterTemplates";
import { newPakistaniTemplates } from "@/data/newDrafterTemplates";

// Merge all templates
const drafterTemplates = [...baseTemplates, ...newPakistaniTemplates];
import appIcon from "@/assets/app-icon.png";

interface DrafterScreenProps {
  onBack?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
}

export function DrafterScreen({ onBack, onSettingsClick, onNotificationsClick }: DrafterScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<DrafterTemplate | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return drafterTemplates.filter(template => {
      const matchesCategory = activeCategory === "all" || template.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleSelectTemplate = (template: DrafterTemplate) => {
    setSelectedTemplate(template);
    setFieldValues({});
    setGeneratedDocument(null);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleGenerateDocument = () => {
    if (!selectedTemplate) return;

    // Check required fields
    const missingFields = selectedTemplate.fields
      .filter(field => field.required && !fieldValues[field.id])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    // Generate document by replacing placeholders
    let document = selectedTemplate.content;
    Object.entries(fieldValues).forEach(([key, value]) => {
      document = document.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    // Remove any remaining unfilled placeholders
    document = document.replace(/{{[^}]+}}/g, '____________');

    setGeneratedDocument(document);
    toast({
      title: "Document Generated",
      description: "Your document has been generated successfully!",
    });
  };

  const handleCopyDocument = async () => {
    if (!generatedDocument) return;
    await navigator.clipboard.writeText(generatedDocument);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Document copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocument = () => {
    if (!generatedDocument || !selectedTemplate) return;
    
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Document saved to your device",
    });
  };

  const handleBack = () => {
    if (generatedDocument) {
      setGeneratedDocument(null);
    } else if (selectedTemplate) {
      setSelectedTemplate(null);
      setFieldValues({});
    } else if (onBack) {
      onBack();
    }
  };

  // Template List View
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header 
          title="Drafter"
          showBack={!!onBack}
          onBack={onBack}
          onSettingsClick={onSettingsClick}
          onNotificationsClick={onNotificationsClick}
        />

        {/* Search Section */}
        <section className="px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
              {drafterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Templates List */}
        <section className="px-4 pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Templates ({filteredTemplates.length})
              </h3>
            </div>

            <div className="space-y-2">
              {filteredTemplates.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => handleSelectTemplate(template)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/20 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {template.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {template.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              ))}

              {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No templates found</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-xs text-primary mt-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  // Document Preview View
  if (generatedDocument) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header 
          title={selectedTemplate.title}
          showBack
          onBack={handleBack}
          rightAction={
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyDocument}
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-foreground" />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDownloadDocument}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
              >
                <Download className="w-5 h-5 text-primary-foreground" />
              </motion.button>
            </div>
          }
        />

        <section className="px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-4"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <img src={appIcon} alt="AI Attorney" className="w-10 h-10" />
              <div>
                <h3 className="font-semibold text-foreground">{selectedTemplate.title}</h3>
                <p className="text-xs text-muted-foreground">Generated Document</p>
              </div>
            </div>
            
            <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-secondary/30 p-4 rounded-xl overflow-auto max-h-[60vh]">
              {generatedDocument}
            </pre>
          </motion.div>
        </section>

        <section className="px-4 pt-4">
          <Button
            onClick={() => setGeneratedDocument(null)}
            variant="outline"
            className="w-full"
          >
            Edit Fields
          </Button>
        </section>
      </div>
    );
  }

  // Template Form View
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={selectedTemplate.title}
        showBack
        onBack={handleBack}
      />

      {/* Template Info */}
      <section className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{selectedTemplate.title}</h3>
              <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Form Fields */}
      <section className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Fill in the details</h3>
          
          <div className="space-y-4">
            {selectedTemplate.fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Label htmlFor={field.id} className="text-sm text-muted-foreground mb-1.5 block">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.id}
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    className="min-h-[80px] bg-secondary/50"
                  />
                ) : field.type === 'select' ? (
                  <Select
                    value={fieldValues[field.id] || ''}
                    onValueChange={(value) => handleFieldChange(field.id, value)}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    className="bg-secondary/50"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Generate Button */}
      <section className="px-4 pt-4">
        <Button
          onClick={handleGenerateDocument}
          className="w-full bg-gradient-to-r from-primary to-primary-glow"
        >
          Generate Document
        </Button>
      </section>
    </div>
  );
}
