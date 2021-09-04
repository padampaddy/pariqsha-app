import BaseLayout from "../layouts/Base";



const notif = [{src:"https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",title:"Celeb John", subtitle: "send you a msg" , time:"2 Mins Ago"} ,
{src:"https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", title:"Celeb John", subtitle: "send you a msg", time:"2 Mins Ago"},
{src:"https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",title:"Celeb John", subtitle: "send you a msg" , time:"2 Mins Ago"} ,
{src:"https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", title:"Celeb John", subtitle: "send you a msg", time:"2 Mins Ago"}
]

const Notification = () => {
  return (
    <BaseLayout title="Notifications"> 
  
      <div className=" px-4 h-full flex-col flex pt-1">
      <div className="mt-6 h-full">
          <ul className="">
              {notif.flatMap((notifs,index)=>(
                  <li key={index} className="notification-list border-l-4" style={{borderLeftColor: "#01CEE3", backgroundColor:"#ffffff"}}
 
     
                  
                  > 
                  <div className="justify-center items-center">
                  <img className="inline object-cover w-8 h-8 rounded-full" src={notifs.src} alt="Profile image"/>
                  </div>
                  <div className="pl-4">
                      <p><b>{notifs.title}</b> <span className="text-gray-400 pl-2">{notifs.subtitle}</span></p>
                      <span className="text-gray-400">{notifs.time}</span>
                  </div>
              </li>
              ))}
             
          </ul>
          </div>
          <div className="text-center mt-6 mb-6">
            <a href="#" className="underline text-gray-400 text-lg text-center ">Clear All</a>
          </div>

      </div>

    </BaseLayout>
  );
}; 

export default Notification;