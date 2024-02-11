import cc from "classcat";
import { motion, AnimatePresence } from "framer-motion";
import { HTMLAttributes } from "react";

export default function Modal({
  opened,
  close,
  children,
  ...props
}: {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-8"
          onClick={() => close()}
        >
          <motion.div
            className={cc(["w-full bg-base-100", props.className])}
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
