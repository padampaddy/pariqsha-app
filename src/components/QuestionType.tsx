const QuestionType = ({ title = "" }: { title?: string }) => {
  return (
    <>
      <h4 className="text-sm mb-2 bg-gray-100 p-2 px-3 font-medium">{title}</h4>
    </>
  );
};

export default QuestionType;
