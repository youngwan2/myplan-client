import React, { HTMLAttributes } from 'react';

interface PropsType extends HTMLAttributes<HTMLHeadingElement> {
  tagName: React.ElementType;
  className: string;
  children: React.ReactNode;
}

export default function Title({ tagName, className, children }: PropsType) {
  const Heading = tagName;

  return <Heading className={className}>{children}</Heading>;
}
