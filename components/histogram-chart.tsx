'use client';

import { useState } from 'react';
import { useInterval } from './charts/elements/utils';
import { getTimelineData, getScatterData } from './charts/elements/dummy-data';

import { Histogram } from './charts/histogram';

const humidityAccessor = (d: any) => d.humidity;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

export default function HistogramChart() {
  const [data, setData] = useState(getData());
  useInterval(() => {
    setData(getData());
  }, 4000);

  return <Histogram data={data.scatter} xAccessor={humidityAccessor} label="Humidity" />;
}
