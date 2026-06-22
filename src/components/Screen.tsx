import type { ReactNode } from 'react';
import stripes from '../assets/stripes.svg';

/** Orange canvas with the stripes watermark. */
export function Screen({
  children,
  watermark = 'top',
}: {
  children: ReactNode;
  watermark?: 'top' | 'about';
}) {
  return (
    <div className="screen">
      <img
        className={`screen__wm${watermark === 'about' ? ' screen__wm--about' : ''}`}
        src={stripes}
        alt=""
        aria-hidden="true"
      />
      <div className="screen__pad">{children}</div>
    </div>
  );
}
