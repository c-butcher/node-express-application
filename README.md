# NodeJS Application
This is a generic NodeJS application that contains basic user features.

+ NodeJS
+ Express
+ Passport
+ MongoDB
+ Mongoose

### Installation

```bash
> git clone https://github.com/c-butcher/node-express-application.git
```

```bash
> git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

```bash
> npm install
```

### Configuration

#### Package Information
You probably don't want your application to be called `node-express-application`, so you'll want to open
the `package.json` file, which is located in the root directory, and change the name and version of your
application to something more appropriate for your application.

```json
{
  "name": "node-express-application",
  "version": "0.1.0",
  ...
}
```

#### Environment Variables
In order to login using third-party authentication, such as Facebook or Twitter, you'll need to enable them
in the `.env` file, which can be created in the root directory. That's the same directory that `.gitignore`
can be found in.
 
```dotenv
# Google Authentication Credentials
GOOGLE_AUTH_ENABLED=true
GOOGLE_CLIENT_ID=cLiEnT_IdeNtIfieR
GOOGLE_CLIENT_SECRET=cLiEnT_SeCrEt
GOOGLE_CALLBACK_URL=http://yoursite.com/auth/google/callback

# Facebook Authentication Credentials
FACEBOOK_AUTH_ENABLED=true
FACEBOOK_CLIENT_ID=cLiEnT_IdeNtIfieR
FACEBOOK_CLIENT_SECRET=cLiEnT_SeCrEt
FACEBOOK_CALLBACK_URL=http://yoursite.com/auth/facebook/callback

# Twitter Authentication Credentials
TWITTER_AUTH_ENABLED=true
TWITTER_CLIENT_ID=cLiEnT_IdeNtIfieR
TWITTER_CLIENT_SECRET=cLiEnT_SeCrEt
TWITTER_CALLBACK_URL=http://yoursite.com/auth/twitter/callback
```