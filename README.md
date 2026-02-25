Mini Product Explorer is a React Native mobile application developed as part of the GARS Technology React Native Intern assignment. 
The application demonstrates core concepts such as authentication flow, API integration, Redux Toolkit state management, navigation using React Navigation, async handling, and structured project architecture. 
The app begins with a login screen integrated with the DummyJSON authentication API, where successful login stores the authentication token in Redux and allows access to the main application. 
The Home screen fetches products from the Fake Store API and displays product cards with image, title, price, and category. It includes real-time search functionality, category filtering, pull-to-refresh, loading indicators, and proper error handling with a retry option. 
The Product Details screen displays complete product information including rating and allows users to add or remove items from favorites. 
The Favorites screen lists all saved products and shows a proper empty state when no items are available. 
The project follows a clean folder structure separating screens, components, Redux slices, store configuration, and API services. 
To run the project locally: clone the repository->navigate to the project folder->install dependencies using npm install->start the development server using npx expo start.
Demo login credentials are username: emilys and password: emilyspass. 
