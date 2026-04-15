import router from './App.routes'
import FaceExpression from './feauters/expression/components/FaceExpressions'
import { RouterProvider} from "react-router-dom"
import "./feauters/shared/styles/global.scss"
import { AuthProvider } from './feauters/auth/Auth.context'
function App() {

  return (
    <AuthProvider> 
    <RouterProvider router={router} />
    </AuthProvider>

  )
}

export default App
