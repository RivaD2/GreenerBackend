# server: This repo holds the Express server, MongoDB connection, collections and models for the game logic/data for the Greener Frontend.


**Authors:**

- Bryant Davis
- Leah Russo
- Riva Davidowski (Oauth logic)


## Setup

### How to initialize/run the application:

You will need to clone the repo and do an `npm i`. Ensure that you have set up a MongoDB connection and that you have an Express server running on a designated Port.

**The following dependencies were used:**
```javascript
   "@code-fellows/supergoose": "^1.0.11",
    "base-64": "^1.0.0",
    "bcrypt": "^5.0.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "google-auth-library": "^6.1.3",
    "jest": "^26.6.3",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.8",
    "supertest": "^6.0.
```
**The entry point for this app is: `index.js`**

**Start server:**

```javascript
/* give it a port number and optionally pass a function to call when app starts listening on given port*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

```


**Connect to Database:**

```javascript
mongoose.connect(MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology: true} )
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB...',err));

```


### .ENV Requirements:

-PORT=3001

-CLIENT_ID=

-CLIENT_SECRET=

-MONGODB_URI=