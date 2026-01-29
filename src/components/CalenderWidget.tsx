

type Props = {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
  };
  
  export default function CalendarWidget({ selectedDate, onSelectDate }: Props) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); 
    console.log('date selected', selectedDate);
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    console.log(startWeekday, daysInMonth);
    
    const cells: Array<Date | null> = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length < 42) cells.push(null);
  
    function isSameDay(a: Date, b: Date) {
        console.log(a,b,'********')
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    }
  
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-3">
       
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">
            {today.toLocaleString(undefined, { month: "long" })} {year}
          </div>
          <div className="text-xs text-zinc-400">Pick a date</div>
        </div>
  
        <div className="grid grid-cols-7 gap-1 text-[10px] text-zinc-400 mb-2">
          {days.map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>
  
       
        <div className="grid grid-cols-7 gap-1 text-xs">
          {cells.map((date, idx) => {
            if (!date) {
              return <div key={idx} className="h-8 rounded-lg" />;
            }
  
            const selected = selectedDate ? isSameDay(date, selectedDate) : false;
            const isToday = isSameDay(date, today);
  
            const base =
              "h-8 flex items-center justify-center rounded-lg border transition cursor-pointer select-none";
  
           
            const cls = selected
              ? "bg-white/20 border-white/30 ring-1 ring-white/20"
              : "bg-white/5 border-white/10 hover:bg-white/10";
  
            
            const todayCls = isToday && !selected ? "ring-1 ring-emerald-400/30" : "";
  
            return (
              <button
                type="button"
                key={idx}
                className={`${base} ${cls} ${todayCls}`}
                onClick={() => {
                    console.log('date selected:', date);
                    onSelectDate(date)}}
                title={date.toDateString()}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
  
        
        {/* <div className="mt-2 text-[11px] text-zinc-400">
          {selectedDate ? (
            <>
              Selected:{" "}
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                {selectedDate.toDateString()}
              </span>
            </>
          ) : (
            "No date selected"
          )}
        </div> */}
      </div>
    );
  }
  