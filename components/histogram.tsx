'use client';

import { scaleLinear, bin, max, extent } from 'd3';

import Chart from './charts/chart';
import Bars from './charts/bars';
import Axis from './charts/axis';
import Gradient from './charts/gradient';
import { useChartDimensions, useUniqueId } from './charts/utils';

const gradientColors = ['#9980FA', 'rgb(226, 222, 243)'];

// @ts-ignore
export const Histogram = ({ data, xAccessor = (d) => d.x, label }) => {
  const gradientId = useUniqueId('Histogram-gradient');
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  });

  const numberOfThresholds = 9;

  const xScale = scaleLinear()
    // @ts-ignore
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice(numberOfThresholds);

  const binsGenerator = bin()
    // @ts-ignore
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(xScale.ticks(numberOfThresholds));

  const bins = binsGenerator(data);

  // @ts-ignore
  const yAccessor = (d) => d.length;
  const yScale = scaleLinear()
    .domain([0, max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const barPadding = 2;
  // @ts-ignore
  const xAccessorScaled = (d) => xScale(d.x0) + barPadding;
  // @ts-ignore
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  // @ts-ignore
  const widthAccessorScaled = (d) => xScale(d.x1) - xScale(d.x0) - barPadding;
  // @ts-ignore
  const heightAccessorScaled = (d) => dimensions.boundedHeight - yScale(yAccessor(d));
  // @ts-ignore
  const keyAccessor = (d, i) => i;

  return (
    <div className="Histogram" ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          {/* @ts-ignore */}
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <Axis dimensions={dimensions} dimension="x" scale={xScale} label={label} />
        <Axis dimensions={dimensions} dimension="y" scale={yScale} label="Count" />
        <Bars
          data={bins}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          widthAccessor={widthAccessorScaled}
          heightAccessor={heightAccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
      </Chart>
    </div>
  );
};
