import { timeFormat, timeDay } from 'd3';

const randomAroundMean = (mean: number, deviation: number) => mean + boxMullerRandom() * deviation;
const boxMullerRandom = () => Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());

const today = new Date();
const formatDate = timeFormat('%m/%d/%Y');
export const getTimelineData = (length = 100) => {
  let lastTemperature = randomAroundMean(70, 20);
  const firstTemperature = timeDay.offset(today, -length);

  return new Array(length).fill(0).map((d, i) => {
    lastTemperature += randomAroundMean(0, 2);
    return {
      date: formatDate(timeDay.offset(firstTemperature, i)),
      temperature: lastTemperature,
    };
  });
};

export const getScatterData = (count = 100) =>
  new Array(count).fill(0).map((d, i) => ({
    temperature: randomAroundMean(70, 20),
    humidity: randomAroundMean(0.5, 0.1),
  }));
