import ListPage from "../Pages/List"
import Form from "../Pages/Form"

const Routes = [
    {
      path: "/",  
      index: true,
      element: <ListPage/>
    },
    {
      path: "/edit/:id",  
      index: true,
      element: <Form/>
    },
    {
      path: "/add",  
      index: true,
      element: <Form/>
    }
  ]

  
export default Routes