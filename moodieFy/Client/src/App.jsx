import router from './App.routes'
import FaceExpression from './feauters/expression/components/FaceExpressions'
import { RouterProvider} from "react-router-dom"
import "./feauters/shared/styles/global.scss"
import { AuthProvider } from './feauters/auth/Auth.context'
import {SongContextProvider} from "./feauters/home/Song.context"
function App() {

  return (
    <AuthProvider> 
      <SongContextProvider>

    <RouterProvider router={router} />
      </SongContextProvider>

    </AuthProvider>

  )
}

export default App
