import { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import useResizeObserver from 'use-resize-observer';

interface Size {
  width: number;
  height: number;
}

export default function useElementSize(wait): [Size, React.Ref] {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onResize = useMemo(() => debounce(setSize, wait), [wait]);
  const { ref } = useResizeObserver({ onResize });

  return [size, ref];
}
