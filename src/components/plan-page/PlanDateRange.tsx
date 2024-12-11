// interface PropsType { }

export default function PlanDateRange() {
  return (
    <div className="p-1 border border-[#acaaaa] inline-block rounded-t-md">
      <input type="time" className="rounded-t-md" />
      <span>~</span>
      <input type="time" className="rounded-t-md" />
    </div>
  );
}
