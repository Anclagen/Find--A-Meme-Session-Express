[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uezahtuR)
﻿![](http://images.restapi.co.za/pvt/Noroff-64.png)

# Noroff

# Back-end Development Year 1

### JavaScript Server - Course Assignment 1 <sup>V2</sup>

## Tasks

### General

- Navbar should include:
  - The central logo
  - A login or logout button depending on the user's current state.
  - The current username, using "Guest" if not logged in.

### Meme Overview Page

- API call should be made once, with 20 results started in object when initially loading the page.

  - These result should persist even after navigating and then returning to the page.
  - Only when the web app is closed, the server is restarted, and the web app is reopened should a new singular API call be made, storing the new results in the object again.
  - API URL (http://jss.restapi.co.za/memes) should be stored in a environment file

- Meme Table (On the overview page)

  - small image 20% of the images original size
  - name of the meme
  - details button leading to the meme details page
  - guest users should not be able to see the details button
  - for row where the details button has been clicked they should be highlighted in a different color to show they have been visited. (This should persist even after refreshing or navigating away from the page and returning)

- Search Functionality(On the overview page)

  - The search functionality should be done in the back-end and not the front-end.
  - The search should be done on the name of the meme.
  - The user should input the search term in a text box and click a search button to search.
  - The search results should be displayed in the existing table.
  - When the input is cleared, the table should return to its original state.

### Meme Details Page

-The meme details page should be accessible by clicking the details button on the meme table on the overview page and include the following:

- ID
- URL
- Image
- Name
- Dimensions (width, height)
- If a Guest user enters the URL of a meme to access the details for that meme, they would need to be redirected to the login page.

### Login Page

- The login page should include a form with the following fields:
  - Username
  - Password
