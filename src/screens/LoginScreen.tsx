import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Scale } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

interface LoginScreenProps {
  onLogin: () => void;
  onSignupClick: () => void;
  onForgotPasswordClick: () => void;
}

export function LoginScreen({ onLogin, onSignupClick, onForgotPasswordClick }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    const result = loginSchema.safeParse({ email, password });
    
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header with Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-br from-primary to-primary-glow px-6 py-8 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
        >
          <Scale className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <h1 className="text-2xl font-display font-bold text-primary-foreground">
          AI Attorney
        </h1>
        <p className="text-primary-foreground/80 text-sm mt-1">
          The Ultimate AI Co-Counsel
        </p>
      </motion.div>

      {/* Form Section */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm mx-auto"
        >
          <h2 className="text-xl font-display font-bold text-foreground text-center mb-1">
            Welcome Back!
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Please sign in to your account.
          </p>

          {/* Social Login */}
          <motion.button
            onClick={onLogin}
            className="w-full py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center gap-3"
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-foreground text-sm font-medium">Continue with Google</span>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <div className="space-y-4">
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
                className={`w-full px-4 py-3 rounded-xl bg-secondary border transition-colors text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-destructive ring-1 ring-destructive" : "border-border"
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {errors.email}
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
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-secondary border transition-colors text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? "border-destructive ring-1 ring-destructive" : "border-border"
                  }`}
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
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button 
                onClick={onForgotPasswordClick}
                className="text-sm text-primary font-medium hover:text-primary-glow transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25"
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground pt-2">
              Don't have an account?{" "}
              <button 
                onClick={onSignupClick}
                className="text-primary font-semibold hover:text-primary-glow transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
