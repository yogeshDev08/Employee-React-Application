import ListPage from "../Pages/List"
import Form from "../Pages/Form"
import TestingMaterialUI from "../Component/testingMaterialUI"

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
    },
    {
      path: "/testing",  
      index: true,
      element: <TestingMaterialUI/>
    }
  ]

  
export default Routes