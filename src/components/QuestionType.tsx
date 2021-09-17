

const QuestionType = ({
    title = "",
    
  }: {
    title?: string;
    
  }) => {
  return (
      <div className="">
     <h4 className="text-sm mb-2 bg-gray-100 p-2 px-4 font-medium"> 
          {title}
    </h4>
    </div>
  );
};

export default QuestionType;
