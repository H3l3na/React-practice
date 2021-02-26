import axios from 'axios';

export default {
  getData: () =>
    axios({
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Accept": "application/json, text/plain, */*",
      },
      method: 'GET',
      url: 'http://localhost:8080/app/employees',
      responseType: 'json',
    }),

  delete: (id) =>
    axios.delete(`http://localhost:8080/app/employees/delete/${id}`),

  update: (id, user) =>
    axios.put("http://localhost:8080/app/employees/update" + "/" + id + "/", user, {
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Accept": "application/json, text/plain, */*",
      }
    }),

  getDepartments: () =>
    axios({
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Accept": "application/json, text/plain, */*",
      },
      method: 'GET',
      url: 'http://localhost:8080/app/departments',
      responseType: 'json',
    }),

    getDepartmentByName: (department) =>
    axios({
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Accept": "application/json, text/plain, */*",
      },
      method: 'GET',
      url: 'http://localhost:8080/app/departments/search?name='+department,
      responseType: 'json',
    }),

}