import { createContext} from "react";


export interface IUserContext {
  coins: number;
}

const UserContext =  createContext<IUserContext>({
  coins: 0,
})

export default UserContext;