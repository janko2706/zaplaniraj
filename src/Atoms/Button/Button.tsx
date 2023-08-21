import React from "react";
type Props = {
  text: string;
  className?: string;
};

function Button(props: Props) {
  return <button className={`${props.className ?? ""}`}>{props.text}</button>;
}

export default Button;
