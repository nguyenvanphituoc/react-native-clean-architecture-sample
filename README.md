This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Software design and architecture

Follow MVVM pattern with clean architecture concept

In this diagram, the arrows (-->) represent the direction of dependencies. The outer layers (Frameworks and Drivers, Interfaces Adapter) depend on the inner layers (Use-Cases, Domain), but not the other way around. This is a key principle of Clean Architecture.

Remember, the key principle of Clean Architecture is that dependencies point inwards. The inner layers should not depend on the outer layers. This allows the inner layers (which contain the core business logic) to be isolated and independent from the outer layers (which handle things like data storage, UI, etc.).

```mermaid
graph LR
    subgraph Frameworks And Driver
        Services[Services]

        subgraph UI layer
            UI[Screens]
            View[Views]

            subgraph Interfaces Adapter layer
                Controller[Controller Hooks]
                Gateway[APIs/ Repositories]

                %% The Use-Case layer in Clean Architecture represents the specific business rules of an application. It encapsulates and implements all of the use cases of a system. The Use-Case layer doesn't know anything about the outside world, it just receives data, applies the business rules, and returns the result.
                subgraph Application layer
                    UC[Use-Cases]

                    subgraph Domain layer
                        Entity[Domain]
                    end
                end
            end
        end
    end

    UI -->|controlled by| Controller
    UI -->|render UI| View

    Controller -->|prepare input of UseCase| Gateway
    Controller -->|trigger| UC

    UC -->|Core Business| Entity
```

# Folder Structure

```code
src
├── app
│ ├── hooks
│ ├── implementation (Repositories/ Gateway)
│ └── ui
│
├── core
│ ├── use-cases
│ ├── domain
│ └── interface
│
├── services
│
└── utils
```

- src: This is the root directory where developer put code here.

  - app: This our implementation contains

    - hooks which handles the interaction between the UI and the business logic.

    - implementation (Repositories/ Gateway): the data sources ( Todo service, ...),

    - ui: contains all the UI related code.

  - core: domain, use-case and interface declaration

    - domain: contains Entities and handle logic between them for whole application.

    - use-cases: contains the use cases of application, which interact with the Entity.

    - interface: abstraction layer that is a technique separate domain layer and concrete layer.

  - services: contains service-related code, such as network requests, logging, storage, etc.

  - utils: contains utility functions that are used across the application.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
