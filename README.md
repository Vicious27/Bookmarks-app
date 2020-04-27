                              --------------
                             // As a user: \\
                             ----------------

   [x] I can add bookmarks to my bookmark list. Bookmarks contain:
        title
        url link
        description
        rating (1-5)

   [x] I can see a list of my bookmarks when I first open the app
        All bookmarks in the list default to a "condensed" view showing only title and rating

   [x] I can click on a bookmark to display the "detailed" view
        Detailed view expands to additionally display description and a "Visit Site" link

   [x] I can remove bookmarks from my bookmark list

   [x] I receive appropriate feedback when I cannot submit a bookmark
        Check all validations in the API documentation (e.g. title and url field required)

   [x] I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

    (Extension feature - optional) I can edit the rating and description of a bookmark in my list
                        --------------------------
                      // Technical Requirements  \\
                       ----------------------------
   [x] Use fetch for AJAX calls and jQuery for DOM manipulation

   [x] Use namespacing to adhere to good architecture practices
        Minimal global variables
        Create modules in separate files to organize your code
        Logically group your functions (e.g. API methods, store methods...)

   [x] Keep your Data out of the DOM
        No direct DOM manipulation in your event handlers!
        Follow the React-ful design pattern - change your state, re-render your component

   [x] Use semantic HTML

   [x] Use a responsive and mobile-first design
        Visually and functionally solid in viewports for mobile and desktop

   [x] Follow a11y best practices
        Refer back to the lessons on accessibility, forms
