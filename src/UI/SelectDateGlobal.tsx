const formatDateForInput = (date: Date, timeZone = "America/New_York") => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export   const SelectDateGlobal = ({
  className,
  addValue,
  lastDate,
}: {
  className: string;
  addValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastDate: string;
}) => {
  const today = new Date();

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 0);

  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  return (
    <label className={className}>
      <input
        placeholder="Date"
        defaultValue={lastDate || formatDateForInput(today)}
        type="date"
        name="date"
        onChange={addValue}
        min={formatDateForInput(oneMonthAgo)}
        max={formatDateForInput(nextMonth)}
      />
    </label>
  );
};