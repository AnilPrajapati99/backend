import AppRoutes from "./AppRoutes.jsx"

import "./shared/style.scss"
import { AuthProvider } from "./feauters/auth/auth.context.jsx"
import { PostContextProvider } from "./feauters/post/post.contexts.jsx"


function App() {
  return (

    <AuthProvider>
      <PostContextProvider>
      <AppRoutes/>

      </PostContextProvider>
      </AuthProvider> 
    
   
  )
}

export default App
