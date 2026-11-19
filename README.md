## NextJs SSR with GitHub OAuth

### Setup

- Create Neon postgres database and get the connection string.
- Create a GitHub OAuth application
  - Go to [GitHub Developer Settings](https://github.com/settings/apps)
  - Click on "New OAuth App"
  - Fill in the required fields:
    - Application Name: Your app name
    - Homepage URL: `http://localhost:3000`
    - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

- Clone the repository

```
git clone <repository-url>
```

- Navigate to the project directory

```
cd nextjs-ssr
```

- Install dependencies

```
npm install
```

- Create a `.env.local` file in the root of the project and add the following environment variables:

```
DATABASE_URL=your_neon_postgres_connection_string
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_SECRET=your_nextauth_secret
```

- Start the development server

```
npm run dev
```

- Open your browser and go to `http://localhost:3000` to see the application running.
