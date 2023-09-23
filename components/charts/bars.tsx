'use client';

import { max } from 'd3';
import { callAccessor } from './utils';

// @ts-ignore
function Bars({ data, keyAccessor, xAccessor, yAccessor, widthAccessor, heightAccessor, ...props }) {
  return data.map((d: any, i: any) => (
    <rect
      {...props}
      className="Bars__rect"
      key={keyAccessor(d, i)}
      x={callAccessor(xAccessor, d, i)}
      y={callAccessor(yAccessor, d, i)}
      width={max([callAccessor(widthAccessor, d, i), 0])}
      height={max([callAccessor(heightAccessor, d, i), 0])}
    />
  ));
}

export default Bars;
