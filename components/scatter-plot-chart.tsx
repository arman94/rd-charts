'use client';

import { useState } from 'react';
import { useInterval } from './charts/elements/utils';
import { getTimelineData, getScatterData } from './charts/elements/dummy-data';

import { ScatterPlot } from './charts';

const temperatureAccessor = (d: any) => d.temperature;
const humidityAccessor = (d: any) => d.humidity;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

export function ScatterPlotChart() {
  const [data, setData] = useState(getData());
  useInterval(() => {
    setData(getData());
  }, 4000);

  return (
    <ScatterPlot
      data={data.scatter}
      xAccessor={humidityAccessor}
      yAccessor={temperatureAccessor}
      xLabel="Humidity"
      yLabel="Temperature"
    />
  );
}
