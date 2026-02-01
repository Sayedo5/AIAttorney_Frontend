import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Save,
  X,
  ImageIcon,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCamera } from "@/hooks/useCamera";
import { useHaptics } from "@/hooks/useHaptics";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  bio: string;
  avatar: string | null;
}

interface ProfileEditScreenProps {
  onBack: () => void;
  initialData?: Partial<ProfileData>;
  onSave?: (data: ProfileData) => void;
}

export const ProfileEditScreen = ({ onBack, initialData, onSave }: ProfileEditScreenProps) => {
  const { toast } = useToast();
  const { takePhoto } = useCamera();
  const { impact, notification } = useHaptics();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: initialData?.name || "Advocate User",
    email: initialData?.email || "advocate@aiattorney.com",
    phone: initialData?.phone || "+92 300 1234567",
    location: initialData?.location || "Lahore, Pakistan",
    occupation: initialData?.occupation || "Legal Professional",
    bio: initialData?.bio || "Experienced advocate specializing in civil and corporate law.",
    avatar: initialData?.avatar || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarClick = async () => {
    await impact('light');
    setShowPhotoOptions(true);
  };

  const handleTakePhoto = async () => {
    setShowPhotoOptions(false);
    await impact('medium');
    const photo = await takePhoto({ source: 'camera', quality: 90 });
    if (photo) {
      setProfile(prev => ({ ...prev, avatar: photo }));
      await notification('success');
    }
  };

  const handleChooseFromGallery = async () => {
    setShowPhotoOptions(false);
    await impact('medium');
    const photo = await takePhoto({ source: 'photos', quality: 90 });
    if (photo) {
      setProfile(prev => ({ ...prev, avatar: photo }));
      await notification('success');
    }
  };

  const handleFileInput = () => {
    setShowPhotoOptions(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = async () => {
    await impact('medium');
    setProfile(prev => ({ ...prev, avatar: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await impact('medium');
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSave?.(profile);
    
    await notification('success');
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });

    setIsSubmitting(false);
    onBack();
  };

  const handleBackWithHaptic = async () => {
    await impact('light');
    onBack();
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    field, 
    type = "text",
    placeholder 
  }: { 
    icon: any; 
    label: string; 
    field: keyof ProfileData;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium text-foreground flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {label}
      </Label>
      <Input
        id={field}
        type={type}
        value={profile[field] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="bg-muted/30 border-border/50 focus:border-primary"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Photo Options Modal */}
      {showPhotoOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setShowPhotoOptions(false)}
        >
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-background rounded-t-3xl p-6 space-y-3"
          >
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-center text-foreground mb-4">Change Profile Photo</h3>
            
            <Button
              variant="outline"
              className="w-full h-14 justify-start gap-4 rounded-xl"
              onClick={handleTakePhoto}
            >
              <Camera className="w-5 h-5 text-primary" />
              Take Photo
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-14 justify-start gap-4 rounded-xl"
              onClick={handleChooseFromGallery}
            >
              <ImageIcon className="w-5 h-5 text-primary" />
              Choose from Gallery
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-14 justify-start gap-4 rounded-xl"
              onClick={handleFileInput}
            >
              <ImageIcon className="w-5 h-5 text-primary" />
              Upload from Device
            </Button>
            
            <Button
              variant="ghost"
              className="w-full h-14 rounded-xl text-muted-foreground"
              onClick={() => setShowPhotoOptions(false)}
            >
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBackWithHaptic}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <h1 className="text-xl font-semibold text-foreground">Edit Profile</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleAvatarClick}
              className="w-28 h-28 rounded-full bg-primary border-4 border-primary/30 flex items-center justify-center cursor-pointer overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300"
            >
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary-foreground">
                  {profile.name.split(" ").map(n => n.charAt(0).toUpperCase()).join("").slice(0, 2)}
                </span>
              )}
            </motion.div>
            
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
            </motion.button>

            {profile.avatar && (
              <motion.button
                type="button"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleRemoveAvatar}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="text-sm text-muted-foreground mt-3">
            Tap to change profile photo
          </p>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4 px-1">Personal Information</h3>
          <Card className="p-4 space-y-4">
            <InputField 
              icon={User} 
              label="Full Name" 
              field="name" 
              placeholder="Enter your full name"
            />
            <InputField 
              icon={Mail} 
              label="Email Address" 
              field="email" 
              type="email"
              placeholder="Enter your email"
            />
            <InputField 
              icon={Phone} 
              label="Phone Number" 
              field="phone" 
              type="tel"
              placeholder="Enter your phone number"
            />
          </Card>
        </motion.div>

        {/* Professional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4 px-1">Professional Information</h3>
          <Card className="p-4 space-y-4">
            <InputField 
              icon={MapPin} 
              label="Location" 
              field="location" 
              placeholder="City, Country"
            />
            <InputField 
              icon={Briefcase} 
              label="Occupation" 
              field="occupation" 
              placeholder="Your profession"
            />
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Bio
              </Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="bg-muted/30 border-border/50 focus:border-primary min-h-[100px] resize-none"
              />
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="pt-4"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};
