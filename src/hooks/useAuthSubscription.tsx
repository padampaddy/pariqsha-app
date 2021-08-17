import { DocumentNode, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { refreshToken } from "../api/user-api";
import userSlice from "../redux/slices/user-slice";
import store from "../redux/store";

const useAuthSubscription = function <T>(query: DocumentNode, params: object) {
    const [data, setData] = useState<T>()
    const { data: gData, error } = useSubscription<T>(query, {
        variables: params
    })
    useEffect(() => {
        if (error) {
            if ((error as any)?.extensions.code === 'start-failed') {
                refreshToken().then((token) => {
                    store.dispatch(userSlice.actions.saveToken(token))
                })
            }
        }
        else if (gData) {
            setData(gData)
        }
    }, [gData, error])
    return { data };
}

export default useAuthSubscription;