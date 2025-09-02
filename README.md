# Next.js Firebase Boilerplate
A modern boilerplate for building full-stack web applications with a focus on real-time features and a great developer experience. This template provides a robust foundation for projects requiring user authentication and data persistence.

## Key Features
- **Framework**: Next.js with the App Router for a powerful and flexible routing system.
- **Authentication**: Seamless user login, registration, and session management using **Firebase Authentication**.
- **Database**: Real-time data storage and synchronization with **Firestore**, showcased through a simple chat example.
- **Styling**: A utility-first CSS framework with **Tailwind CSS** for rapid and consistent UI development.
- **UI Components**: Accessible, unstyled components from **Headless UI** for building custom user interfaces.

## Getting Started
Follow these steps to get your project up and running:

1. Clone the repository:
```
    git clone [your-repo-url]
    cd [your-project-folder]
```

2. Install dependencies:

    npm install

3. Set up your Firebase Project:
  - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
  - Enable Authentication and **Firestore Database**.
  - Create a new web app and copy its configuration.

4. Configure environment variables:
  - Create a `.env.local` file in the root of your project.
  - Add your Firebase configuration keys, prefixed with `NEXT_PUBLIC_`.

    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

5. Run the development server:

npm run dev

Open http://localhost:3000 in your browser to see the result.

## Project Structure
- `app/`
  - `providers/`: Contains reusable React context providers, such as FirebaseProvider.
  - `admin/dashboard/`: The main authenticated page for signed-in users.
  - `layout.tsx`: The root layout for the application, handling global styles and providers.
  - `page.tsx`: The home page.
  - `login/page.tsx`: The login page with the login and registration forms.
  - `globals.css`: The main CSS file, including Tailwind directives.
- `lib/`
  - `firebase.ts`: Initializes Firebase services and exports auth and db instances.

This README should be a great starting point. If you have any further questions or need to add more details, just let me know!