let navlinks = document.querySelector('.menu');

document.getElementById("ham").onclick = () => {
	navlinks.classList.toggle('active');
}

document.getElementById("navli1").onclick = () => {
	navlinks.classList.remove('active');
}
document.getElementById("navli2").onclick = () => {
	navlinks.classList.remove('active');
}
document.getElementById("navli3").onclick = () => {
	navlinks.classList.remove('active');
}




const API_KEY = "H2cwk2Jc1297H2L090sbLx8Lu620I4pGi4EnEiB8ysPI";
const CORS_PROXY_URL = 'http://localhost:8080/';
const IAM_URL = 'https://iam.cloud.ibm.com/identity/token';

function getToken() {
    console.log("Fetching token...");
    return fetch(CORS_PROXY_URL + IAM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${API_KEY}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(tokenResponse => {
        console.log("Token received:", tokenResponse);
        return tokenResponse.access_token;
    })
    .catch(error => {
        console.error("Error fetching token:", error);
        throw error; // Optional: propagate the error further
    });
}

function apiPost(token, payload) {
    const scoring_url = `https://private.us-south.ml.cloud.ibm.com/ml/v4/deployments/98802765-45ba-4884-8f37-ce4314eb4314/predictions?version=2021-05-01`;

    console.log("Making API post request...");
    return fetch(scoring_url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedPostResponse => {
        console.log("Scoring response:", parsedPostResponse);
        // Display or process the response as needed
    })
    .catch(error => {
        console.error("Error making API post request:", error);
        throw error; // Optional: propagate the error further
    });
}

function fetchTokenAndPost() {
    getToken()
    .then(token => {
        const payload = {
            "input_data": [{"fields": ["f1","f2","f3","f4","f5","f6"], "values": [1,2,3,4,5,6]}]
        };

        return apiPost(token, payload);
    })
    .catch(error => {
        // Handle token retrieval or API post errors
        console.error("Error in fetchTokenAndPost:", error);
    });
}

// Initiate the process
fetchTokenAndPost();

