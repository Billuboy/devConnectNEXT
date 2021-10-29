# DevConnect website using NEXTJS
_Redesign of DevConnect using NEXTJS and SWR reducing the overall latency of website by using Serverless Function, Sever Side Rendering and Static Site Generation with Incremental Static Regeneration provided by NEXTJS for creating fast and scalable web apps._

## A word about NEXTJS
_NEXTJS is a framework on top of React, enabling a simple React app the power of_
<br/>
<br/>
_**Serverless Functions** - Serverless Functions are APIs with the power to automatically scale-up and scale-down depending upon the traffic._
<br/>
_**Static Site Generation** - Static Site Generation is the process of generating some web pages at the time of building a project._
<br/>
_**Server Side Rendering** - Server Side Rendering is the process of generating some web pages beforehand, giving a good SEO profile for the web pages._

## A word about SWR
_SWR is a smart fetching, caching and state management tool, SWR reduces the number of re-renders, providing a good UX._

## TechStack Used
<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="node" width="40" height="40"/>

## Platform Requriements

1. Latest version of Nodejs LTS
2. Postman(Desktop App) or ThunderClient(VS Code Extension) - For testing Serverless Functions


## Quick start

1. Clone this repository
2. `npm install` or `yarn install` in the project root folder on local.
3. Put your MongoDB URI and JWT secret inside of `.env.development` for development and `.env.production` for testing production build.
4. `npm run dev` or `yarn dev` to start application in development mode and `npm run prod` and `yarn prod` to start application in production mode.


## NPM Packages Used
1. **Create Next App** - For creating NEXT app barebones  
2. **SWR** - Data Fetching and State Management tool
3. **Chakra UI** - CSS Component library for UI
4. **Mongoose** - For adding data scehma on top of MongoDB
5. **Next Connect** - For adding middleware support to serverless functions
6. **PassportJS** - Nodejs Framework for implementing authentication 
7. **Cookie** - For parsing and manipulating cookies
8. **Json Web Token** - For signing and decrypting JWTs
9. **Joi** - For data validation

## Useful Links

1. **NEXTJS** - `https://nextjs.org`
2. **SWR** - `https://swr.vercel.app`
