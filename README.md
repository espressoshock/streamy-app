# Streamy<!-- omit in toc -->
>Modern audiobook streaming platform powered by _MongoDB_, _ElectronJS_, _NodeJS_ and _firebase serverless cloud-functions_


<span style="display:block;text-align:center">
    <img src="./assets/streamy-hero-image.png" alt="streamy hero image">
</span>

## Table of contents <!-- omit in toc -->
- [Description](#description)
- [Project structure](#project-structure)
- [Project setup and toolchain](#project-setup-and-toolchain)
  - [Package.json: scripts](#packagejson-scripts)
  - [Project structure](#project-structure-1)
  - [Naminc conventions](#naminc-conventions)
- [Routing](#routing)
- [Application Context](#application-context)
  - [Methods provided](#methods-provided)
- [Design](#design)
  - [User Interface](#user-interface)
    - [Views](#views)
      - [Splashscreen](#splashscreen)
      - [Sign in](#sign-in)
      - [Sign up](#sign-up)
      - [Player](#player)
      - [Publish audiobooks 1/2](#publish-audiobooks-12)
      - [Publish chapers 2/2](#publish-chapers-22)
    - [Logo and branding](#logo-and-branding)
  - [Framework and technologies](#framework-and-technologies)

## Description

_Streamy_ is a not just a modern _Single Page Application (SPA)_ powered by [_ReactJS_](https://reactjs.org/) and packaged and distributed with [_ElectronJS_](https://www.electronjs.org/), but is a __full-stack free audiobook streaming platform__. 

## Project structure

As a full-stack streaming platform, the project has been subdivided into the following repositories based on the product's functionality; each readme file will only dive into the specifics regarding their respective product, use the following links to learn more about the other services. 

1. Cross-platform application: [streamy-app](https://github.com/espressoshock/streamy-app)
2. Backend and cloud functions: [streamy-server](https://github.com/espressoshock/streamy-server) 
3. Web-application: (external) https://github.com/PetarPetrovic98/WebDevelopment

## Project setup and toolchain

_Streamy_ has been built on top of [_ReactJS_](https://reactjs.org/) and packaged and distributed with [_ElectronJS_](https://www.electronjs.org/). The project has been initialized with the `npm create-react-app` to quickstart the project development, and subsequently have been added the following packages: 
1. `electron`
2. `concurrently`
3. `wait-on`
4. `cross-env`
   
Through the use of the selected package manager (yarn): `yarn add electron concurrently wait-on cross-env`

### Package.json: scripts

To facilitate development we added three scripts:

1. `electron:serve`: concurrently run ReactJS and ElectronJS, with `cross-env BROSWER=NONE` to not open ReactJS not in the browser
2. `electron:start`: we utilized the wait-on to make sure React is running before starting ElectronJS
3. `electron:build`: utilized to build our electron app

![Package.json Scripts screenshot](assets/scripts-screenshot.PNG)

### Project structure

The React application has been divided in modules according to their functionalities, that resulted in the following tree folder structure:
1. `components`: containing all reausable components
2. `contexts`: containing all the contexts
3. `models`: containing supplementary model classes, where applicable
4. `pages`: containing all the pages
5. `services`: containing all the services

### Naminc conventions

Note that all the `folder:component` obey to the following naming conventions
> `folder-name` becomes `FolderName.js`, `FolderName.css` <br>
> eg. the folder `chapter-list` contains `ChapterList.js` and `ChapterList.css`

> Class components has also been preferred over functional components

![Project structure](assets/project-structure.png)

## Routing

For the application routing has been utilized [@reach/router](https://reach.tech/router/), a simple React router that borrows from React Router, Ember, and Preact Router with the following paths:
   
1. __For non auth users, available paths__:
   1. `/` *(default)*: displays the `SignInPage`
   2. `/signUp`: displays the `SignUpPage`
2. __For auth users, available paths:__
   1. `/player`: display the main view, containing the audiotrack player and the audiobook library  
   2. `/add`: display the audiobook wizard, to publish new `audiobooks`, `chapters` and associated `audiotracks`

![Application routing screenshot](assets/application-routing-screenshot.png)

## Application Context

To effiencly and in a robust manner maintain the application's state the [React Context API](https://reactjs.org/docs/context.html) has been utilized to store:

1. `audiobooks`: containg all the audiobooks fetched from the Nodejs Database
2. `firebaseService`: instance of the firebase-service
3. `selectedAudiobook`: currently selected audiobook
4. `selecteChapter`: currently selected chapter
5. `user`: user metada contained in the transaction token including `user-role` (_privileges_)

![UserContext snapshot](./assets/user-context-snapshot.png)

### Methods provided

The _UserContext_, through his `UserContext.Provider`, supplies the following methods aside from its state:

1. `signIn`: handles _email/password_ authentication through the `firebase-service` and returns a promise with the `user` attached
2. `createUser`: create an _email/password_ user type account hrough the `firebase-service` and returns a promise with the `user` attached
3. `signOut`: sign the user out through the `firebase-service` as well as cleaning associated stored data such as _auth cookies_
4. `selectAudiobook`: selects an audiobook and updates application global state
5. `selectChapter`: selects a chapter and updates application global state
6. `getSelectedAudiotrackURI`: return the URI associated to the current playing audiotrack
7. `goPrevChapter`: navigate to previous chapter, where available
8. `goNextChapter`: navigate to next chapter, where available
9. `getSelChapterPos`: returns the index of selected chapter, necessary whatever the stored audiobook contains a preface, allowing for an incongruence in the start index
10. `getSelTotalChapter`: returns the `max-index` of the selected chapter
11. `refreshContext`: refreshes the context upon new data arrival
12. `updateAudiobook`: updates a specified audiobook
13. `deleteAudiobook`: deletes a specified audiobook


![UserContext Provider methods](./assets/user-context-methods-provider.png)

## Design

### User Interface

Streamy user interface has been designed from scratch with the users' needs in mind, trying to maximaxe usability and improve the user of experience.

#### Views

Here's a collection of all the most notable views within the _Streamy_ cross-platform application

##### Splashscreen 
>ElectronJS loading splash screen

<span style="display:block;text-align:center">
    <img src="./assets/view-splashscreen.png" alt="Streamy splashscreen">
</span>

##### Sign in 

<span style="display:block;text-align:center">
    <img src="./assets/view-signIn.png" alt="Streamy splashscreen">
</span>

##### Sign up 

<span style="display:block;text-align:center">
    <img src="./assets/view-signUp.png" alt="Streamy splashscreen">
</span>

##### Player

<span style="display:block;text-align:center">
    <img src="./assets/view-player.png" alt="Streamy splashscreen">
</span>

##### Publish audiobooks 1/2

<span style="display:block;text-align:center">
    <img src="./assets/view-addAudiobook-1.png" alt="Streamy splashscreen">
</span>

##### Publish chapers 2/2

<span style="display:block;text-align:center">
    <img src="./assets/view-addChapter-2.png" alt="Streamy splashscreen">
</span>

#### Logo and branding

<span style="display:block;text-align:center">
    <img src="./assets/streamy-logo.png" alt="Streamy splashscreen">
</span>

### Framework and technologies

1. App packaging and distribution: 
   1. `ElectronJS`
      1. electron-forge | electron-builder | electron-packager
2. Front-end JS Framework: 
   1. `ReactJS`
      1. Router: @reach-router
3. Version control workflow: 
   1. `GithubFlow`
4. Data DB: 
   1. `MongoDB` with `GridFS`
5. Users DB:
   1. `Firebase auth` with custom `claims`
6. REST API:   
   1. `NodeJS` and `ExpressJS`
7. MServices: 
   1. `Firebase cloud functions`
