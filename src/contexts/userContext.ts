import { createContext} from "react";


export interface IUserContext {
  coinsBalance: number;
}

const UserContext =  createContext<IUserContext>({
  coinsBalance: 0,
})

export default UserContext;