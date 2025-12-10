import { Pricing } from "@/components/ui/pricing";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FancyButton from "@/components/ui/fancy-button";
import { FaInstagram, FaTelegram } from "react-icons/fa6";

const plans = [
  {
    name: "Student",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [";)"],
    description: "no refund faggots (its going to charity)",
    buttonText: "Escape now",
    href: "/",
    isPopular: false,
  },
  {
    name: "Council",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [";)", ";)"],
    description: "no refund faggots (its going to charity)",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "Warroom",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: ["???", "???", "???"],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
    isBlurred: true,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={24} />
        <span>Back</span>
      </button>

      {/* Social buttons above pricing */}
      <div className="flex justify-center gap-6 pt-8">
        <FancyButton
          icon={<FaInstagram size={28} className="text-pink-500" />}
          variant="pink"
          ariaLabel="Instagram"
          onClick={() => window.open('https://instagram.com', '_blank')}
        />
        <FancyButton
          icon={<FaTelegram size={28} className="text-blue-500" />}
          variant="blue"
          ariaLabel="Telegram"
          onClick={() => window.open('https://telegram.org', '_blank')}
        />
      </div>

      <Pricing
        plans={plans}
        title="A leader doesn't just survive the game. He makes the game survive him.."
      />
    </div>
  );
};

export default PricingPage;
