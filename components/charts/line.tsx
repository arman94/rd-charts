'use client';

import * as d3 from 'd3';

// 'type  line' |'area'

const Line = ({
  type = 'line',
  // @ts-ignore
  data,
  // @ts-ignore
  xAccessor = (d) => d.x,
  // @ts-ignore
  yAccessor = (d) => d.y,
  y0Accessor = 0,
  // @ts-ignore
  interpolation = d3.curveMonotone,
  ...props
}) => {
  let lineGenerator: any;
  if (type === 'area') {
    lineGenerator = d3.area().x(xAccessor).y(yAccessor).y0(y0Accessor).y1(yAccessor);
  } else {
    lineGenerator = d3.line().x(xAccessor).y(yAccessor);
    // .curve(interpolation);
  }

  if (type === 'area') {
  }

  return <path {...props} className={`Line Line--type-${type}`} d={lineGenerator(data) ?? ''} />;
};

export default Line;
