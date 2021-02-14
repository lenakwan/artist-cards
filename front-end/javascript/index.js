/**
 * Populates the drop down menu with all categories found from the api.
 */
populateDropdown = () => {
  let dropdown = $('#category-dropdown');

  dropdown.empty();

  dropdown.append('<option selected="true" disabled>Choose Artist Category</option>');
  dropdown.prop('selectedIndex', 0);

  const url = 'https://artist-cards.herokuapp.com/v1/categories';
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      dropdown.append($('<option></option>').attr('value', entry.category).text(entry.category));
    })
  });
}
populateDropdown();

registerUserDefaults = () => {
  fetch('https://artist-cards.herokuapp.com/v1/userSettings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: localStorage.getItem('session'),
      category: "No Category",
      user_status: "false",
      bg_img: false,
      bg_link: "https://data.whicdn.com/images/262688766/original.gif",
      bg_color: "white",
      name: "Set a Display Name",
      header_bg_img: false,
      header_bg_link: "https://data.whicdn.com/images/262688766/original.gif",
      header_bg_color: "black",
      profile_img: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      content_color: "white",
      pricing: false
    }),
  }).
  then(res => {
      console.log(res.json);
      if (res.status == 200) {
        console.log("Login Success");
        return res.json();

      } else if (res.status == 404) {
        throw new Error('Invalid Login.');
      } else {
        console.log(res.json);
      }
    })
    .then(data => {
      localStorage.setItem('session', data[0].user_id);
      location.href = "./management.html";
    }).
  catch(e => {
    alert(e);
  });
}
$(document).ready(function () {
  $("#username_submit").click(() => {
    console.log($('#username_input').val());
    fetch('https://artist-cards.herokuapp.com/v1/user/' + $('#username_input').val(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).
    then(res => {
        console.log(res.json);
        if (res.status == 200) {
          console.log("User Found!");
          return res.json();
        }
      })
      .then(data => {
        localStorage.setItem('user', data[0].id);
        window.location.href = "./user.html";
      }).
    catch(e => {
      console.log(e);
      localStorage.clear();
      window.location.href = "./user.html";
    });
  });

  $("#login_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
      }),
    }).
    then(res => {
        console.log(res.json);
        if (res.status == 200) {
          console.log("Login Success");
          return res.json();

        } else if (res.status == 404) {
          throw new Error('Invalid Login.');
        } else {
          console.log(res.json);
        }
      })
      .then(data => {
        localStorage.setItem('session', data[0].id);
        location.href = "./management.html";
      }).
    catch(e => {
      alert(e);
    });
  });

  $("#register_submit").click(() => {
    location.href = "./register.html";
  })

  $("#back_submit").click(() => {
    window.history.back();
  })

  $("#register_user_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
      }),
    }).
    then(res => {
        console.log(res.json);
        if (res.status == 200) {
          console.log("Register Success");
          return res.json();

        } else if (res.status == 409) {
          throw new Error('User already exists.');
        } else {
          console.log(res.json);
        }
      })
      .then(data => {
        let submitted_username = document.getElementById('userName').value;
        $("#submit_result").html("User Created!");
        registerUserDefaults();
      }).
    catch(e => {
      $("#submit_result").html(e);
    });
  });
})