import BaseLayout from "../layouts/Base";

const Notification = () => {
  return (
    <BaseLayout title="Notifications"> 
    <div className="notification-screen">
      {/* <div className="header pt-8 text-center">
        <h4 className="text-black text-xl font-bold">Notifications
        <p className="text-gray-400 font-medium text-xs">1 Unread</p>
        </h4>
      </div> */}

      <div className=" mt-3  px-4 h-screen pt-1">
      <div className="mt-6">
          <ul className="">
              <li className="flex items-center w-full border p-4 mb-4 rounded-tr-2xl rounded-br-2xl border-l-4" style={{borderLeftColor: "#01CEE3", backgroundColor:"#FFFCF5"}}> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="flex items-center w-full border p-4 mb-4 rounded-tr-2xl rounded-br-2xl bg-white hover:bg-gray-100 hover:shadow-md  transition transform hover:-translate-y-1 hover:scale-95"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">48 Mins Ago</span>
                  </div>
              </li>
              <li className="flex items-center w-full border p-4 mb-4 rounded-tr-2xl rounded-br-2xl bg-white hover:scale-95 hover:bg-gray-100 hover:shadow-md  transition transform hover:-translate-y-1"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="flex items-center w-full border p-4 mb-4 rounded-tr-2xl rounded-br-2xl bg-white hover:scale-95 hover:bg-gray-100 hover:shadow-md  transition transform hover:-translate-y-1"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="flex items-center w-full border p-4 mb-4 rounded-tr-2xl rounded-br-2xl bg-white hover:scale-95 hover:bg-gray-100 hover:shadow-md  transition transform hover:-translate-y-1"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
          </ul>
          <div className="text-center mt-6">
            <a href="#" className="underline text-gray-400 text-lg text-center ">Clear All</a>
          </div>
      </div>
      </div>
    </div>
    </BaseLayout>
  );
}; 

export default Notification;

