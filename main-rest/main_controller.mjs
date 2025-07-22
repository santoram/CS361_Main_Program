// Express server as the main controller

import express from 'express'

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const ERROR_NOT_FOUND = {Error: 'Not found'}

// starts the server
app.listen(PORT, async () => {
    // await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

//