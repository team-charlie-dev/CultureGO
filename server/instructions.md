To build the server and start it, follow these steps:

1.  go to server dicrectory
2.  run `npm install`
3.  create a `.env` file in the root directory of the server
4.  add the following to the `.env` file:
    ```
    API_KEY=<your-api-key>
    DB_URL=<your-project-url>
    ```
5.  run `npm start`

how to get api key and project url?
go to supabase.com and go to teamcharlie project. In Home page, scroll down then you can see both API KEY and Project URL under Project API. Copy and paste them to .env file.
