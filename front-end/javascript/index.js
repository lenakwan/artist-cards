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

populateUserNames = () =>{
  console.log(document.getElementById('category-dropdown').value);
  let display = $('#user-names');
  display.empty();
  const url = 'https://artist-cards.herokuapp.com/v1/categories/'+ document.getElementById('category-dropdown').value;
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      const url = 'https://artist-cards.herokuapp.com/v1/categories/'+ entry.id;
    })
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

  $("#category-submit").click(() => {
    populateUserNames();
    $("#userModal").modal();
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
        $("#submit_result").html("User Created!");
      }).
    catch(e => {
      $("#submit_result").html(e);
    });
  });
})