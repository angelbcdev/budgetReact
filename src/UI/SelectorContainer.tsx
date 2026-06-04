const SelectorContainer = ({
  options,
  selecteOption,
  changeOtion,
  size,
}: {
  size?: number;
  options: string[];
  selecteOption: string;
  changeOtion: (option: string) => void;
}) => {
  const rows = chunkArray(options, 4);

  const getTitle = (type: string) => {
    if (type === "credit_card_blue") return "blue C.";
    if (type === "credit_card_red") return "red C.";
    return type;
  };



  return (
    <div
      className={`flex flex-col gap-1 w-${size && size } max-w-90 bg-gray-200 rounded-md text-sm shadow-inner-md p-px my-1`}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-4 {getGridCols(row.length)} gap-1`}
        >
          {row.map((type) => {
            const isSelected = type === selecteOption;

            return (
              <button
                key={type}
                onClick={() => changeOtion(type)}
                className={`px-2 py-1 w-21 h-8 rounded-md ${
                  isSelected
                    ? "bg-white text-blue-600"
                    : "text-gray-700"
                } transition-all duration-100 capitalize  text-nowrap truncate `}
              >
                {getTitle(type)}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};


function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

export default SelectorContainer;