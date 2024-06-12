import {BrowserRouter, Route, Routes} from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import View from "./pages/View"
import Add from "./pages/Add"
import Edit from "./pages/Edit"

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
