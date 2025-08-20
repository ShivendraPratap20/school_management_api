
# School Management API

The School Management API is a simple and efficient backend system built using Node.js and Express.js, designed to manage school information with ease. It allows users to add new schools and retrieve a list of schools sorted by their proximity to any given location. The API uses a MySQL database to store school details, including names, addresses, and geographical coordinates.

## Base URL
```http
https://event-management-api-93d2.onrender.com
```
    
## API Reference


| Method | Endpoint                 | Description                              |
| :----- | :----------------------- | :--------------------------------------- |
| `GET`  | `/api/listSchools`                | Returns an array of all schools            |
| `GET`  | `/api/listSchools/:id`        | Returns a school data |
| `GET`  | `/api/listSchoolsSort`        | Return an array with schools sorted as per the user's coordinates |
| `POST`  | `/api/addSchool`          | Add the data of a school |
| `PUT` | `/api/updateSchool/:id`       | Update a school data for the given school ID |
| `DELETE` | `/api/deleteSchool/:id`       | Delete a school data as per the given ID |


## Usage/Examples


**Request**
```http
GET /api/listSchools
```
**Response**

```json
{
    "status": "SUCCESS",
    "data": [
        {
            "id": 1,
            "name": "Sarswati Vidya Mandir",
            "address": "Vinewood Hills",
            "latitude": 43.646435,
            "longitude": 64.46464
        },
        {
            "id": 30001,
            "name": "BSM Public High school",
            "address": "Los Santos",
            "latitude": 20.352346,
            "longitude": 24.346363
        },
        {
            "id": 30003,
            "name": "Greenwood High School",
            "address": "123 Main Street, City A",
            "latitude": 28.6139,
            "longitude": 77.209
        },
        {
            "id": 30004,
            "name": "Sunrise Academy",
            "address": "456 Park Avenue, City B",
            "latitude": 28.7041,
            "longitude": 77.1025
        },
        {
            "id": 30005,
            "name": "Riverdale School",
            "address": "789 River Road, City C",
            "latitude": 28.5355,
            "longitude": 77.391
        }
    ]
}
```
**Request**
```http
GET /api/listSchools/:id
```
**Response**
```json
{
    "status": "SUCCESS",
    "data": {
        "id": 30003,
        "name": "Greenwood High School",
        "address": "123 Main Street, City A",
        "latitude": 28.6139,
        "longitude": 77.209
    }
}
```

**Request**
```http
GET /api/listSchoolsSort
```
**Response**
```json
{
    "status": "SUCCESS"
    "data": [
        {
            "id": 30001,
            "name": "BSM Public High school",
            "address": "Los Santos",
            "latitude": 20.352346,
            "longitude": 24.346363,
            "distance_km": 9216.530894941045
        },
        {
            "id": 1,
            "name": "Sarswati Vidya Mandir",
            "address": "Vinewood Hills",
            "latitude": 43.646435,
            "longitude": 64.46464,
            "distance_km": 9754.364546478924
        },
        {
            "id": 30004,
            "name": "Sunrise Academy",
            "address": "456 Park Avenue, City B",
            "latitude": 28.7041,
            "longitude": 77.1025,
            "distance_km": 11740.674650999044
        },
        {
            "id": 30003,
            "name": "Greenwood High School",
            "address": "123 Main Street, City A",
            "latitude": 28.6139,
            "longitude": 77.209,
            "distance_km": 11753.899961838137
        },
        {
            "id": 30005,
            "name": "Riverdale School",
            "address": "789 River Road, City C",
            "latitude": 28.5355,
            "longitude": 77.391,
            "distance_km": 11768.69388622724
        }
    ]
}
```

**Request**
```http
POST /api/addSchool
```
Request Body
```json
{
    "name":"Great Mount School",
    "address":"Liberty City",
    "latitude": 20.752346234,
    "longitude":24.54636346
}
```
**Response**
```json
{
    "status":"SUCCESS",
    "message":"Data added successfully"
    "data":{
        {
            "id": 90002,
            "name":"Great Mount School",
            "address":"Liberty City",
            "latitude": 20.752346234,
            "longitude":24.54636346
        }
    }
}
```

**Request**
```http
PUT /api/updateSchool/1
```
Request Body
```json
{
    "name":"School of Arts",
    "address":"Liberty City",
    "latitude": 30.752346234,
    "longitude":24.54636346
}
```
**Response**
```json
{
    "status": "SUCCESS",
    "message": "School updated successfully",
    "data": {
        "name":"School of Arts",
        "address":"Liberty City",
        "latitude": 30.752346234,
        "longitude":24.54636346
    }
}
```

**Request**
```http
DELETE /api/deleteSchool/60001
```
**Response**
```json
{
    "status": "SUCCESS",
    "message": "School deleted successfully"
}
```
### Databases

This project uses **MySQL** as the primary database engine to store school information. For online deployment or cloud-based environments, you can use **TiDB**—a MySQL-compatible distributed database service offering high availability and scalability.

### 1. Local MySQL Setup

- **Install MySQL:**
Make sure MySQL is installed on your local machine.
- **Create a new database:**
Example: `school_db`
- **Create the schools table:**
Run the following SQL statement:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```


### 2. Using TiDB for Online MySQL-Compatible Database

- **TiDB** is a distributed SQL database fully compatible with MySQL clients and protocols.
- You can create a TiDB cluster or use [TiDB Cloud](https://tidbcloud.com/) to manage your database online.
- Connect your Node.js application to TiDB using the same credentials as MySQL (host, port, user, password, and database name) or using connection URI string.

***




##  Deployment

This API is hosted on [Render](https://render.com/), a cloud service for easily deploying web applications and APIs. The backend connects to a TiDB database instance, which provides a MySQL-compatible, scalable cloud database.

### Deployment Steps (for reference or redeployment)

1. **Push your codebase to a Git repository** (GitHub, GitLab, or Bitbucket).
2. **Create a new Web Service on Render:**
    - Log in to your Render account.
    - Click "New Web Service" and connect your repository.
    - Set the environment (Node.js) and configure build/start commands (`npm install` \& `npm start`).
    - Add environment variables for your TiDB database connection:
        - `Connection URI string`
3. **Provision and connect to TiDB:**
    - Sign up for [TiDB Cloud](https://tidbcloud.com/) and create a new TiDB cluster.
    - Retrieve connection details and use these in your Render environment variables.
4. **Deploy:**
    - Deploy your service. Render will build and run your API, connecting to TiDB for persistent data storage.
5. **Access:**
    - Once deployed, your API will be accessible at the Render-provided URL (e.g., `https://school-management-api-m67g.onrender.com`).

***


