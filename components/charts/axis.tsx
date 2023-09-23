'use client';

import { format } from 'd3';
// import { dimensionsPropsType } from './utils';
import { useChartDimensions } from './chart';

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};

//   dimensions: dimensionsPropsType,
//   scale: PropTypes.func,
//   label: PropTypes.string,
//   formatTick: PropTypes.func,
// dimension: PropTypes.oneOf(['x', 'y']),

// @ts-ignore
const Axis = ({ dimension = 'x', scale = null, formatTick = format(','), ...props }: any) => {
  const dimensions = useChartDimensions();
  // @ts-ignore
  const Component = axisComponentsByDimension[dimension];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

export default Axis;

// @ts-ignore
function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedWidth < 600 ? dimensions.boundedWidth / 100 : dimensions.boundedWidth / 250;

  const ticks = scale?.ticks(numberOfTicks);

  return (
    <g className="Axis AxisHorizontal" transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      <line className="Axis__line" x2={dimensions.boundedWidth} />
      {/* @ts-ignore */}
      {ticks?.map((tick, i) => (
        <text key={tick} className="Axis__tick" transform={`translate(${scale(tick)}, 25)`}>
          {formatTick(tick)}
        </text>
      ))}
      {label && (
        <text className="Axis__label" transform={`translate(${dimensions.boundedWidth / 2}, 60)`}>
          {label}
        </text>
      )}
    </g>
  );
}

// @ts-ignore
function AxisVertical({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale?.ticks(numberOfTicks);

  return (
    <g className="Axis AxisVertical" {...props}>
      <line className="Axis__line" y2={dimensions.boundedHeight} />
      {/* @ts-ignore */}
      {ticks?.map((tick, i) => (
        <text key={tick} className="Axis__tick" transform={`translate(-16, ${scale(tick)})`}>
          {formatTick(tick)}
        </text>
      ))}
      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
