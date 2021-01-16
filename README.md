# hypebills (WIP)
HypeBills is a web application for managing your deals, bills and much more!

## Installation
```bash
npm install
```
Then rename .example.env to .env and past your Firebase config.

## Firestore rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /users/{document=**} {
    	allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
    	allow create;
    }
    match /deals/{document=**} {
     	allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
    }
    match /bills/{document=**} {
     	allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
    }
  }
}
```

## Usage
```bash
npm run serve
```

## Build
```bash
npm run build
```

## .example.env
```
VUE_APP_apiKey=
VUE_APP_authDomain=
VUE_APP_databaseURL=
VUE_APP_projectId=
VUE_APP_storageBucket=
VUE_APP_messagingSenderId=
VUE_APP_appId=
VUE_APP_measurementId=
```

## Todo
```
Animations
```
