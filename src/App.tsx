import { RouterProvider } from "react-router";
import "./App.css";
import { router} from "./Routes";



const script = document.createElement("script");
script.src = "https://script.google.com";
document.body.appendChild(script);








function App() {
  return ( <RouterProvider router={router} />);
}

export default App;
