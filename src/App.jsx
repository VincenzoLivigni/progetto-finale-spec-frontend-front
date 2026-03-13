import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import BoardGamesList from "./pages/BoardGamesList"
import BoardGamesDetail from "./pages/BoardGamesDetail"
import { GlobalProvider } from "./contexts/GlobalContext"


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<BoardGamesList />} />
              <Route path="/boardgames/:id" element={<BoardGamesDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
