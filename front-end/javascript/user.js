const user = localStorage.getItem("user");
if (!user) {
    $("#user-info").html("Error 404 - User Not Found<br/>");
    $("#user-info").append('<div class="text-center"><br/><button type="button" id = "back-button" class="btn btn-dark">Back</button></div>');
}

$("#back-button").click(() => {
    window.history.back();
})

fetchUserInformation = () => {
    fetch('https://artist-cards.herokuapp.com/v1/userSettings/' + localStorage.getItem('user'), {
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
        console.log(e);
    });
}

fetchUserLinks = () => {
    fetch('https://artist-cards.herokuapp.com/v1/links/' + localStorage.getItem('user'), {
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
                    current_url = "http://" + data[i].link_url ;
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
    fetch('https://artist-cards.herokuapp.com/v1/pricing/' + localStorage.getItem('user'), {
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
            if (data[0]){
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
fetchUserInformation();

fetchUserLinks();
