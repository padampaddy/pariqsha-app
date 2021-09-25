import { DocumentNode, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { refreshToken } from "../api/user-api";
import userSlice from "../redux/slices/user-slice";
import store from "../redux/store";

const useAuthSubscription = function <T>(query: DocumentNode, params: any) {
    const [data, setData] = useState<T>()
    const { data: gData, error, loading } = useSubscription<T>(query, {
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
    return { data, loading };
}

export default useAuthSubscription;