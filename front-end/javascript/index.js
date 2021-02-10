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