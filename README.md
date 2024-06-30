# Movie Blog

Movie Blog is a project developed in React, where you can view information about the latest released movies as well as older ones. In this application, we offer a navigation menu where you can search for the movie you want, and it will provide you with all movies containing that name in their title. Within the details of each movie, you can view the poster, an overview of the plot, access to YouTube trailers, and the official movie page. Regarding specific information, it offers the revenue (collected based on confirmed figures; if the movie has not confirmed its revenue to date, the value will be 0). It also displays the genres and the companies involved in the production of the film.

For the development of this project, the following tools were used:

FireBase for authentication and user registration via email and password, utilizing a global context to make the information available throughout the application.
React-Router-Dom for managing the application's navigation.
Axios to call the 'api TMDB (https://developer.themoviedb.org/docs/getting-started)'.
React-YouTube to use the movie trailers from the API.
React-Icons for the icons used.
To handle the API information, I used another global context where, to improve the management of the 'state', I utilized a 'reducer'.
