import React from "react"
import { LandingPage } from "./components/landingPage/LandingPage"
import { Dashboard } from "./components/dashboard/Dashboard"

function App() {
  const [exibirLanding, setExibirLanding] = React.useState(true)

  React.useEffect(() => {
    const visitaUsuario = localStorage.getItem("@cra-web-dev-solution:has-visited")

    if (!visitaUsuario) {
      setExibirLanding(true)
    } else {
      setExibirLanding(false)
    }
  }, [])

  return (
    <>
      {exibirLanding ? <LandingPage setExibirLanding={setExibirLanding} /> : <Dashboard />}
    </>
  )
}

export default App
