import TimeStamp from "../../../components/Time/TimeStamp";

const QuizHeader = ({ title = "" }: { title?: string }) => {
  return (
    <div className="px-0">
      <div className="common-btn p-6">
        <h3 className="text-xl text-center font-medium">{title}</h3>
        <TimeStamp hours={1} />
      </div>
    </div>
  );
};

export default QuizHeader;
