# Back-end application + CMS for Kwismeister

This software is mandatory for running the kwismeister app/website. It is primarily powered by PayloadCMS V2 and Socket.IO, and runs on a MongoDB. Configuration goes via a .env file, and publication via PM2.


## Notes
First time deploying, you'll need to run the pm2 setup script.

```
pm2 deploy ecosystem.config.js production setup
```
