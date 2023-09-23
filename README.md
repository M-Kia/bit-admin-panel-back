This is the Back-End of my [Bit admin panel](https://github.com/M-Kia/bit-panel-front) project made by [Express.js](https://expressjs.com/).

## Bootstrap Project

First make sure that you have MySql installed in your system. should clone the back-end of this project ([express.js](https://github.com/M-Kia/bit-panel-back-express.git)). Then, clone this project:

```bash
git clone "https://github.com/M-Kia/bit-panel-back-express.git"
```

Then, after going to the created directory, run `npm install` to install dependencies. After that, you should create your '.env' file in the root folder with '.env.template' file and run the `npm run prisma:generate` and `npm run prisma:migrate` to prepare your database.

> You should create your database schema and use it's name in '.env' file.

Now you can run the development server for this project by running `npm run dev` and use the Front-End of this project.

Also you can run the production version of this project by running `npm start`.
