# Node-js file-upload api :tada:

## Getting Started
### :large_blue_diamond: Features :fire:
 :heavy_check_mark: upload file (☑️  image, 	🔲  video, 	🔲  pdf, 	🔲  audio)\
 :heavy_check_mark: get file url (cloud)\
 :heavy_check_mark: get all files from database

### :large_blue_diamond: Dependencies
  - [cloudinary](https://www.npmjs.com/package/cloudinary) - use for Cloud service (file store)
  - [multer](https://www.npmjs.com/package/multer) - use for pass file from (client / postman)
  - [dotenv](https://www.npmjs.com/package/dotenv) - use for access .env file data (process.env)
  - [express](https://www.npmjs.com/package/express) - use for nodejs web framwork
  - [mongoose](https://www.npmjs.com/package/mongoose) - use for DB related work
  - [nodemon](https://www.npmjs.com/package/nodemon) - use for automatically restarting the node application
  
### :large_blue_diamond: Setup
- Clone this repo to your desktop and run `npm install` to install all the dependencies.
- You might want to look into `temp.env`, your need to create `config.env` on env directory and chnage this kind of informations.
  - DB & Port related information
    - NODE_ENV=your-env
    - PORT=your-port
    - DATABASE=your-db-Str (cloud DB)
    - DATABASE_LOCAL=your-local-db-Str
    - DATABASE_PASSWORD=your-db-password
  - Cloud service related information [(npm here)](https://www.npmjs.com/package/cloudinary)
    - CLOUD_NAME=your-cloud-name
    - API_KEY=your-api-key
    - API_SECRET=your-api-secret

### :large_blue_diamond: Usage
- After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.
- Once the dependencies are installed, you can run `npm start` to start the application. 
- You will then be able to access it at `localhost:3000`

### :large_blue_diamond: API access
  :red_circle: **File-Upload** (post req): `http://localhost:3000/api/photo/upload`
  ```
  - body data
    ex: image-file: suzuki-gsx-r150.jpg
    
  - response 
  {
    "message": "success",
    "data": {
        "fileCreate": {
            "_id": "5ef2448bc63d46644a5c1849",
            "public_id": "ysagomhkjmaud5a3tjgw",
            "width": 1000,
            "height": 1000,
            "format": "jpg",
            "url": "http://res.cloudinary.com/eactivities/image/upload/v1592935563/ysagomhkjmaud5a3tjgw.jpg",
            "__v": 0
          }
      }
  }
  ```
  :red_circle: **Get-All-Files** (get req): `http://localhost:3000/api/photo/`
  ```
  {
    "status": "ok",
    "lenght": 2,
    "data": {
        "fileData": [
            {
                "_id": "5ef2440ec63d46644a5c1848",
                "public_id": "owurbpjyjwofu0kv06an",
                "width": 1000,
                "height": 1000,
                "format": "jpg",
                "url": "http://res.cloudinary.com/eactivities/image/upload/v1592935438/owurbpjyjwofu0kv06an.jpg",
                "__v": 0
            },
            {
                "_id": "5ef2448bc63d46644a5c1849",
                "public_id": "ysagomhkjmaud5a3tjgw",
                "width": 1000,
                "height": 1000,
                "format": "jpg",
                "url": "http://res.cloudinary.com/eactivities/image/upload/v1592935563/ysagomhkjmaud5a3tjgw.jpg",
                "__v": 0
            }
          ]
      }
  }
  ```
  

### :large_blue_diamond: I have a question. Where should I ask? :thinking:

If you have any query, feature request or if you find any kind of bug :beetle: in our site please let us know by simply opening a issue [here](https://github.com/pro-js/node-file-upload-api/issues).

### :large_blue_diamond: Can I contribute in this project? :smiley:

Of course you can. It is an open source project. If you want to contribute with us follow the procedures -

- Fork the repository in your github account.
- Clone it in your local and do the changes you want.
- Make a PR with proper documentation of what you did as they say _Lack of proper documentation is becoming a problem for acceptence_ :wink:

### :large_blue_diamond: Contributor :nerd_face:
Contributors who have worked hard to keep this application up to date are -
- [Jinnatul Islam Morol](https://www.facebook.com/mdjinnatul.islam)

### :large_blue_diamond: License and copyright
©[Morol](https://github.com/jinnatul) & This project is licensed under the terms of the MIT license.

### If you happen to like our work please give a star :star: on the repository
 
