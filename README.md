# MEAN Blogger Platform

<details open>
<summary><p>Note: Click to expand / collapse Documentation section</p></summary>
</details>

<details open>
<summary><h3>1. Project Overview</h3></summary>

<details open>
<summary><h4>1.1. Brief Description</h4></summary>

A **Single Page Application (SPA)** built with Angular that serves as the user interface for a comprehensive blogging and social platform. The application provides both public content access and authenticated user areas with social interaction features.

###  Key Features

- **User Management**: Public and private user areas with role-based access control
- **Content Management**: CRUD operations for blog posts and user public profiles  
- **Social Features**: Likes, dislikes, comments, and following public profiles
- **Modern UI/UX**: Responsive design using Tailwind CSS, custom HTML/CSS, SVG icons loaded via Angular Material service and Angular Animations
- **Cloud Integration**: Google Drive API integration for image storage
- **Deployment**: Production-ready deployment on Heroku
- **Quality Assurance**: 250+ unit tests for components, resolvers, and services
- **Additional Features**: Useful enhancements such as modal windows, pagination, reusable UI components, and a password visibility toggle in authentication forms
  
  
### Technical Implementation

| Component | Implementation Details |
|-----------|----------------------|
| **Architecture & Routing** | Client-side routing with 5+ dynamic pages, parameterized routes, and lazy-loaded feature modules |
| **Type Safety** | 5+ TypeScript interfaces ensuring strict type checking and clear data contracts |
| **State Management** | Service-based state management using Observable and BehaviorSubject for reactive data flow |
| **Observable Creation / Data Sources** | Creation of reactive sources using RxJS operators (of, interval, timer) and Angular Signal for reactive state |
| **Reactive Programming** | RxJS operators such as (map, switchMap, filter, take, takeUntil, startWith, finalize, startWith, catchError, throwError) for stream creation, transformation, and error handling |
| **Component Lifecycle** | Angular lifecycle hooks (OnInit, OnDestroy, AfterViewInit) for proper initialization and cleanup |
| **Data Presentation** | Custom and built-in pipes (uppercase, date, custom "time-ago") for dynamic data formatting |
| **Error Handling** | Global error handling pipeline using an HTTP interceptor to capture errors, an error service for state management, and dedicated UI components (ErrorNotificationComponent, custom error display) for user-friendly feedback |
| **Route Protection** | Dual guard system (AuthGuard + GuestGuard) for secure and restricted route access |


### Project Context

Developed as part of a **university final project**, this platform enhances the blogging experience by offering a user-friendly interface with comprehensive social features.

