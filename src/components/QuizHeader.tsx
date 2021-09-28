const QuizHeader = ({ title = "" }: { title?: string }) => {
  return (
    <div className="px-0 md:px-4">
      <div className="common-btn p-8">
        <h3 className="text-xl text-center font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default QuizHeader;
