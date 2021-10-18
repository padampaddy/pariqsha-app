import { ReactElement } from "react";
import { useDispatch } from "react-redux";
// import DEFAULT_AVATAR from "../assets/images/profileuser.png";
import modalSlice from "../redux/slices/modal-slice";
// import { Document, Page } from "react-pdf";

interface Props {
  url?: string;
  name?: string;
  type?: string;
}

function PicPreview({ url, name }: Props): ReactElement {
  const dispatch = useDispatch();
  // const [pageNumber] = useState(1);
  // const [numPages, setNumPages] = useState(1);
  // const onDocumentLoadSuccess = () => setNumPages(numPages);

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
        {/* {type && type === "application/pdf" ? (
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
        ) : type?.includes("image/") ? ( */}
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
        {/* ) : null} */}
        <p className="text-lg ml-1">{name}</p>
        </div>
        <button onClick={() => dispatch(modalSlice.actions.hideModal())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className=" pt-6 md:pt-0  sm:items-start flex md:items-center md:h-96 h-72  overflow-y-auto justify-center">
        {/* {type?.includes("application/pdf") ? (
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        ) : (
          <img className="mx-auto h-3/4 w-3/4" src={url} />
        )} */}
         <img className="mx-auto h-3/4 w-3/4" src={url} />
      </div>
    </>
  );
}
export default PicPreview;
