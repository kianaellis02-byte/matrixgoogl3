import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Star, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlasmaCursor } from "@/components/ui/plasma-cursor";

const SecretPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Plasma cursor background */}
      <div className="fixed inset-0 z-0">
        <PlasmaCursor />
      </div>

      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={24} />
        <span>Back</span>
      </button>

      <div className="container py-20 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            uhhhh👀
          </h2>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
            }}
            className="rounded-2xl border-primary border-2 p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative max-w-md w-full"
          >
            <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
              <Star className="text-primary-foreground h-4 w-4 fill-current" />
              <span className="text-primary-foreground ml-1 font-semibold">
                Secret
              </span>
            </div>

            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                Warroom
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  $3333
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / year
                </span>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                billed annually
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {["Everything", "Absolute power", "No limits"].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-left text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4 border-border" />

              <a
                href="https://buy.stripe.com/4gM9AV8N60zp1Pef2q9sk0f"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                  "bg-primary text-primary-foreground"
                )}
              >
                Contact Team
              </a>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                For those who found the secret, no refund faggots (its going to charity)
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-xs text-muted-foreground">NDA required</span>
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecretPage;
