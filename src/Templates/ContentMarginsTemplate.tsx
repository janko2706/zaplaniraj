import React from "react";

type Props = {
  children: JSX.Element;
};

function ContentMarginsTemplate(props: Props) {
  return (
    <div className="mx-auto max-w-screen-2xl pt-4 sm:px-6 lg:px-8 lg:pt-6">
      {props.children}
    </div>
  );
}

export default ContentMarginsTemplate;
