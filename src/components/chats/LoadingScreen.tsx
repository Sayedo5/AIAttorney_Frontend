// Loading Screen Component
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-muted-foreground text-sm"
      >
        {message}
      </motion.p>
    </div>
  );
}

// Skeleton loader for chat messages
export function ChatSkeleton() {
  return (
    <div className="space-y-4 px-4 py-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`flex gap-3 ${i % 2 === 0 ? 'justify-end' : ''}`}>
          <div className={`space-y-2 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-3xl skeleton-pulse ${i % 2 === 0 ? 'rounded-br-lg' : 'rounded-bl-lg'}`}>
              <div className={`h-16 ${i % 2 === 0 ? 'w-48' : 'w-64'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
