import { type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";
import { Snackbar } from "../../../components/ui/Snackbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import type { SnackbarData } from "./types";

interface QueueItem extends SnackbarData {
  id: number;
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const idRef = useRef(0);

  const showSnackbar = (options: SnackbarData) => {
    const id = ++idRef.current;
    const newItem: QueueItem = { ...options, id };
    setQueue((prev) => [newItem, ...prev]);

    const duration = options.duration ?? 30000;
    setTimeout(() => hideSnackbar(id), duration);
  };

  const hideSnackbar = (id: number) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <div className="snackbar-container">
        <AnimatePresence initial={false}>
          {queue.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              layout
            >
              <Snackbar
                title={item.title}
                message={item.message}
                addMessage={item.addMessage}
                mode={item.mode}
                onClose={() => hideSnackbar(item.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SnackbarContext.Provider>
  );
};
