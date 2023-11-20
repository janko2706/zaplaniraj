import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  children?: JSX.Element;
}

function Button(props: Props) {
  return (
    <button className={`${props.className ?? ""}`} {...props}>
      {props.children}
      {props.text}
    </button>
  );
}

export default Button;
