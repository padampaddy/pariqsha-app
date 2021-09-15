const ListingQuiz = () => {
  return (
    <>
    <div className="common-btn mx-auto py-16 px-8">
      <div className="md:w-1/4 md:mx-auto">
        <p className="text-2xl font-light pb-6">
          Prepare for your <br /> first three{" "}
          <span className="font-medium text-white">Pariqsha Quiz</span> tests
          for <span className="font-medium">free</span>
        </p>
        <div className="block">
          <div className="mt-2">
            <div className="form-group mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6"
                id="test1"
                checked
              />
              <label htmlFor="test1" className="practice-list-test w-full">
                Practice Test 1
              </label>
            </div>
            <div className="form-group mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6"
                id="test2"
                checked
              />
              <label htmlFor="test2" className="practice-list-test w-full">
                Practice Test 2
              </label>
            </div>
            <div className="form-group mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6"
                id="test3"
              
              />
              <label htmlFor="test3" className="practice-list-test w-full">
                Practice Test 3
              </label>
            </div>
            <div className="form-group mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6"
                id="test4"
              />
              <label htmlFor="test4" className="practice-list-test w-full">
                Practice Test 4{" "}
                <span className="underline text-xs ml-20 text-yellow-800">
                  Purchase now
                </span>
              </label>
            </div>
            <div className="form-group mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6"
                id="test5"
              />
              <label htmlFor="test5" className="practice-list-test w-full">
                Practice Test 5{" "}
                <span className="underline text-xs ml-20 text-yellow-800">
                  Purchase now
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
  );
};

export default ListingQuiz;
