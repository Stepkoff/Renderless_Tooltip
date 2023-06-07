import React, { useLayoutEffect, useRef, useState } from "react";
import { Portal } from "../Protal";
import s from './tooltip.module.css';

interface TooltipChildProps {
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
}

interface TooltipProps {
  text: string;
  children: (props: TooltipChildProps) => React.ReactElement;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tooltipEl = tooltipRef.current;

    if (!anchorEl || !tooltipEl) {
      return;
    }

    const anchorRect = anchorEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    const TOP_SPACE = 7;

    setPosition({
      top: anchorRect.top - tooltipRect.height - TOP_SPACE,
      left: anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2
    });
  }, [anchorEl]);

  return (
    <>
      {anchorEl && (
        <Portal>
          <div
            ref={tooltipRef}
            className={s.tooltip}
            style={{
              top: position.top,
              left: position.left
            }}
          >
            {text}
          </div>
        </Portal>
      )}
      {children({
        onMouseLeave: () => setAnchorEl(null),
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(e.currentTarget);
        }
      })}
    </>
  );
};
