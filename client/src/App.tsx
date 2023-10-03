import { useState, useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import Index from "./Index";
import axios from "axios";

function App() {
    const [data, setData] = useState<unknown>([]);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL
    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/products")
            .then(function (response){
                setData(Object.values(response.data))
                setDataLoaded(true)
                console.log(response.data)
            })
            .catch(function (error){
                if(error){
                    setData([{}])
                    console.log(error)
                }
            })
    }, []);
    console.log(apiBaseUrl)
    return (
        <>
            <Auth0Provider
                domain={import.meta.env.VITE_REACT_APP_AUTH_DOMAIN}
                clientId={import.meta.env.VITE_REACT_APP_AUTH_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <>
                    <Index data={data} dataLoaded={dataLoaded} />
                </>
            </Auth0Provider>
        </>
    );
}

export default App;
