import book from '../assets/images/book.png'
import sci from '../assets/images/lab.png'
import drama from '../assets/images/theater.png'
import art from '../assets/images/art.png'
import maths from '../assets/images/maths.png'
import gk from '../assets/images/world.png'

const Quizzes = () => {
    return (
        <>
            <div className={"header pt-8 text-center"}>
                <h4 className="text-black text-xl font-bold">Quizzes</h4>
            </div>
            <span className="absolute left-4 top-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    style={{ color: "#39CDE0" }}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </span>
            <div className={"bg-yellow-400  text-md mt-4 font-bold text-center text-white py-4 tracking-wider"} style={{ borderRadius: "0% 0% 46% 56% / 43% 48% 32% 27%" }}>Choose Your Path</div>
            <div className="container mt-4 px-4 m-auto">
                <div className={"flex  mb-4 justify-center"}>
                    <div className="w-1/2 mx-auto">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#27A7AD" }}>
                            <img src={book} className={"w-20 h-20"} />
                        </div>

                        <p className={"text-black text-sm text-center mt-2 language py-1.5 w-auto"}>Language</p>

                    </div>
                    <div className="w-1/2">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#F9541F" }}>
                            <img src={sci} className={"w-20 h-20"} />
                        </div>
                        <p className={"text-black text-sm text-center mt-2 py-1.5 w-auto science"}>Science</p>
                    </div>
                </div>
                <div className={"flex mb-4"}>
                    <div className="w-1/2 mx-auto">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#CDA4FF" }}>
                            <img src={drama} className={"w-20 h-20"} />
                        </div>
                        <p className={"text-black text-sm text-center mt-2 py-1.5 w-auto drama"}>Drama</p>
                    </div>
                    <div className="w-1/2 mx-auto">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#91C874" }}>
                            <img src={art} className={"w-20 h-20"} />
                        </div>
                        <p className={"text-black text-sm text-center mt-2 py-1.5 w-auto art"}>Art & Design</p>
                    </div>
                </div>
                <div className={"flex mb-4"}>
                    <div className="w-1/2 mx-auto px-2">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#FDCC40" }}>
                            <img src={maths} className={"w-20 h-20"} />
                        </div>
                        <p className={"text-black text-sm text-center mt-2 py-1.5 w-auto maths"}>Mathmatics</p>
                    </div>
                    <div className="w-1/2 mx-auto px-2">
                        <div className={"rounded-full h-32 w-32 flex justify-center items-center mx-auto"} style={{ background: "#79D9EF" }}>
                            <img src={gk} className={"w-20 h-20"} />
                        </div>
                        <p className={"text-black text-sm text-center mt-2 py-1.5 w-auto gk"}>GK</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Quizzes