import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  opened,
  close,
  children,
}: {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/30"
          onClick={() => close()}
        >
          <motion.div
            className="bg-base-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
