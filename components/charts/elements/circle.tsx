import { ComponentPropsWithoutRef } from 'react';

type CirclesProps = {
  data: any[];
  keyAccessor(arg: any, index: number): number;
  xAccessor(arg: any, index: number): number;
  yAccessor(arg: any, index: number): number;
  radius?: number | ((d: any) => number);
} & ComponentPropsWithoutRef<'circle'>;

export default function Circles({ data, keyAccessor, xAccessor, yAccessor, radius = 5 }: CirclesProps) {
  return (
    <>
      {data.map((d, i) => (
        <circle
          className="Circles__circle"
          key={keyAccessor(d, i)}
          cx={xAccessor(d, i)}
          cy={yAccessor(d, i)}
          r={radius}
        />
      ))}
    </>
  );
}
