const getButton = document.getElementById('get-button');
const sendButton = document.getElementById('send-button');


const sendRequest = function(method, url, data){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest(); //new request object
        //GET,POST,PUT,DELETE,OPTIONS,HEAD
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");

        //xhr.send(data);

        xhr.onload = function(){
           // console.log(xhr.status);
            if(xhr.statux >= 400){
                reject(xhr.response);
            }
            else{
                resolve(xhr.response);         
            }
        };
        //when network special error call
        xhr.onerror = function(){
            reject('something is wrong');
        }
        /*
        xhr.onload = function(){
            const result = xhr.response;
            console.log(JSON.parse(result)); //this is javascript obj
        };
        */
    });
    return promise;
};


const getData = function(){
    sendRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1')
    .then(responseData => {
        console.log(responseData);
    });
};

const sendData = function(){
    sendRequest("POST", "https://jsonplaceholder.typicode.com/posts",
    JSON.stringify({
        title: "foo",
        body: "bar",
        userID: 1,
    })
    ).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    })
};

getButton.addEventListener("click", getData);
sendButton.addEventListener("click", sendData);
