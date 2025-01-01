import React from 'react';

interface TextBoxProps {
  setAnswerContent: (content: string) => void;
  answerContent: string;
}

const TextBox: React.FC<TextBoxProps> = ({ setAnswerContent, answerContent }) => {
  return (
    <div className='px-2'>
      <textarea
        className="p-6 w-full border border-gray-600 border-opacity-70 rounded-md min-h-24 bg-transparent outline-none"
        value={answerContent}
        onChange={(e) => setAnswerContent(e.target.value)}
      />
    </div>
  );
};

export default TextBox;