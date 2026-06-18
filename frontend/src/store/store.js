import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
<<<<<<< HEAD
=======
import adminReducer from "./slices/adminSlice";
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb

const store = configureStore({
  reducer: {
    auth: authReducer,
<<<<<<< HEAD
=======
    admin: adminReducer,
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
  },
});

export default store;