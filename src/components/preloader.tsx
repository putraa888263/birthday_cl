import { motion } from "framer-motion";
import heartImg from "@/assets/heart.png";

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: 1,
          repeatType: "loop",
          repeatDelay: 0.5,
        }}
      >
        <img src={heartImg} alt="Loading..." width={80} height={80} className="opacity-80" />
      </motion.div>
    </motion.div>
  );
}
