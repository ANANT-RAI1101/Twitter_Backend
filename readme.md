# Twitter Backend

## Summary
The Twitter Backend System is a RESTful API built using Node.js, Express.js, and MongoDB that replicates core Twitter functionalities such as user authentication, tweeting, commenting, and liking.

### Clone Repository
```
git clone <your-repo-url>
cd twitter-backend
```
Install dependencies:

```bash
npm install
```

Run in development (uses `nodemon`):

```bash
npm run start
```

Run tests:

```bash
npm test
```
### Folder Structure
```
twitter-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── index.js
│
├── tests/
│
├── .env
├── package.json
└── README.md
```
## Environment variables

The project reads configuration from environment variables. Create a `.env` file in the project root with the values appropriate for your environment. Example variables referenced in the code:

- `PORT` — server listening port (e.g. `3000`).
- `KEY` — JWT secret used when signing/verifying tokens (the code expects a variable named `KEY`).
- `AWS_REGION` — AWS S3 region for file uploads.
- `AWS_SECRET_ACCESS_KEY` — AWS secret access key.
- `ACCESS_KEY_ID` — AWS access key id.
- `BUCKET_NAME` — S3 bucket name used by the file upload config.

```env
PORT=3000
KEY=your_jwt_secret_here
AWS_REGION=us-east-1
AWS_SECRET_ACCESS_KEY=your_aws_secret
ACCESS_KEY_ID=your_aws_key_id
BUCKET_NAME=your_bucket_name
```



## API endpoints 

All endpoints are prefixed with `/api/v1`:

- POST `/api/v1/signup` — register a new user.
- POST `/api/v1/login` — login (returns JWT).
- POST `/api/v1/tweets` — create a tweet.
- GET `/api/v1/tweets/:id` — fetch a tweet by id.
- POST `/api/v1/comments` — create a comment (requires authentication).
- POST `/api/v1/like/toggle` — toggle like (requires authentication).

Authentication: endpoints that require authentication use Passport JWT middleware and expect the token as a Bearer token in the `Authorization` header.

## Testing

- Unit tests are present under the `tests/` folder and run with Jest: `npm test`.


#### Author 
- Anant Rai

