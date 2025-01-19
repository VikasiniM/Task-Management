# CheckList App

CheckList App is a mobile application that allows users to create, manage, and organize tasks within different environments. The app uses Firebase for authentication and Firestore for data storage, providing a seamless and synchronized task management experience.

[Download Link](https://drive.google.com/file/d/19UEIddlihnsMwtc2ANb2cbZY0jHw9CRl/view?usp=sharing) 

## Project Structure

The project is structured using React Native and Expo for the frontend, with Firebase as the backend service for authentication and Firestore for database storage.

## Dependencies

The following dependencies are used in this project:

- **@expo/metro-runtime**: ~3.2.1
- **@react-native-community/checkbox**: ^0.5.17
- **@react-navigation/native**: ^6.1.17
- **@react-navigation/native-stack**: ^6.9.26
- **@rneui/themed**: ^4.0.0-rc.8
- **@types/react**: ~18.2.79
- **expo**: ~51.0.14
- **firebase**: ^10.12.2
- **react**: 18.2.0
- **react-native**: 0.74.2
- **react-native-safe-area-context**: ^4.10.5
- **react-native-screens**: ^3.32.0
- **typescript**: ~5.3.3

Dev Dependencies:

- **@babel/core**: ^7.20.0
- **@types/react-native-check-box**: ^2.1.6

## Project Setup and Development

### Initial Setup

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Run the app in Expo:**

    ```bash
    npm start
    ```

    For specific platforms:
    
    ```bash
    npm run android
    npm run ios
    npm run web
    ```

### Firebase Setup
  Make sure you have a firebase account ,create a project which will handle authentication and database.

1. **Install Firebase CLI:**

    ```bash
    npm install -g firebase-tools
    ```

2. **Login to Firebase:**

   login to your firebase account.
    ```bash
    firebase login
    ```

4. **Initialize Firebase in your project:**

    ```bash
    firebase init
    ```

    Choose: Hosting: Configure and deploy Firebase Hosting sites

5. **Ensure your `package.json` has the following scripts:**

    ```json
    "scripts": { 
      "start": "expo start", 
      "android": "expo start --android", 
      "ios": "expo start --ios", 
      "web": "expo start --web", 
      "build": "expo export"
    }
    ```

6. **Build the project:**

    ```bash
    npm run build
    ```

7. **Deploy to Firebase:**

    ```bash
    firebase deploy
    ```

### Building APK or AAB

1. **Create an Expo account if you don't have one:**

    [Expo Sign Up](https://expo.dev/signup)

2. **Install EAS CLI:**

    ```bash
    npm install -g eas-cli
    ```

3. **Login to EAS:**

    ```bash
    eas login
    ```

4. **Configure EAS for your project:**

    ```bash
    eas build:configure
    ```

    This will generate an `eas.json` file. Make sure it contains the following:

    ```json
    #other dependencies
    
    {
      "build": {
        "development": {
          "android": {
            "buildType": "apk"
          }
        },
      }
    }
    ```

5. **Build the APK for Android:**

    ```bash
    eas build --platform android --profile preview
    ```

    For a general build:

    ```bash
    eas build
    ```


## Additional Information

### Handling Errors

Ensure to handle errors and edge cases gracefully within the application. Log errors to the console or use a logging service to track issues in production.

### Updating Dependencies

Periodically update the dependencies to their latest versions to benefit from new features and security patches. Use:

```bash
npm update
```
### Contribution
Feel free to fork this repository and contribute by submitting a pull request. Ensure that your code adheres to the existing code style and add relevant tests for any new functionality.

### Conclusion
This project provides a basic structure for a checklist application using React Native and Expo, with Firebase as the backend. By following the setup and deployment instructions, you can get the application running and customize it as per your requirements.
