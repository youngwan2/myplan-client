import { motion } from 'motion/react';
import { colors } from '../../const/colors';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onChangeColor: (color: string) => void;
}

export default function Pallet({ isOpen, onClose, onChangeColor }: PropsType) {
  function handleClick(color: string) {
    onChangeColor(color);
    onClose();
  }

  return (
    <motion.div
      initial="closed"
      animate={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      transition={{ duration: 0.5 }}
      className="opacity-0 invisible absolute left-[50%] translate-x-[-50%] max-w-[535px] w-full bg-[#fff] rounded-md shadow-md p-3"
    >
      <div className="flex flex-wrap flex-col">
        <h2 className="text-center font-bold text-xl mb-2">색상 선택표</h2>
        <div>
          {colors.map((color) => (
            <button
              ref={(element) =>
                element instanceof HTMLButtonElement
                  ? (element.style.backgroundColor = color.hex)
                  : null
              }
              type="button"
              key={color.category}
              className={`inline-block w-6 h-6 rounded-full m-2 border border-[#767676]`}
              onClick={() => handleClick(color.hex)}
            ></button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="border border-[#acaaaa] py-2 rounded-md  mt-2 active:bg-gray-200 sm:hover:bg-slate-100"
        >
          취소
        </button>
      </div>
    </motion.div>
  );
}
