import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full App__charts">
      <div className="flex justify-center items-center max-w-2xl gap-4 flex-wrap">
        <Link
          href="/histogram"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Histogram Chart
        </Link>

        <Link
          href="/bar"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Bar Chart
        </Link>
        <Link
          href="/donut"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Donut Chart
        </Link>
        <Link
          href="/line"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Line Chart
        </Link>
        <Link
          href="/time-line"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Time Line Chart
        </Link>
        <Link
          href="/area"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Area Chart
        </Link>
        <Link
          href="/sunburst"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Sunburst Chart
        </Link>
        <Link
          href="/scatter-plot"
          className="rounded-lg border border-gray hover:border-white py-4 px-6 hover:transform hover:-translate-y-0.5 hover:shadow-lg select-none transition-all duration-300 text-gray opacity-80 hover:opacity-100 hover:text-white"
        >
          Scatter Plot Chart
        </Link>
      </div>
    </main>
  );
}
