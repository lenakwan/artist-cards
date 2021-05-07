# Artist Card

# API Reference

## Introduction

Hello! This API was developed by Lena Kwan as a solution to help artists consolidate all their information/pricing onto one website. Please feel free to use it!

The Artist Card API was created to store data about users, their user settings, their pricing for store items and links to other websites such as social media. APIV1 is a REST API that allows API access via HTTP protocol at a predefined set of URLs. These URLs allow you, the developer, to access various resources which can have methods performed on them (GET/POST/PUT/DELETE). 

---

## What can be done with the API?

### Example Applications

The API can be reused to create other applications, for example: a farmer's market directory that can display store summaries, or an artist alley that lets artists display their prices.

### Artist Card Application
I used the API to create a front page that lets you search existing users by category and look them up on the application. You can also register as a user to create your own card.


---

### Database

To create your own copy of the database schema, please refer to the project brainstorm.txt. If you would like a db dump of what I have, please feel free to contact me!

> CREATE TABLE users(
username VARCHAR(40) NOT NULL,
password VARCHAR(40) NOT NULL,
id SERIAL PRIMARY KEY
);

> CREATE TABLE user_settings (
id INT,
category VARCHAR(20),
name VARCHAR(40) NOT NULL,
status BOOLEAN NOT NULL,
bg_img BOOLEAN NOT NULL,
bg_link VARCHAR(255) NOT NULL,
bg_color VARCHAR(10) NOT NULL,
header_bg_img BOOLEAN NOT NULL,
header_bg_link VARCHAR(255) NOT NULL,
header_bg_color VARCHAR(10) NOT NULL,
profile_img TEXT NOT NULL,
content_color VARCHAR(10) NOT NULL,
pricing BOOLEAN NOT NULL,
PRIMARY KEY(id),
CONSTRAINT id
FOREIGN KEY(id)
REFERENCES users(id)
);

> CREATE TABLE pricing(
id INT,
item_name VARCHAR(40) NOT NULL,
item_price NUMERIC NOT NULL,
PRIMARY KEY(id, item_name),
CONSTRAINT id
FOREIGN KEY(id)
REFERENCES users(id)
);

> CREATE TABLE links(
id INT,
link_name VARCHAR(40) NOT NULL,
link_url VARCHAR(255) NOT NULL,
PRIMARY KEY(id, link_name),
CONSTRAINT id
FOREIGN KEY(id)
REFERENCES users(id)
);

---

## Core Resources

### User Settings

This is an object representing user settings for their card. It lets them customize their page to add a personal touch.

> {
"id": 4,
"name": "Jason Artka",
"status": false,
"bg_img": true,
"bg_link": "[https://images.unsplash.com/photo-1500423079914-b65af272b8db?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzQ0NTA3fHxlbnwwfHx8&ixlib=rb-1.2.1&w=1000&q=80](https://images.unsplash.com/photo-1500423079914-b65af272b8db?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzQ0NTA3fHxlbnwwfHx8&ixlib=rb-1.2.1&w=1000&q=80)",
"bg_color": "black",
"header_bg_img": true,
"header_bg_link": "[https://images.unsplash.com/photo-1569224573545-253cdcd7b0fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGlnaHQlMjBza3l8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80](https://images.unsplash.com/photo-1569224573545-253cdcd7b0fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGlnaHQlMjBza3l8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80)",
"header_bg_color": "white",
"profile_img": "[https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrRzfV4tISZh-hMo5mF5osjxYcopuSHhZjg&usqp=CAU](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrRzfV4tISZh-hMo5mF5osjxYcopuSHhZjg&usqp=CAU)",
"content_color": "gray",
"pricing": true,
"category": "Website Design"
}

Attributes

- id *integer*
    - integer used to identify the user in the database.
    - example: '21'
- name *string*
    - string representing the user's unique username, this cannot be changed.
    - example: 'test123'
