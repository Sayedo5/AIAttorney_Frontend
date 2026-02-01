import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Scale } from "lucide-react";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().trim().min(1, "Phone number is required").min(10, "Please enter a valid phone number"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface SignupScreenProps {
  onSignup: () => void;
  onLoginClick: () => void;
  onTermsClick?: () => void;
}

export function SignupScreen({ onSignup, onLoginClick, onTermsClick }: SignupScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; password?: string; confirmPassword?: string; agreeTerms?: string }>({});

  const handleSubmit = () => {
    const result = signupSchema.safeParse({ name, email, phone, password, confirmPassword, agreeTerms });
    
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors;
        if (field) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    // On successful signup, redirect to login
    onLoginClick();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding (hidden on mobile/tablet) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden xl:flex w-[45%] bg-gradient-to-br from-primary to-primary-glow flex-col items-center justify-center p-12 relative"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8"
        >
          <Scale className="w-12 h-12 text-primary-foreground" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">
          AI Attorney
        </h1>
        <p className="text-primary-foreground/80 text-center max-w-xs">
          The Ultimate AI Co-Counsel
        </p>
        <div className="flex items-center gap-2 mt-6 text-primary-foreground/60 text-sm">
          <span>INSTANT</span>
          <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <span>ACCURATE</span>
          <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <span>SECURE</span>
        </div>
        <p className="mt-8 text-primary-foreground/60 text-sm flex items-center gap-2">
          ⚡ Powered by 400k case laws and statutes
        </p>
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Scrollable content area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
          {/* Mobile/Tablet Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="xl:hidden w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6"
          >
            <Scale className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-2">
              Create Account
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Join thousands of legal professionals
            </p>

            {/* Social Signup */}
            <motion.button
              onClick={onSignup}
              className="w-full py-3 rounded-2xl border border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-foreground">Continue with Google</span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Enter your full name"
                  className={`input-modern ${errors.name ? "border-destructive ring-1 ring-destructive" : ""}`}
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="Enter your email"
                  className={`input-modern ${errors.email ? "border-destructive ring-1 ring-destructive" : ""}`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="Enter your phone number"
                  className={`input-modern ${errors.phone ? "border-destructive ring-1 ring-destructive" : ""}`}
                />
                {errors.phone && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Create a password"
                    className={`input-modern pr-12 ${errors.password ? "border-destructive ring-1 ring-destructive" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    placeholder="Confirm your password"
                    className={`input-modern pr-12 ${errors.confirmPassword ? "border-destructive ring-1 ring-destructive" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Password Strength */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          password.length >= i * 3
                            ? password.length >= 12
                              ? "bg-green-500"
                              : password.length >= 8
                              ? "bg-yellow-500"
                              : "bg-red-500"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {password.length >= 12
                      ? "Strong password"
                      : password.length >= 8
                      ? "Good password"
                      : "Use 8+ characters"}
                  </p>
                </motion.div>
              )}

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                    }}
                    className="w-4 h-4 rounded border-border bg-card text-primary focus:ring-primary mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <button type="button" onClick={onTermsClick} className="text-primary hover:text-primary-glow transition-colors">Terms of Service</button>
                    {" "}and{" "}
                    <button type="button" onClick={onTermsClick} className="text-primary hover:text-primary-glow transition-colors">Privacy Policy</button>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive mt-1.5">
                    {errors.agreeTerms}
                  </motion.p>
                )}
              </div>

              {/* Signup Button */}
              <motion.button
                onClick={handleSubmit}
                className="w-full btn-primary-gradient py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <button 
                  onClick={onLoginClick}
                  className="text-primary font-semibold hover:text-primary-glow transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
