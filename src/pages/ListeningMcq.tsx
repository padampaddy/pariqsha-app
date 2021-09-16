import BaseLayout from "../layouts/Base";
import Note from "../components/Note";
import QuizHeader from "../components/QuizHeader";




const ListeningMcq = () => {
  return (
    <div className="">
      <BaseLayout showBack title="Listening">
          <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
        <QuizHeader title="Choose The Correct Options" />

        <div className="flex-1 bg-white shadow-md mx-4 mb-4"> 
          <div className=" p-6 ">
            <h3 className="">Question 1-10</h3>
            <Note />

      
            <p className="mt-6 italic font-light">Choose the correct Answer A,B,C OR D</p> 
            <h3 className="mt-3 text-sm ">
              <b>Q.No.1</b> Lorem Ipsum is simply dummy text of the printing and
              typesetting industry?
            </h3>
            <ul className="mt-4"> 
                <li className="text-sm mb-2">a)  After 11am</li>
                <li className="text-sm mb-2">b)  Before 11am</li>
                <li className="text-sm mb-2">c)  in the afternoon</li>
                <li className="text-sm mb-2">d)  None of these</li>
            </ul>
            <div className="bg-blue-100 p-4 text-black text-xs mt-6">
                <p><b>Tip:</b> Do not select an answer too quickly. You may hear one of the words 
                from the options, but you need to match based on the entire meaniong of the options given not only one word.</p>
            </div>    

     
            </div>
            {/* <audio ref="audio_tag" src="../components/audio/Audio1.mp3" controls autoPlay/> */}
    
        </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ListeningMcq;
