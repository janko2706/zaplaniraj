import React from "react";

type Props = {
  children: JSX.Element;
};

function ContentMarginsTemplate(props: Props) {
  return (
    <div className="mx-auto max-w-screen-2xl py-4 sm:px-6 lg:px-8 lg:py-6">
      {props.children}
    </div>
  );
}

export default ContentMarginsTemplate;
