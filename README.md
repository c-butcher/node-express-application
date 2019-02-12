# Node / Express Application
This is a simple [ExpressJS](https://expressjs.com) application with a [Bootstrap](https://getbootstrap.com) theme and basic user authentication system
using [PassportJS](https://passportjs.org) and [MongoDB](https://mongodb.com).

Available authentication methods...

+ Google+
+ Facebook
+ Twitter

### Installation
First you'll want to download the application to your local machine...

```bash
> git clone https://github.com/c-butcher/node-express-application.git
```

If you have another repository that you want to push your application to, then you can change the origin
url using the following command. You'll also need to change the url to an actual repository for the
command to work.

```bash
> git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

If you don't have a repository that you can push to, then you'll still want to disconnect from the
`node-express-application` repository. This is because the `node-express-application` is a closed repository
that doesn't allow public pushes.

```bash
> git remote remove origin
```

Then you'll need to install all of the vendor scripts that are required for the application to run.
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