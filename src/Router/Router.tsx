// ** Router imports
import { useRoutes } from "react-router-dom"
import Routes from "./RouteConstants"

const Router = () => {
  const routes = useRoutes([...Routes])
  return routes
}

export default Router
