interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by name or tags..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
}
