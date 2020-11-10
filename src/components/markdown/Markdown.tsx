import * as React from 'react';
import * as MarkdownIt from 'markdown-it';

type Props = {
  children?: React.ReactNode;
};

/*
  Adding this as a simpler way to manage markdown wrt to the current
  implementations found in MarkdownRenderer this implementation doesnt
  bake in any additional functionality. You simply pass it a string as children
  and you get markdown.
*/
export const Markdown = ({ children }: Props) => {
  const md = React.useRef(new MarkdownIt({}));

  return (
    <div className="markdown">
      {React.Children.map(children, child => {
        if (typeof child === 'string') {
          return (
            <span
              dangerouslySetInnerHTML={{ __html: md.current.render(child) }}
            />
          );
        } else {
          return child;
        }
      })}
    </div>
  );
};
