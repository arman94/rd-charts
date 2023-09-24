import { max } from 'd3';
import { callAccessor } from './utils';
import { ComponentPropsWithoutRef } from 'react';

type BarProps = {
  data: any;
  keyAccessor(arg: any, index: number): number;
  xAccessor(arg: any): number;
  yAccessor(arg: any): number;
  widthAccessor(arg: any): number;
  heightAccessor(arg: any): number;
} & ComponentPropsWithoutRef<'rect'>;

function Bars({ data, keyAccessor, xAccessor, yAccessor, widthAccessor, heightAccessor, ...props }: BarProps) {
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
