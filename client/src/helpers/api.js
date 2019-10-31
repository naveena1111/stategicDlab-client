import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:4001/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  if (error.request.status === 403) {
    alert("warning");
  } else if (error.request.status === 401) {
    alert(error.response.data.message);
  } else if (error.request.status === 500) {
    alert(error.response.data.message);
  } else {
    alert("Network connection failed ");
  }
  return Promise.reject(error);
});


export const httpServices = {};

httpServices.get = get;
httpServices.post = post;
// httpServices.put = put;
// httpServices.remove = remove;


//http api call for get method
function get(url) {
  return axios.get(url).then((response) => {
    return response;
  }).catch((error) => {
    console.error("GetError", error);
  });
}

//http api call for post method
function post(url, params) {
  return axios.post(url, params).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  })
}

// //http api call for put method
// function put(url,params){
//    axios.put(url+'/'+params['id'],data).then((response) => {
//       return response;
//   }).catch((error) =>{
//       console.log(error);
//   })
// }

// //http api call for delete method
// function remove(url,id){
//     return axios.delete(url+'/'+id).then((response) =>{
//           return response;
//   }).catch((error) => {
//     console.log(error);

//   });
// }
