'use client';

import { Suspense } from 'react';
// import { useState } from 'react';
// import { useInterval } from '../components/charts/utils';
// import { getTimelineData, getScatterData } from '../components/charts/dummy-data';
// import Timeline from '@/components/time-line';
// import ScatterPlot from '@/components/scatter-plot';
import Histogram from '@/components/histoChart';

// const parseDate = d3.timeParse('%m/%d/%Y');
// // @ts-ignore
// const dateAccessor = (d) => parseDate(d.date);
// // @ts-ignore
// const temperatureAccessor = (d) => d.temperature;
// // @ts-ignore
// const humidityAccessor = (d) => d.humidity;

// const getData = () => ({
//   timeline: getTimelineData(),
//   scatter: getScatterData(),
// });

export default function Home() {
  // const [data, setData] = useState(getData());
  // useInterval(() => {
  //   setData(getData());
  // }, 4000);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 App__charts">
      <Suspense fallback={<p>Loading .....</p>}>
        <div className="">
          <Histogram />
          {/* <Timeline data={data.timeline} xAccessor={dateAccessor} yAccessor={temperatureAccessor} label="Temperature" />
        <ScatterPlot
        data={data.scatter}
        xAccessor={humidityAccessor}
        yAccessor={temperatureAccessor}
        xLabel="Humidity"
        yLabel="Temperature"
      /> */}
        </div>
      </Suspense>
    </main>
  );
}
