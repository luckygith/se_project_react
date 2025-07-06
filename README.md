# “WTWR” (a near-acronym for "What to Wear")

# SE_PROJECT_REACT - WTWR FRONT END APPLICATION

# DOMAIN NAME: bnene.com

[api.wtwr.bnene.com](https://api.wtwr.bnene.com)
[wtwr.bnene.com](https://wtwr.bnene.com)
[www.wtwr.bnene.com](https://www.wtwr.bnene.com)

Welcome to my project demonstration called WTWR !

first phase:

An application's front-end built from scratch excercising HTML, CSS, and Javascript with additonal functionality to the React front-end, serving the fundamentals of the javascript framework.
I will also be exhibiting the core piece of the application's functionality: interaction with the weather API. Using the asynchronous fetch requests, I make requests to this API. The response will include location-specific weather data, which will be parsed and utilized to filter out clothing cards unsuitable for the current weather.

Technologies and techniques used in this project includes:
-The basics of React and Redux
-How to build React apps with Create React App
-Modern React syntax, called hooks
-Understanding and correctly using the this keyword
-Authorization and authentication

# React + Vite “WTWR” (a near-acronym for "What to Wear")

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![WTWR interface](image.png)
![add clothes popup](image-1.png)
![weather conditions](image-2.png)

FIGMA DESIGN: https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=1-170&t=jOf4VV0ePuadhmch-0

second phase:

My goal for this iteration is to continue implementing functionality using the React features. I implement the following:

A temperature unit toggle switch using React context
A profile page route using React Router
Form submission using controlled components or refs

![Delete added clothes function](image-3.png)
![Main and Profile Route cards overflow](image-4.png)

third phase:

My goal for this phase is to implement authentication and authorization working with React front-end and backend functionality by implementing:
protection routes, registration, log-in, and user token features.

FIGMA DESIGN: https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=1-170&t=jOf4VV0ePuadhmch-0

UI updates:
![Log in UI](<Log in UI.jpg>)
![Add item and profile edit UI](<Add Item and Profile Edit UI.jpg>)
![general project features](<WTWR  features.jpg>)

LINK TO BACKEND:
https://github.com/luckygith/se_project_express.git

deployment phase: Deploying and hosting the cloud

This phase is aimed to create a remote server using google cloud services to apply our code to a virtual machine. Since before this phase, my server for this code was only accessible via IP address for a limited time when the server is up and running. For continuous online process management and avoiding crash reboot I have utilized Pm2 and created a subdomain registered under a public domain for both front and backend.

Technologies and techniques used in this portion includes:
-Google Cloud Services
-DNS
-PM2
-NginX
-Certbot( HTTPS traffic will be encrypted using SSL)
