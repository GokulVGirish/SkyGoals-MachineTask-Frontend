const TableShimmer = ({ rows = 11, columns = 5 }) => {
  return (
    <div className="animate-pulse">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="py-3 px-6">
                <div className="h-4 bg-gray-700 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-400 divide-y divide-gray-700">
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-700 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableShimmer;
