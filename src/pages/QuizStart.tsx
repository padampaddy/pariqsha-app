import exam from "../assets/images/exam.png";
import BaseLayout from "../layouts/Base";

const QuizStart = () => {
  return (
    <BaseLayout showBack>
      <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
        <div className="flex-1 bg-white shadow-md mx-4 mb-10  px-4">
          <img
            src={exam}
            className="rounded-3xl h-60 w-60 md:h-80 md:w-80 mx-auto"
            alt="pariqsha exam2"
          />
          <div className="common-btn py-10 text-center mb-4 animation">
            <h2 className="text-lg font-medium">Take a Quiz</h2>
          </div>
          <div className="common-btn py-10 text-center mb-4 animation">
            <h2 className="text-lg font-medium">Create a Quiz</h2>
          </div>
          <div className="common-btn py-10 text-center mb-4 animation">
            <h2 className="text-lg font-medium">Recent Activity</h2>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default QuizStart;
