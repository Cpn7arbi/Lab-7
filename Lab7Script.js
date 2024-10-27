const xhrSearchBtn = document.getElementById("xhrSearch");
const fetchSearchBtn = document.getElementById("fetchSearch");
const fetchAsyncAwaitBtn = document.getElementById("fetchAsyncAwaitSearch");

const searchQuery = document.getElementById("queryInput");
const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "lzXgP9LQf3lQUquCAJfDgj4GZZx_npaxKUU0duQYNH0"; 

xhrSearchBtn.addEventListener("click", searchUsingXHR);
fetchSearchBtn.addEventListener("click", searchUsingFetchPromises);
fetchAsyncAwaitBtn.addEventListener("click", searchUsingFetchAsyncAwait);

function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();
    if (!queryTerm) return alert("Please enter a search term.");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}?query=${queryTerm}`);
    xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const responseObj = JSON.parse(xhr.responseText);
                createImages(responseObj);
            } else {
                alert("Error fetching images with XHR.");
            }
        }
    };
    xhr.send();
}

function searchUsingFetchPromises() {
    let queryTerm = searchQuery.value.trim();
    if (!queryTerm) return alert("Please enter a search term.");

    fetch(`${API_URL}?query=${queryTerm}`, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_KEY
        }
    })
    .then(response => response.json())
    .then(data => createImages(data))
    .catch(error => alert("Error fetching images with Fetch Promises."));
}

async function searchUsingFetchAsyncAwait() {
    let queryTerm = searchQuery.value.trim();
    if (!queryTerm) return alert("Please enter a search term.");

    try {
        const response = await fetch(`${API_URL}?query=${queryTerm}`, {
            method: "GET",
            headers: {
                "Authorization": "Client-ID " + ACCESS_KEY
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const responseObj = await response.json();
        createImages(responseObj);
    } catch (error) {
        alert("Error fetching images with Fetch Async/Await.");
    }
}

function createImages(data) {
    const resultsElem = document.getElementById("results");
    resultsElem.innerHTML = ""; 
    data.results.forEach(item => {
        const imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description || "Image from Unsplash";
        resultsElem.appendChild(imgElem);
    });
}
