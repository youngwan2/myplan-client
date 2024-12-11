// interface PropsType { }

import { useEffect, useRef, useState } from 'react';
import { colors } from '../../const/colors';
import { BiCaretDown } from 'react-icons/bi';
import Pallet from './Pallet';

export default function ColorPicker() {
  const [pickedColor, setPickedColor] = useState(colors[0].hex);
  const [isOpenPallet, setIsOpenPallet] = useState(false);

  const colorRef = useRef<HTMLDivElement>(null);

  function onChangeColor(color: string) {
    setPickedColor((old) => (old = color));
  }

  function handleTogglePallet() {
    setIsOpenPallet((old) => !old);
  }

  useEffect(() => {
    if (!colorRef.current) return;

    colorRef.current.style.backgroundColor = pickedColor;
  }, [pickedColor]);

  return (
    <div className="mr-2">
      <div className="flex items-center bg-white max-w-[85px] rounded-md px-2 py-1 border border-[#acaaaa]">
        <div
          ref={colorRef}
          className={`${pickedColor} w-3 h-3 rounded-full mr-1`}
        ></div>
        <button onClick={handleTogglePallet} className="flex items-center">
          색상
          <BiCaretDown />
        </button>
        <Pallet
          isOpen={isOpenPallet}
          onClose={handleTogglePallet}
          onChangeColor={onChangeColor}
        />
      </div>
    </div>
  );
}
