import * as d3 from 'd3';

import Chart from './charts/chart';
import Line from './charts/line';
import Axis from './charts/axis';
import Gradient from './charts/gradient';
import { useChartDimensions, accessorPropsType, useUniqueId } from './charts/utils';

const formatDate = d3.timeFormat('%-b %-d');
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa'];
// @ts-ignore
const Timeline = ({ data, xAccessor = (d) => d.x, yAccessor = (d) => d.y, label }) => {
  const [ref, dimensions] = useChartDimensions();
  const gradientId = useUniqueId('Timeline-gradient');
  // @ts-ignore
  const xScale = d3.scaleTime().domain(d3.extent(data, xAccessor)).range([0, dimensions.boundedWidth]);
  // @ts-ignore
  const yScale = d3.scaleLinear().domain(d3.extent(data, yAccessor)).range([dimensions.boundedHeight, 0]).nice();
  // @ts-ignore
  const xAccessorScaled = (d) => xScale(xAccessor(d));
  // @ts-ignore
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);

  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          {/* @ts-ignore */}
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <Axis dimension="x" scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" scale={yScale} label={label} />
        <Line
          type="area"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
        <Line data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
      </Chart>
    </div>
  );
};

export default Timeline;
