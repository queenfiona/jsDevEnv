import {getUsers} from './api/userApi';

getUsers().then(result=>{
  console.log(result);//eslint-disable-line no-console
  let userBody = "";

  if (result) {
    result.forEach(user=>{
      userBody+= `<tr>
      <td><a href='#' data-id="${user.id}" class=deleteUser>Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
    });

    global.document.getElementById('users').innerHTML = userBody;
  } else{
    global.document.getElementById('users').innerText = "No data could be found";
  }
});