**Demo Site**: [View Live Application](https://blogger-app-a86fa2d19e9c.herokuapp.com)


### Test Accounts

You can use the following demo accounts to log in:

| Email              | Password   |
|--------------------|------------|
| teddy@gmail.com | 837483yg!334D    |
| mery@gmail.com | 837483yg!334D    |


### Application Preview
![Home Page](screenshots/home-page.png)
![Posts Page](screenshots/catalog-posts.png)
![Post Details](screenshots/post-details.png)
![Profile Details](screenshots/profile-details.png)
![Public Profile Details](screenshots/public-profile-details.png)
![Newsletter](screenshots/newsletter.png)


</details>

<details>
<summary><h4>1.2. Main Features/Functionalities</h4></summary>

<details>
<summary><h5>1.2.1. User Management</h5></summary>

- User registration and authentication 
- Profile creation and management 
- Like and dislike posts
- Create comments on posts
- Follow other users
- Avatar/profile picture support using Gravatar
</details>

<details>
<summary><h5>1.2.2. Blog Features</h5></summary>

- Create, Read, Update, and Delete posts (CRUD operations)
- Social interactions: likes, dislikes, and comments
- Public post catalog and detailed post views
- Image upload and management via Google Drive API
</details>

<details>
<summary><h5>1.2.3. Core Platform Features</h5></summary>

- **Authentication & Authorization**
  - Secure JWT-based authentication
  - Session management using cookie-parser middleware 
  - Role-based access control (RBAC)
  
- **Security & Performance**
  - Rate limiting: maximum 100 requests per 15 minutes per IP
  - Route guards for protected areas
  - Public/private area separation

- **User Roles & Permissions**
  
  | Role | Description |
  |------|-------------|
  | **Guest** | • View blog posts and detailed post views<br>• Subscribe to newsletter<br>• No posting or interaction capabilities |
  | **Authenticated User** | • All guest permissions, plus:<br>• Full CRUD operations on own posts<br>• CRUD operations on own profile<br>• Like, dislike, and comment on posts<br>• Follow other users |

- **RESTful API Architecture**
  
  | Component | Description |
  |-----------|-------------|
  | API Base URL | `http://localhost:5000/api/` |
  | Authentication | Cookie-based authentication using cookie-parser middleware |
  | Request Format | JSON |
  | Response Format | JSON |
  | HTTP Methods | • GET: Retrieve resources<br>• POST: Create new resources<br>• PUT: Update existing resources<br>• DELETE: Remove resources |
  | Status Codes | • 200: Success<br>• 201: Created<br>• 400: Bad Request<br>• 401: Unauthorized<br>• 403: Forbidden<br>• 404: Not Found<br>• 409: Duplicate field<br>• 500: Internal Server Error |
  | Rate Limiting | • 100 requests per 15 minutes per IP<br>• Standard rate limit headers enabled<br>• Response with message: 'Too many requests from this IP, please try again later' |
  | Documentation | API endpoints documented and tested in Postman |

- **Pagination:**
  - **Request Parameters:**
    - `page` (optional): Page number, defaults to 1
    - `limit` (optional): Items per page, defaults to 3 
</details>
</details>

<details open>
<summary><h4>1.3. Technical Stack (MEAN)</h4></summary>

- **MongoDB**: NoSQL database for flexible data storage and user content management
- **Express.js**: Backend web application framework with middleware support
- **Angular v16**: Frontend framework for building the single-page application
- **Node.js**: Server-side JavaScript runtime environment

> Built with Angular v16 (now in maintenance mode). For production use, consider upgrading to the latest Angular version.

**Additional Technologies:**

- **Frontend Libraries:**
  
  - **Tailwind CSS**: Utility-first CSS framework for responsive design
  - **Angular Material**: UI component library for modern design
  - **Angular Animations**: Enhanced user experience with smooth transitions
  - **Boxicons**: Icon library for user interface elements
  - **Date-fns**: Modern JavaScript date utility library
  - **Google Drive API**: Cloud storage for images and media files
  
- **Backend Libraries:**
  
  - **JWT (jsonwebtoken)**: JSON Web Tokens for secure authentication
  - **bcryptjs**: Password hashing for secure user authentication
  - **cookie-parser**: Cookie parsing middleware for session management
  - **express-rate-limit**: Rate limiting middleware for API protection
  - **express-validator**: Input validation and sanitization
  - **Gravatar**: Profile picture integration service
  - **CORS**: Cross-Origin Resource Sharing configuration
</details>
</details>

<details open>
<summary><h3>2. Project Architecture</h3></summary>

<details open>
<summary><h4>2.1. Structure Overview</h4></summary>

**2.1.1. Angular Architecture Components**

This application follows a modular architecture with clear separation of concerns:

- **modules/** - Organizational units that group related components, services, and other code files. Feature modules (authenticate, core, features, shared, user) encapsulate specific functionality for better maintainability and lazy loading
- **components/** - UI building blocks that control views and handle user interactions. Each component consists of TypeScript class, HTML template, and CSS styles
- **services/** - Injectable classes that handle business logic, API requests, and data sharing between components. Provide centralized functionality across the application
- **interfaces/** - TypeScript type definitions that ensure type safety and define contracts for data structures, API responses, and component inputs/outputs
- **interceptors/** - HTTP middleware that intercepts and transforms HTTP requests/responses, handling authentication tokens, error handling, and request/response logging
- **resolvers/** - Route data providers that fetch required data before navigation completes, ensuring components receive necessary data on initialization
- **guards/** - Route protection mechanisms that control access to specific routes based on authentication status, user permissions, and other conditions
- **utils/** - Utility functions and helper classes that provide common functionality like date formatting, validation logic, and data transformation
- **pipes/** - Transform displayed values in templates, such as formatting dates, currency, or filtering lists without changing underlying data
- **validators/** - Custom form validation logic that ensures data integrity and provides user feedback for form inputs and reactive forms

**2.1.2. Node.js Backend Architecture**

- **config/** - Contains configuration files for database, CORS, and routes
- **controllers/** - Handles HTTP requests and response logic
- **middlewares/** - Contains middleware functions for authentication, session management, and request preprocessing
- **models/** - Defines data models and schema using Mongoose
- **services/** - Contains business logic and external service integrations
- **utils/** - Utility functions and helpers
</details>

<details>
<summary><h4>2.2. Directory Structure</h4></summary>

```
Blogger Web App/
├── CLIENT/
│   ├── client/
│   │   ├── public/
│   │   ├── src/app/
│   │   │   ├── core/
│   │   │   │   ├── guards/                     
│   │   │   │   ├── interceptors/               
│   │   │   │   ├── resolvers/                  
│   │   │   │   └── core.module.ts
│   │   │   ├── features/                       
│   │   │   │   ├── blog/                       
│   │   │   │   │   ├── blog-card/              
│   │   │   │   │   ├── blog-create/            
│   │   │   │   │   ├── blog-details/           
│   │   │   │   │   ├── blog-edit/              
│   │   │   │   │   ├── comment-create/         
│   │   │   │   │   ├── comment-list/           
│   │   │   │   │   ├── google-drive-upload/    
│   │   │   │   │   ├── blog-api.service.ts     
│   │   │   │   │   └── blog.module.ts          
│   │   │   │   └── profile/                    
│   │   │   │       ├── profile-card/           
│   │   │   │       ├── profile-form-dialog/    
│   │   │   │       ├── public-profile/         
│   │   │   │       ├── user-profile/           
│   │   │   │       ├── profile-api.service.ts  
│   │   │   │       └── profile.module.ts       
│   │   │   ├── shared/                         
│   │   │   │   ├── confirm-dialog/             
│   │   │   │   ├── custom-button/              
│   │   │   │   ├── error-notification/         
│   │   │   │   ├── newsletter-form/            
│   │   │   │   ├── pagination/                 
│   │   │   │   ├── pipes/                      
│   │   │   │   ├── utils/                      
│   │   │   │   └── validators/                 
│   │   │   ├── user/                           
│   │   │   │   ├── auth-forms-section/         
│   │   │   │   ├── sing-in-form/               
│   │   │   │   ├── sing-up-form/               
│   │   │   │   ├── logout/                     
│   │   │   │   ├── auth.service.ts             
│   │   │   │   └── user.module.ts              
│   │   │   ├── services/                       
│   │   │   ├── interfaces/                     
│   │   │   ├── app-routing.module.ts           
│   │   │   ├── app.component.*                 
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── environments/
│   │   │   ├── environment.development.ts
│   │   │   └── environment.ts
│   │   └── README
│
├── REST-API/
│   ├── server/
│   │   ├── config/
│   │   │   ├── cors.js
│   │   │   ├── database.js
│   │   │   └── routes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── checkAuthController.js
│   │   │   ├── defaultController.js
│   │   │   ├── googleDriveController.js
│   │   │   ├── newsletterController.js
│   │   │   └── profileController.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── guards.js
│   │   │   ├── paginationMiddleware.js
│   │   │   ├── preload.js
│   │   │   ├── session.js
│   │   │   └── validateBodyRequest.js
│   │   ├── models/
│   │   │   ├── Newsletter.js
│   │   │   ├── Profile.js
│   │   │   ├── Post.js
│   │   │   └── User.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── checkAuthService.js
│   │   │   ├── newsletterService.js
│   │   │   ├── profileService.js
│   │   │   └── postService.js
│   │   └── util/
│   │       ├── errorParser.js
│   │       └── formatPaginatedResponse.js
│   ├── .gitignore
│   ├── package.json
│   ├── Procfile
│   └── server.js
```
</details>
</details>

<details>
<summary><h3>3. API Documentation</h3></summary>

<details>
<summary><h4>3.1. Introduction</h4></summary>

The API is organized around REST. This API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and authentication.
The API doesn't support bulk updates. You can work on only one object per request.
</details>

<details>
<summary><h4>3.2. URL</h4></summary>

All endpoints are prefixed with "/api". Consequently, during the development phase, the endpoints will be accessible via the following URL: "http://localhost:5000/api".
</details>

<details>
<summary><h4>3.3. Methods</h4></summary>

`GET` | `POST` | `PUT` | `DELETE`
</details>

<details>
<summary><h4>3.4. URL Query Parameters</h4></summary>

Required: `id=[string]`
</details>

<details>
<summary><h4>3.5. Response</h4></summary>

**Code:** `200 OK`  
Returns the requested data, at the specified page of the results.

**Code:** `204 No Content`  
Returned if the data property was removed successfully.

**Code:** `400 Bad Request`  
Returned if the request is invalid.

**Code:** `401 Unauthorized`  
Returned if the user is not logged in.

**Code:** `403 Forbidden`  
Returned if no credentials available.

**Code:** `404 Not Found`  
Returned if the data property does not exist.

**Code:** `409 Conflict`  
Returned if the data conflicts with resource's current state.

**Code:** `500 Internal Server Error`  
The server encountered an unexpected condition that prevented it from fulfilling the request.
</details>

<details>
<summary><h4>3.6. API Postman Documentation</h4></summary>

- Source: [View POSTMAN API](https://documenter.getpostman.com/view/28859516/2sB3BGJVTC)
</details>
</details>

<details open>
<summary><h3>4. Environment Setup</h3></summary>

<details>
<summary><h4>4.1. Prerequisites</h4></summary>

- Node.js (v18 or higher)
- Angular CLI (v16 or higher): `npm install -g @angular/cli`
- MongoDB installed and running locally, or a MongoDB Atlas account
</details>

<details>
<summary><h4>4.2. Installation Steps</h4></summary>

1. Clone the repository
   - `git clone <repository-url>`
   - `cd blogger-web-app`

2. Install backend dependencies
   - `npm install`

3. Install frontend dependencies
   - `cd client`
   - `npm install`
   - `cd ..`

4. Create Environment Variables
   - Create a `.env` file in the root directory and add the following variables:

<details>
<summary><h5>4.2.1. Server Configuration</h5></summary>

- PORT=5000
- NODE_ENV=development
</details>

<details>
<summary><h5>4.2.2. MongoDB Connection</h5></summary>

- MONGODB_URI=mongodb://localhost:27017/blogger

**or**

- MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogger
</details>

<details>
<summary><h5>4.2.3. JWT Configuration</h5></summary>

- JWT_SECRET=your_jwt_secret_key
</details>

<details>
<summary><h5>4.2.4. Google Drive API Configuration</h5></summary>

- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- GOOGLE_REDIRECT_URI=your_redirect_uri
</details>
</details>

<details>
<summary><h4>4.3. Available Scripts</h4></summary>

**Backend Scripts (from root directory):**
- Start the server in production mode: `npm start`
- Start the server in development mode with nodemon: `npm run server`
- Start Angular client with proxy: `npm run client`
- Start both frontend and backend concurrently: `npm run dev`

**Frontend Scripts (from /client directory):**
- Start Angular development server: `ng serve`
- Build for production: `ng build`
- Run unit tests: `ng test`
- Build and watch for changes: `ng build --watch --configuration development`

**Full Stack Development:**
- Start both client and server: `npm run dev` (from root directory)
- Client will run on `http://localhost:4200`
- Server will run on `http://localhost:5000`
</details>

<details>
<summary><h4>4.4. Environment Configuration Files</h4></summary>

**Frontend Environment Files (client/src/environments/):**
- `environment.ts` - Production configuration
- `environment.development.ts` - Development configuration

Configure API endpoints, Google Drive API keys, and other client-side settings in these files.
</details>

<details>
<summary><h4>4.5. Dependencies Overview</h4></summary>

<details>
<summary><h5>4.5.1. Main Dependencies</h5></summary>

**Client**
- `@angular/core`: Angular framework core functionality
- `@angular/material`: Material Design components for Angular
- `@angular/animations`: Animation library for Angular
- `tailwindcss`: Utility-first CSS framework
- `boxicons`: Icon library for web applications
- `date-fns`: Modern JavaScript date utility library

**Server**
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: JWT implementation for authentication
- `bcryptjs`: Password hashing
- `dotenv`: Environment variables management
- `express-validator`: Input validation middleware
- `axios`: HTTP client for API requests
- `gravatar`: Profile picture integration
- `cookie-parser`: Cookie parsing middleware
- `cors`: Connect/Express middleware
- `express-rate-limit`: Limit repeated requests to public APIs
</details>

<details>
<summary><h5>4.5.2. Development Dependencies</h5></summary>

**Client** 
- `@angular/cli`: Angular command line interface
- `typescript`: TypeScript language support
- `karma`: Test runner for JavaScript
- `jasmine`: Behavior-driven development framework

**Server**
- `nodemon`: Development server with auto-reload
- `concurrently`: Run multiple commands concurrently
</details>
</details>

<details open>
<summary><h4>4.6. Build Setup</h4></summary>

1. Start MongoDB service (must be running before server start)
2. Configure your `.env` file with appropriate values
3. Install dependencies for both server and client:
   
   - Install root/server dependencies
     - `npm install`
  
   - Install client dependencies
      - `cd client`
      - `npm install`

4. Run both servers concurrently from the project root:
    - `npm run dev`
  
    This will start:
     - Backend API at `http://localhost:5000`
     - Frontend (Angular) server at `http://localhost:4200`

- **To run servers independently:**
  - For backend only: `npm run server`
  - For frontend only: `npm run client` (from root) or `cd client && ng serve`
  
- **Note about API Proxy:**
All API requests from the frontend are automatically proxied to the backend server through the Angular proxy configuration (proxy.conf.json). Here's how it works:

  - In your Angular services, you can make API calls using shorter paths:
     `const response = await this.http.get('/api/posts');`

  - The Angular proxy automatically forwards these requests to your backend server:
     `http://localhost:5000/api/posts`
</details>
</details>

<details>
<summary><h3>5. Security Measures</h3></summary>

<details>
<summary><h4>5.1. Authentication</h4></summary>

**5.1.1. Client-side**

- JWT generation and storage in HTTP-only cookies
- AuthGuard restricts unauthenticated users from accessing protected routes
- GuestGuard restricts authenticated users from accessing login/registration pages  
- Authentication Component manages global authentication state and handles user session validation through resolver data and service checks
  
**5.1.2. Server-side**

- JWT-based authentication with secure cookie session storage
- Session duration: 1 hour
- Protected routes using middleware guards:
  - `hasUser`: Verifies authenticated user
  - `isOwner`: Validates resource ownership
  - `checkUserRole`: Role-based access control
- Protected auth routes for logged-in users
</details>

<details>
<summary><h4>5.2. Securing API</h4></summary>

- CORS configuration for secure client-server communication
- Express rate-limiting middleware to prevent DoS attacks. Limits requests per IP to prevent abuse of sensitive endpoints like password reset.
</details>
</details>

<details>
<summary><h3>6. Error Handling</h3></summary>

<details>
<summary><h4>6.1. Validation and Error Types</h4></summary>
 
**1. Client-side**
- Global Error Handling
- Form validation error display and handling
- API error response presentation
- User-friendly error messages for production
   
**2. Server-side**
- Global Error Handling
- Pre-request validation with express-validator middleware
- Model-level Mongoose schema validation
- Consistent error response format
- Production-safe error messages for users
</details>
</details>

<details>
<summary><h3>7. References & Resources Used</h3></summary>

- Angular - Setup an Interceptor for HTTP request error.
  - Source: [Link](https://dev.to/theobourdel/angular-faire-un-interceptor-pour-vos-requetes-http-1kdj)
  
- Mastering Angular Resolver Pattern: Preload Data Like a Pro
  - Source: [Link](https://medium.com/@sehban.alam/mastering-angular-resolver-pattern-preload-data-like-a-pro-1b5c76fc3054)
  
- How to Implement OAuth in Angular: A Step-by-Step Guide
  - Source: [Link](https://medium.com/@binurajtech/how-to-implement-oauth-in-angular-a-step-by-step-guide-0173c40ec0af) 
  - Source: [Link](https://medium.com/@sehban.alam/implementing-oauth-in-angular-a-step-by-step-guide-ce3f82e66cd2)
  - Source: [Link](https://athiththan11.medium.com/google-drive-image-upload-with-oauth-2-0-ab0d3b4a75bc)

- Using the Google Drive API for public folders
  - Source: [Link](https://fleker.medium.com/using-the-google-drive-api-for-public-folders-f1f7308385ad)
  
- Angular File Upload: Complete Guide
  - Source: [Link](https://blog.angular-university.io/angular-file-upload/)
  
- Angular 17 Image Upload with Preview example
  - Source: [Link](https://www.bezkoder.com/angular-17-image-upload-preview/#google_vignette)
     
- How To Use Custom SVG Icons in Angular Material
  - Source: [Link](https://www.digitalocean.com/community/tutorials/angular-custom-svg-icons-angular-material)
  
- Heroku Deployment: Top 3 Ways to Deploy Apps to Heroku
  - Source: [Link](https://codefresh.io/learn/heroku-deployment-top-3-ways-to-deploy-apps-to-heroku/)
  
- Securing APIs: Express rate limit and slow down
  - Source: [Link](https://developer.mozilla.org/en-US/blog/securing-apis-express-rate-limit-and-slow-down/)
  
- Express cors middleware
  - Source: [Link](https://expressjs.com/en/resources/middleware/cors.html)
  
- How to Build Secure and Scalable Authentication System with Node.js and MongoDB
  - Source: [Link](https://sandydev.medium.com/how-to-build-secure-and-scalable-authentication-system-with-node-js-and-mongodb-c50bf51c06b0)
  
- Build a Login and Logout API using Express.js (Node.js)
   - Source: [Link](https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2)
  
- Simplified Guide to Setting Up a Global Error Handler in Express.js
  - Source: [Link](https://medium.com/@mohsinansari.dev/simplified-guide-to-setting-up-a-global-error-handler-in-express-js-daf8dd640b69)
  
- Implementing Pagination in an Express.js Application
  - Source: [Link](https://medium.com/@atacanymc/implementing-pagination-in-an-express-js-application-551244b62d48)
  
- Software documentation guide
   - Source: [Link](https://www.writethedocs.org/guide/index.html)
</details>