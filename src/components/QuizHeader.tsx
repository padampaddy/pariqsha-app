

  
  const QuizHeader = ({
    title = "",
    
  }: {
    title?: string;
    
  }) => {
  return (
      <div className="px-4">
    <div className="common-btn p-10"> 
      <h3 className="text-xl text-center font-medium">
        {title}
      </h3>
    </div>
    </div>
  );
};

export default QuizHeader;
