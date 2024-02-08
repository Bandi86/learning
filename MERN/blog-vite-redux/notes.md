youtube link: https://www.youtube.com/watch?v=Kkht2mwSL_I&t=127s&ab_channel=React%26NextjsProjectswithSahand
github: https://github.com/sahandghavidel/mern-blog

# start

vite:
https://vitejs.dev/guide/
`npm create vite@latest`
tailwind:
https://tailwindcss.com/docs/guides/vite
`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init -p`

configure the tailwind.config file and the index.css

create pages
create routes for that

`npm i react-router-dom`

app.tsx
`import { BrowserRouter, Routes, Route } from "react-router-dom"`

create header for site
using https://flowbite.com/
`npm install flowbite flowbite-react`

add tailwind.config plugins:
`require('flowbite/plugin')`

add content:
`'node*modules/flowbite-react/lib/esm/\**/\_.js'`
restart the dev server

backend:
`npm init -y`
`npm i express dotenv mongodb mongoose cors bcrypt jsonwebtoken cookie-parser body-parser`

change package.json type module and scripts to dev: "nodemon index.js"

create index.js
connect to mongodb

create model and routes
middleware handling error

create register page ui
config proxy vite.config

creating footer

create login api
create login ui

redux:

```
npm install react-redux
npm install --save @types/react-redux
npm install @reduxjs/toolkit
```

store

provide to main file
create userSlice

redux persist to save information local
`npm i redux-persist`

combine reducers
add to main the created persist with persistGate

adding google auth
create project on firebase
`npm install firebase`
.env to save firebase apikey important to save in root
use it like that: apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

create new route for google

update the header

dark mode theme implementing
provide in main after themeProvider created
import dispatch and toggle to header and use onclick fn on button

profile page ui
make private
use location to get info what tab wee are

upload image functionality
build storage on firebase for image saving
add rules:

```
allow read;
allow write: if
request.resource.size < 2 * 1024 * 1024 &&
request.resource.contentType.matches('image/.*')
```

[react circular progress bar ](https://www.npmjs.com/package/react-circular-progressbar)
`npm i react-circular-progressbar`

create verify function to authorize user on update route
verify user function
remember to install cookie-parser

make update function to frontend
create reducer for update

- update start
- update failed

add delete route and functionality
create modal
create delete methods to userSlice

create logout functionality
uselogout hook

create admin role
add to cookie
create post ui
`npm i react-quill --save`
update the index.css

create create post route
only admin can post

show post for admin

create all post route
dashPosts ui

plugin for scroll bar table
`npm i tailwind-scrollbar`
add plugin to tailwind.config
`require('tailwind-scrollbar')`

delete and edit post methods
all user endpoint

post page ui

call to action component

comment section
make scroll to top component and import it to app

create comment model and the routes for that
comments ui
moment package
`npm i moment`

9:03
