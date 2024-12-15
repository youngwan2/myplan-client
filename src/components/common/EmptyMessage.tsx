interface PropsType {
  text: string;
  className: string;
}
export default function EmptyMessage({ text, className }: PropsType) {
  return (
    <div className={className}>
      <p>{text}</p>
    </div>
  );
}
