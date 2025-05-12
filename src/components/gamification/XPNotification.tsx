
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface XPNotificationProps {
  amount: number;
  reason?: string;
  onComplete?: () => void;
}

export function XPNotification({ amount, reason, onComplete }: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-white shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Zap className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-lg font-bold">+{amount} XP</span>
            {reason && <span className="text-xs">{reason}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
