import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router';

interface BackButtonPropsType {
  onClick?: () => void;
  className?: string;
}

export default function BackButton({
  onClick,
  className,
}: BackButtonPropsType) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // 기본적으로 이전 페이지로 이동
    }
  };

  return (
    <button
      onClick={handleBack}
      title="뒤로가기"
      className={`p-2 text-sm font-medium text-gray-700  rounded hover:bg-gray-200 ${className}`}
    >
      <AiOutlineArrowLeft className="mr-2" size={20} />
    </button>
  );
}
