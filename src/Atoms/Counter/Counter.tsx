import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

type Props = {
  end: number;
  decimals?: number;
};

function Counter({ end, decimals }: Props) {
  const [counted, setCounted] = useState(false);

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible && !counted) {
      setCounted(true);
    }
  };
  return (
    <CountUp
      end={counted ? end : 0}
      redraw={false}
      duration={4}
      decimals={decimals}
      start={end > 6000 ? end : 0}
    >
      {({ countUpRef }) => (
        <VisibilitySensor onChange={handleVisibilityChange} delayedCall>
          <span ref={countUpRef} />
        </VisibilitySensor>
      )}
    </CountUp>
  );
}

export default Counter;
