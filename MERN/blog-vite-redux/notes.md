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
`npm i express dotenv mongodb mongoose cors bcrypt`

change package.json type module and scripts to dev: "nodemon index.js"

create index.js
connect to mongodb

create model and routes
middleware handling error
1:46
