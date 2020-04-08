import React from 'react';
import useElementSize from 'utils/useElementSize';

interface Props {
  className?: string; // for styled-components
  children: React.ReactNodeArray;
}

export default function MeasuredContainer({
  className,
  children,
  ...props
}: Props): React.ReactElement {
  const [size, ref] = useElementSize(100);

  return (
    <div ref={ref} className={className}>
      {React.cloneElement(children, { ...props, size })}
    </div>
  );
}
