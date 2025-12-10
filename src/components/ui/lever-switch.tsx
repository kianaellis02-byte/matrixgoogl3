import { cn } from "@/lib/utils";

interface LeverSwitchProps {
  className?: string;
  onToggle?: () => void;
  hideButton?: boolean;
}

export const LeverSwitch = ({ className, onToggle, hideButton = false }: LeverSwitchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && onToggle) {
      setTimeout(onToggle, 300);
    }
  };

  return (
    <div className={cn("toggle-container", className)}>
      <style>{`
        .toggle-container {
          --toggle-width: 60px;
          --toggle-height: 100px;
          --handle-width: 30px;
          --handle-height: 50px;
          position: relative;
          width: var(--toggle-width);
          height: var(--toggle-height);
        }

        .toggle-input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 10;
        }

        .toggle-handle-wrapper {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: var(--handle-width);
          height: var(--handle-height);
          transition: transform 0.3s ease;
          transform-origin: center bottom;
        }

        .toggle-input:checked ~ .toggle-handle-wrapper {
          transform: translateX(-50%) rotate(30deg);
        }

        .toggle-input:not(:checked) ~ .toggle-handle-wrapper {
          transform: translateX(-50%) rotate(-30deg);
        }

        .toggle-handle {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .toggle-handle-knob {
          width: 20px;
          height: 20px;
          background: linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)/80%) 100%);
          border-radius: 50%;
          box-shadow: 0 2px 8px hsl(var(--primary)/40%);
        }

        .toggle-handle-bar-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .toggle-handle-bar {
          width: 6px;
          height: 100%;
          background: linear-gradient(180deg, hsl(var(--muted-foreground)) 0%, hsl(var(--muted)) 100%);
          border-radius: 3px;
        }

        .toggle-base {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 25px;
          background: hsl(var(--muted));
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-base-inside {
          width: 30px;
          height: 15px;
          background: hsl(var(--background));
          border-radius: 3px;
          box-shadow: inset 0 2px 4px hsl(var(--foreground)/20%);
        }

        .toggle-base-hidden {
          display: none;
        }
      `}</style>

      <input className="toggle-input" type="checkbox" onChange={handleChange} />
      <div className="toggle-handle-wrapper">
        <div className="toggle-handle">
          <div className="toggle-handle-knob"></div>
          <div className="toggle-handle-bar-wrapper">
            <div className="toggle-handle-bar"></div>
          </div>
        </div>
      </div>
      <div className={cn("toggle-base", hideButton && "toggle-base-hidden")}>
        <div className="toggle-base-inside"></div>
      </div>
    </div>
  );
};
