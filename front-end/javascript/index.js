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

$(document).ready(function () {
  $("#username_submit").click(() => {
    fetch('https://shopify-challenge-db.herokuapp.com/v1/login', {
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
        localStorage.setItem('session', data[0].user_id);
        location.href = "./inventory.html";
      }).
    catch(e => {
      alert(e);
    });
  });

})