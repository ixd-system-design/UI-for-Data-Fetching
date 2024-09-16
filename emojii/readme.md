# Random Emoji
This Replit presents users with a simple navigation bar that is connected to the [EmojiHub API](https://github.com/cheatsnake/emojihub). A series of category buttons are dynamically assembled and activated with JavaScript. Each button triggers a function that fetches and displays a random emoji within a specific category, using a relevant endpoint from the EmojiHub API.

# Learning Prompts
- In this example, the navigation menu is created from static (hard-coded) JSON data, while the emoji themselves are fetched dynamically from a remote endpoint URL. Can you weigh the pros and cons of this approach? Why not fetch the menu items and categories remotely as well? 
- It's fairly common for APIs to organize data into categories, as is done here. Can you adapt this example to work with a different API? (E.g. different Types of Spells in the [Wizarding World](https://wizard-world-api.herokuapp.com/swagger/index.html)) Can you work out how to map a set of Spell Types onto the relevant API endpoint(s)?
- How does the UTF-8 character set function? Can you explain why UTF8 is of particular importance when dealing with emojii?
- Have you ever made a layout using Flexbox? If not, you might like to study the CSS styles closely in this example. You might also like to review [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) on CSS Tricks.