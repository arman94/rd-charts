'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useChartDimensions } from './utils';

// @ts-ignore
const Axis = ({ dimension = 'x', scale = null, formatTick, ...props }) => {
  const dimensions = useChartDimensions();

  const axisGeneratorsByDimension = {
    x: 'axisBottom',
    y: 'axisLeft',
  };
  // @ts-ignore
  const axisGenerator = d3[axisGeneratorsByDimension[dimension]]().scale(scale).tickFormat(formatTick);

  const ref = useRef(null);
  if (ref.current) {
    d3.select(ref.current).transition().call(axisGenerator);
  }
  // @ts-ignore
  return <g {...props} ref={ref} transform={dimension === 'x' ? `translate(0, ${dimensions.boundedHeight})` : null} />;
};

Axis.propTypes = {
  dimension: PropTypes.oneOf(['x', 'y']),
  scale: PropTypes.func,
};

export default Axis;
