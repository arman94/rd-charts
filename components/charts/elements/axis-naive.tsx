'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import { axisBottom, axisLeft } from 'd3';
import { useChartDimensions } from './utils';
import { AxisFunctionProps } from './types';

function Axis({ dimension = 'x', scale = null, formatTick, ...props }: AxisFunctionProps) {
  const ref = useRef(null);
  const dimensions = useChartDimensions();

  const axisGeneratorsByDimension = {
    x: axisBottom,
    y: axisLeft,
  };
  // @ts-ignore
  const axisGenerator = axisGeneratorsByDimension[dimension]().scale(scale).tickFormat(formatTick);

  if (ref.current) {
    // @ts-ignore
    d3.select(ref.current).transition().call(axisGenerator);
  }

  // @ts-ignore
  return <g {...props} ref={ref} transform={dimension === 'x' ? `translate(0, ${dimensions.boundedHeight})` : null} />;
}

Axis.propTypes = {
  dimension: PropTypes.oneOf(['x', 'y']),
  scale: PropTypes.func,
};

export default Axis;
