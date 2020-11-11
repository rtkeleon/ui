import * as React from 'react';

type Props = {
  children?: React.ReactNode;
};

declare function require(name: string);

export const Markdown = ({ children }: Props) => {
  const md = require('markdown-it')();
  return (
    <div className="markdown">
      {React.Children.map(children, child => {
        if (typeof child === 'string') {
          return (
            <span dangerouslySetInnerHTML={{ __html: md.render(child) }} />
          );
        } else {
          return child;
        }
      })}
    </div>
  );
};
