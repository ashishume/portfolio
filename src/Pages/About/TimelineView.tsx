export default function TimelineView({
  job,
  index,
}: {
  job: {
    id: number;
    position: string;
    company: string;
    duration: string;
    location: string;
    description: string;
    highlights: string[];
    logo?: string; // Optional: path to company logo
  };
  index: number;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row mb-16 md:mb-0 ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Left side (or right side on even index) */}
      <div
        className={`md:w-1/2 px-4 md:pb-10 ${
          index % 2 === 0 ? "md:text-left" : "md:text-right"
        }`}
      >
        <div
          className={`dark:bg-slate-800/80 bg-white/80 p-6 rounded-lg shadow-lg border-l-4 border-blue-500 h-full transform hover:scale-105 transition-transform duration-300 ${
            index % 2 === 0 ? "ml-auto mr-4" : "mr-auto ml-4"
          }`}
        >
          <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{job.position}</h3>
          <h4 className="text-xl text-blue-400 mb-2">{job.company}</h4>
          <div
            className={`flex items-center mb-3 dark:text-gray-400 text-gray-600 text-sm ${
              index % 2 !== 0 ? "justify-end" : ""
            }`}
          >
            <span>{job.duration}</span>
            <span className="mx-2">•</span>
            <span>{job.location}</span>
          </div>
          <p className="dark:text-gray-300 text-gray-700 mb-4 text-left">{job.description}</p>

          {/* Highlights section - always left-aligned text */}
          <div className={`${index % 2 !== 0 ? "flex justify-end" : ""}`}>
            <ul className="dark:text-gray-300 text-gray-700 list-disc pl-5 text-left">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="mb-1">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="md:w-1/2"></div>
    </div>
  );
}
