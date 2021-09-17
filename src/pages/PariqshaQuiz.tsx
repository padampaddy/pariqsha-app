import listening from "../assets/images/headphone.png";
import reading from "../assets/images/books.png";
import write from "../assets/images/write.png";
import speak from "../assets/images/chats.png";

const PariqshaQuiz = () => {
  return (
    <div className="h-full flex-col flex-1 flex">
      <div className="common-btn p-10 py-16 flex-1">
        <p className="text-xl leading-normal md:w-1/2  md:mx-auto ">
          Get lots of practical
          <br /> tips for the Listening,
          <br />
          Reading, Writing and Speaking sections to help you achieve your
          desired score
        </p>
      </div>
      <div className=" p-6  rounded-3xl -mt-10 md:w-1/2 md:mx-auto bg-white ">
        <ul>
          <li className="list-style animation"> 
            Listening
            <span>
              <img
                src={listening}
                className="h-8 w-8 "
                alt="pariqsha listening"
              />
            </span>
          </li>
          <li className="list-style animation">
            Reading
            <span>
              <img src={reading} className="h-8 w-8 " alt="pariqsha reading" />
            </span>
          </li>
          <li className="list-style animation">
            Writing
            <span>
              <img src={write} className="h-8 w-8 " alt="pariqsha write" />
            </span>
          </li>
          <li className="list-style animation">
            Speaking
            <span>
              <img src={speak} className="h-8 w-8 " alt="pariqsha speak" />
            </span>
          </li>
          <li className="list-style animation">
            4 Module Quiz
            <span>
              <img src={speak} className="h-8 w-8 " alt="pariqsha speak" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PariqshaQuiz;
