const user = localStorage.getItem("session");
if (!user) {
    $("#user-info").html("Error 404 - User Not Found<br/>");
    $("#user-info").append('<div class="text-center"><br/><button type="button" id = "back-button" class="btn btn-dark">Back</button></div>');
}

$("#back-button").click(() => {
    window.history.back();
})

fetchUserInformation = () => {
    fetch('https://artist-cards.herokuapp.com/v1/userSettings/' + localStorage.getItem('session'), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).
    then(res => {
            if (res.status == 200) {
                console.log("User Found");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('User not in database.');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            $("#user-name").html(data[0].name);
            $("#user-category").html(data[0].category);
            $("#user-profile").attr("src", data[0].profile_img);
            if (data[0].status == true) {
                $("#user-status").html("Open");
            }
            //Style Header
            if (data[0].header_bg_img == true) {
                document.getElementById("user-card").style.backgroundImage = 'url("' + data[0].header_bg_link + '")';
                document.getElementById("user-card").style.backgroundSize = 'cover';
            } else {
                document.getElementById("user-card").backgroundColor = data[0].header_bg_color;
            }
            //Style Background
            if (data[0].bg_img == true) {
                document.body.style.backgroundImage = 'url("' + data[0].bg_link + '")';
                document.body.style.backgroundSize = 'cover';
            } else {
                document.body.style.backgroundColor = data[0].bg_color;
            }
            //display price
            if (data[0].pricing == true) {
                $("#user-price-toggle").css('display', 'block');
                fetchUserPricing();
            }
        }).
    catch(e => {
        registerUserDefaults();
        location.reload();
    });
}

fetchUserLinks = () => {
    fetch('https://artist-cards.herokuapp.com/v1/links/' + localStorage.getItem('session'), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).
    then(res => {
            if (res.status == 200) {
                console.log("User Found");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('User not in database.');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            if (!data[0]) {
                $("#user-links-toggle").css('display', 'none');
            } else {
                $("#user-links-toggle").css('display', 'block');
                $("#user-links").empty();
                for (i = 0; i < data.length; i++) {
                    current_url = "http://" + data[i].link_url;
                    let link_button = document.createElement("a");
                    let spacing = document.createElement("BR");
                    link_button.className = "user-buttons btn btn-info btn-block";
                    link_button.innerHTML = data[i].link_name;
                    link_button.setAttribute('href', current_url);
                    document.getElementById("user-links").appendChild(link_button);
                    document.getElementById("user-links").appendChild(spacing);
                }
            }
        }).
    catch(e => {
        console.log(e);
    });
}

fetchUserPricing = () => {
    fetch('https://artist-cards.herokuapp.com/v1/pricing/' + localStorage.getItem('session'), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).
    then(res => {
            // console.log(res.json);
            if (res.status == 200) {
                console.log("User Found");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('User pricing not created');
            } else {
                // console.log(res.json);
            }
        })
        .then(data => {
            if (data[0]) {
                $("#user-prices").empty();
            }
            for (i = 0; i < data.length; i++) {
                let spacing = document.createElement("div");
                spacing.className = "row";
                let item_name = document.createElement("p");
                let item_price = document.createElement("p");
                let newDiv = document.createElement("div");
                let priceDiv = document.createElement("div");
                priceDiv.className = "col";
                newDiv.className = "col";
                item_price.className = "user-buttons btn btn-light btn-block";
                item_name.className = "user-buttons btn btn-light btn-block";
                item_name.innerHTML = data[i].item_name;
                let price = parseInt(data[i].item_price);
                item_price.innerHTML = "$" + price.toFixed(2);
                spacing.appendChild(newDiv);
                spacing.appendChild(priceDiv);
                priceDiv.appendChild(item_price);
                newDiv.appendChild(item_name);
                document.getElementById("user-prices").appendChild(spacing);

            }
        }).
    catch(e => {
        console.log(e);
    });
}
/**
 * Populates the drop down menu with all categories found from the api.
 */
populateDropdown = () => {
    let price_dropdown = $('#prices-dropdown');
    price_dropdown.empty();
    price_dropdown.append('<option selected="true" disabled>Choose Item to Delete</option>');
    price_dropdown.prop('selectedIndex', 0);

    const url = 'https://artist-cards.herokuapp.com/v1/pricing/' + localStorage.getItem('session');
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            price_dropdown.append($('<option></option>').attr('value', entry.item_name).text(entry.item_name));
        })
    });

    let link_dropdown = $('#links-dropdown');
    link_dropdown.empty();
    link_dropdown.append('<option selected="true" disabled>Choose Item to Delete</option>');
    link_dropdown.prop('selectedIndex', 0);

    const link_url = 'https://artist-cards.herokuapp.com/v1/links/' + localStorage.getItem('session');
    $.getJSON(link_url, function (data) {
        $.each(data, function (key, link_entry) {
            link_dropdown.append($('<option></option>').attr('value', link_entry.link_name).text(link_entry.link_name));
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

$("#name_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userName/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("input_display_name").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Name Change Success");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('name changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#category_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/categories/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: document.getElementById("input_category").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Category Change Success");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('category changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#input_image_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userProfile/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profile_img: document.getElementById("input_img").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Image Change Success");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('category changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#status_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userStatus/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: document.getElementById("input_status").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                throw new Error('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        alert.log(e);
    });
});

$("#header_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userHeader/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            header_bg_img: document.getElementById("input_header_bg").value,
            header_bg_link: document.getElementById("input_header_link").value,
            header_bg_color: document.getElementById("input_header_color").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#bg_change_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userBackground/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bg_img: document.getElementById("input_bg").value,
            bg_link: document.getElementById("input_bg_link").value,
            bg_color: document.getElementById("input_bg_color").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});

$("#add_link_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/links/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(localStorage.getItem('session')),
            link_url: document.getElementById("add_link_url").value,
            link_name: document.getElementById("add_link_name").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});

$("#input_price_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/pricing', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(localStorage.getItem('session')),
            item_name: document.getElementById("input_item_name").value,
            item_price: document.getElementById("input_price").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#store_display_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/userPricing/' + localStorage.getItem('session'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pricing: document.getElementById("input_store_display").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});

$("#delete_price_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/price/' + localStorage.getItem('session'), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_name: document.getElementById("prices-dropdown").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});


$("#delete_link_submit").click(() => {
    fetch('https://artist-cards.herokuapp.com/v1/links/' + localStorage.getItem('session'), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link_name: document.getElementById("links-dropdown").value
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                // alert("Status Change Success");
                return res.json();

            } else if (res.status == 404) {
                console.log('Cannot Access User');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log('status changed');
            location.reload();
        }).
    catch(e => {
        console.log(e);
    });
});
fetchUserInformation();

fetchUserLinks();