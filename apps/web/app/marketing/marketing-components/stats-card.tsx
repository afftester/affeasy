const statisticsData = [
  { label: "Users", value: "88+" },
  { label: "Companies", value: "11+" },
];

export default function StatsCard() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="mb-6 mt-2 text-center text-sm text-gray-500 md:mt-10 md:text-lg">
        Trusted By
      </p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10">
        {statisticsData.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-4xl font-bold text-gray-900 md:text-6xl">
              {stat.value}
            </span>
            <span className="mt-2 text-sm text-gray-500 md:text-xl">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
