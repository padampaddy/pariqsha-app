import BaseLayout from "../layouts/Base";

const Notification = () => {
  return (
    <BaseLayout title="Notifications"> 
  
      <div className=" mt-3  px-4 h-screen pt-1">
      <div className="mt-6">
          <ul className="">
              <li className="notification-list border-l-4" style={{borderLeftColor: "#01CEE3", backgroundColor:"#FFFCF5"}}> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="notification-list"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">48 Mins Ago</span>
                  </div>
              </li>
              <li className="notification-list"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="notification-list"> 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>Celeb John</b> <span className="text-gray-400 pl-2">send you a msg</span></p>
                      <span className="text-gray-400">2 Mins Ago</span>
                  </div>
              </li>
              <li className="notification-list"> 
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

    </BaseLayout>
  );
}; 

export default Notification;

