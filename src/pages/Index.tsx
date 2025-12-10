import { MatrixRipple } from "@/components/ui/matrix-ripple";
import { Countdown } from "@/components/ui/countdown";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LeverSwitch } from "@/components/ui/lever-switch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const Index = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);
  const navigate = useNavigate();
  const { play, hasStarted, setHasStarted } = useAudio();

  // Reset state when component mounts (coming back to home)
  useEffect(() => {
    setCountdownComplete(false);
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    play();
  };

  return (
    <>
      <MatrixRipple />

      {/* Centered content */}
      <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.button
              key="play"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={handleStart}
              className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary transition-all duration-300 hover:bg-primary/30 hover:scale-110"
            >
              <Play size={40} fill="currentColor" />
            </motion.button>
          ) : !countdownComplete ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Countdown
                start={21}
                onComplete={() => setCountdownComplete(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pointer-events-auto"
            >
              <ShinyButton
                onClick={() => navigate('/pricing')}
                className="text-2xl px-8 py-4 text-foreground"
              >
                ;)
              </ShinyButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lever switch in bottom left - appears after countdown */}
      <AnimatePresence>
        {countdownComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <LeverSwitch onToggle={() => navigate('/secret')} hideButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
