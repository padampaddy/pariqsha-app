import pariqshalogo from "../assets/images/pariqshaname.png";
import logo from "../assets/images/pariqsha.png";
import GeneralLayout from "../layouts/General";

const LandingPage = () => {
    return (
    <div className="mx-auto">
        <GeneralLayout>
    <div className="common-btn p-8 md:p-20" style={{borderRadius:"0% 0% 47% 52% / 10% 10% 45% 49% "}}> 
        <h4 className="font-light text-white text-2xl">Welcome to <br/> <span className="font-medium">Pariqsha Quiz app</span></h4>
        <img src={pariqshalogo} className="mx-auto" alt="pariqshalogo" />
   
    </div>
    <div className="py-10 md:py-36">
        <img src={logo} className="h-28 w-28 mx-auto" alt="pariqsha logo" />
    </div>



     </GeneralLayout>
    </div>
    )
}

export default LandingPage
