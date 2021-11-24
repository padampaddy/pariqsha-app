import Note from "./components/Note";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ExamContext from "../../contexts/examContext";
import LinearLoader from "../../components/Loader/LinearLoader";
import PicPreview from "../../components/PicPreview";
import modalSlice from "../../redux/slices/modal-slice";

const Writing = () => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state: RootState) => state.user);
  // const [files, setFiles] = useState({ url: "", name: "", type: "" });
  const [invalidFile, setInvalidFile] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { questions, currentQuestionIndex, setUserAnswer, userAnswer } =
    useContext(ExamContext);

  const uploadFile = async (e: React.ChangeEvent<any>) => {
    setLoading(true);
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      setInvalidFile("File does not support");
      setLoading(false);
      return false;
    } else {
      setInvalidFile("");
      const res = await fetch(
        "https://functions.app.pariqsha.com/files/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${entities?.token}`,
          },
        }
      );
      const { url } = await res.json();
      setUserAnswer(url);
      // setFiles({ url: url, name: file.name, type: file.type });
      e.target.value = "";
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    // setFiles({ url: "", name: "", type: "" })
    setUserAnswer("");
  }, [currentQuestionIndex]);

  const handleRemove = () => {
    setUserAnswer("");
    // setFiles({ url: "", name: "", type: "" });
  };

  const img = questions[currentQuestionIndex]?.image_link;

  return (
    <>
      <div className="flex-grow bg-white md:px-6 md:py-4 px-3 py-1.5 flex flex-col overflow-y-auto h-full">
        <Note detail="Write on an A4 sheet then scan and upload." />
        <div>
          <p className="mt-5 font-bold">Questions {currentQuestionIndex + 1}</p>
          <h5 className="text-sm mt-4">
            {questions[currentQuestionIndex]?.question}
          </h5>
          {img && <img className="mt-1 " src={img} />}
        </div>

        <div className="mt-5 md:w-3/5 w-4/5 mb-3 border-2 border-dashed m-auto p-3">
          <p className=" text-base ">ATTACHMENT</p>
          <p className="text-xs text-gray-500 mt-1">
            Accepted Formats: JPEG, PNG
          </p>

          <div className="mt-3 mb-2">
            {invalidFile && (
              <div className="text-red-500 text-sm">{invalidFile}</div>
            )}
            {isLoading ? (
              <LinearLoader />
            ) : (
              <div
                role="button"
                className="flex items-center"
                onClick={() => {
                  dispatch(
                    modalSlice.actions.showModal({
                      body: (
                        <PicPreview
                          url={userAnswer}
                          // name={files.name}
                          // type={files.type}
                        />
                      ),
                    })
                  );
                }}
              >
                {/* {files &&
            Object.keys(files).length &&
            files?.type === "application/pdf" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : files?.type.includes("image/") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              ) : null}  */}

                {userAnswer && (
                  <img src={userAnswer} alt="img" className="h-12 w-12" />
                )}
              </div>
            )}
          </div>
          <div className="float-right">
            {userAnswer ? (
              <button
                onClick={handleRemove}
                className="flex justify-center p-2 text-red-500  text-sm items-center rounded-lg capitalize hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Remove
              </button>
            ) : (
              <label className="flex justify-center p-2 text-sm items-center rounded-lg hover:bg-gray-200 capitalize cursor-pointer">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </span>
                Upload File
                <input type="file" className="hidden" onChange={uploadFile} />
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Writing;
