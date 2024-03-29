import { scaleTime, timeFormat, extent, scaleLinear } from 'd3';

import Chart from './elements/chart';
import Line from './elements/line';
import Axis from './elements/axis';
import Gradient from './elements/gradient';
import { useChartDimensions, useUniqueId } from './elements/utils';

const formatDate = timeFormat('%-b %-d');
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa'];

type TimelineProps = {
  data: any[];
  xAccessor(arg: any): any;
  yAccessor(arg: any): number;
  label: string;
};

export function LineChart({ data, xAccessor = (d) => d.x, yAccessor = (d) => d.y, label }: TimelineProps) {
  const [ref, dimensions] = useChartDimensions();
  const gradientId = useUniqueId('Timeline-gradient');
  // @ts-ignore
  const xScale = scaleTime().domain(extent(data, xAccessor)).range([0, dimensions.boundedWidth]);
  // @ts-ignore
  const yScale = scaleLinear().domain(extent(data, yAccessor)).range([dimensions.boundedHeight, 0]).nice();
  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <Axis dimension="x" dimensions={dimensions} scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" dimensions={dimensions} scale={yScale} label={label} />
        <Line type="line" data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
      </Chart>
    </div>
  );
}
