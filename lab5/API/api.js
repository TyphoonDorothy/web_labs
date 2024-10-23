const BASE_URL = "http://localhost:1337/";
const RESOURCE_URL = `${BASE_URL}planes`;



const baseRequest = async ({urlPath = "", method = "GET", body = null}) => {
    try {
        const ReqParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (body) {
            ReqParams.body = JSON.stringify(body);
        }

        const response = await fetch(`${RESOURCE_URL}${urlPath}`, ReqParams);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Throws if response is not OK
        }
        
        return response; // Return the response object
    }
    catch (error) {
        console.error("Error in baseRequest:", error); 
    }
}


export const getAllPLanes = async () => {
    const rawResp = await baseRequest ({method: "GET"});

    return rawResp.json();
}

export const postPlanes = (body) => baseRequest({method: "POST", body});

export const deletePlanes = (id) => baseRequest({urlPath: `/${id}`, method: "DELETE"});

export const updatePlanes = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PATCH", body });

getAllPLanes();
