interface PropsType {
  isFormValid: boolean;
  textContent: string;
}

export default function Button({ isFormValid, textContent }: PropsType) {
  return (
    <button
      type="submit"
      disabled={!isFormValid}
      className={`w-full flex justify-center sm:py-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
        isFormValid
          ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
    >
      {textContent}
    </button>
  );
}