- status *boolean*
    - boolean representing if the store is open or closed
    - example 'true'
- bg_img *boolean*
    - boolean representing if the background image will replace the background color
    - example 'true'
- bg_link *string*
    - string containing url to image resource
    - example 'www.domain.com/cat.jpg'
- bg_color *string*
    - string containing a hexadecimal color
    - example '#000000'
- header_bg_img *boolean*
    - boolean representing if the header background image will replace the background color
    - example 'true'
- header_bg_link *string*
    - string containing url to image resource
    - example 'www.domain.com/cat.jpg'
- header_bg_color *string*
    - string containing a hexadecimal color
    - example '#000000'
- profile_img *string*
    - string containing a url to an image resource
    - example 'www.domain.com/yourface.jpg'
- content_color *string*
    - string containing a hexadecimal color
    - example '#000000'
- pricing *boolean*
    - boolean representing if the pricing will be displayed
    - example 'true'
- category *string*
    - string representing the store category
    - example 'true'

- Methods
    - GET
        - 'userSettings/:id'

            Use Case: Get user settings based on id

        - '/categories'

            Use Case: Retrieve all unique categories

        - '/categories/:category'

            Use Case: Retrieve all users belonging to a specific category

        - "/getArrival"

            Retrieve all COVID positive flights for an airport.

        - "/getDeparture"

            Retrieve all COVID postiive flights leaving an airport.

    - POST
        - '/userSettings'

            Use Case: Create user setting for new user.

    - PUT
        - '/userPricing/:id'

            Toggle user pricing to true or false

        - '/userContent/:id'

            Change user content colour

        - '/userProfile/:id'

            Change User Profile Picture

        - '/userHeader/:id'

            Change User Header background image, toggle boolean for it, change background colour.

        - '/userBackground/:id'

            Change user background image, toggle boolean for it, change background colour.

        - '/userStatus/:id'

            Change user store status

        - '/userName/:id'

            Change user display name

        - '/categories/:id'

            Change user category

### Users

This is an object representing users for your application. 

Attributes

- user_id *int*
    - Number associated with the user, incremental.
- password *string*
    - string containing user password.
    - example: 'iLikeBobaTea1234!'
- user_name *string*
    - string containing user name
    - example 'Lena'

- Methods
    - GET
        - '/userCategory/:category'

            Retrieve user name based on their location

    - POST
        - '/login'

            Authenticate a user

        - 'register'

            Registers a user. 

### Locations

This is an object representing links stored by your users.

> {
"id": 12,
"link_name": "Linkedin",
"link_url": "[www.linkedin.com/in/lena-kwan/](http://www.linkedin.com/in/lena-kwan/)"
}

Attributes

- id *integer*
    - integer, user id is a foreign key from Users
    - example '12'
- link_name *string*
    - string, description for the link
    - example: 'LinkedIn'
- link_name *string*
    - string, url to the website
    - example 'www.google.com'

- Methods
    - GET
        - '/links/:id'

            Retrieve links of the specified user.

    - POST
        - '/links'

            Creates a new link for the user

    - DELETE
        - "/links/:id"

            Deletes the link for the user. 

### Pricing

This is an object representing prices stored by your users.

> {
"id": 12,
"item_name": "Full Body Sketch",
"item_price": "250"
}

Attributes

- id *integer*
    - integer, user id is a foreign key from Users
    - example '12'
- item_name *string*
    - string, name of item being sold
    - example: 'Oil on Canvas'
- item_price *float*
    - float, price of item
    - example '120.50'

- Methods
    - GET
        - '/pricing/:id'

            Retrieve all prices of the user

    - POST
        - '/pricing'

            Creates a new price for the user

    - PUT
        - ''/price/:id'

            Edit single price of a user

    - DELETE
        - '/pricing/:id'

            Deletes all prices for a user 

        - '/price/:id'

            Deletes a single price of a user

---

## Contact Me

https://www.linkedin.com/in/lena-kwan/
