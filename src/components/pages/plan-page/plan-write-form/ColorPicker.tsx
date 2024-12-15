import { ChangeEventHandler, useRef } from 'react';

interface PropsType {
  onChange: ChangeEventHandler;
}

export default function ColorPicker({ onChange }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mr-2 flex items-center">
      <label className="flex items-center bg-white max-w-[85px] rounded-md px-2 py-1 border border-[#acaaaa]">
        <input
          ref={inputRef}
          onChange={onChange}
          type="color"
          name="colorCode"
        />
      </label>
    </div>
  );
}
