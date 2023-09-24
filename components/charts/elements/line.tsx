import { curveMonotoneX, line, area, CurveFactory } from 'd3';

import { ComponentPropsWithoutRef } from 'react';

type LineProps = {
  type: 'line' | 'area';
  data: any[];
  xAccessor(arg: any): number;
  yAccessor(arg: any): number;
  interpolation?: CurveFactory;
  y0Accessor?: number;
} & ComponentPropsWithoutRef<'line'>;

export default function Line({
  type = 'line',
  data,
  xAccessor = (d) => d.x,
  yAccessor = (d) => d.y,
  y0Accessor = 0,
  interpolation = curveMonotoneX,
  ...props
}: LineProps) {
  if (type === 'line') {
    return (
      <path
        {...props}
        className={`transition-all duration-300 Line--type-${type}`}
        d={line().x(xAccessor).y(yAccessor).curve(interpolation)(data) ?? ''}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    );
  }

  if (type === 'area') {
    return (
      <path
        {...props}
        className={`Line Line--type-${type}`}
        d={area().x(xAccessor).y(yAccessor).curve(interpolation).y0(y0Accessor).y1(yAccessor)(data) ?? ''}
      />
    );
  }
}
