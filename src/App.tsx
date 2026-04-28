import "./App.css";
import { Router } from "./Routes";



const script = document.createElement("script");
script.src = "https://script.google.com";
document.body.appendChild(script);








function App() {
  return (<Router />);
}

export default App;
