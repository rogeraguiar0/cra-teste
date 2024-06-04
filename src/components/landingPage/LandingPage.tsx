import { iLandingPageProps } from "../../interfaces/intex"

export const LandingPage = ({ setExibirLanding }: iLandingPageProps) => {
    const handleClick = () => {
        setExibirLanding(false)
        localStorage.setItem("@cra-web-dev-solution:has-visited", "true")
    }

    return (
        <div 
            className="w-screen max-w-full h-screen relative md:static box-border bg-[url(/src/assets/background/bg_principal.png)] bg-cover bg-center bg-[#1B1E2A] md:flex">
            <div className="z-20 absolute md:static top-0 left-0 text-white font-texto w-full h-full p-4 md:p-20 flex flex-col justify-center md:w-1/2">
                <h2 className="text-customPink font-titulo text-xl">C.R.A <span className="text-white pl-2">Web Server Solution</span></h2>

                <h3 className="text-2xl mt-6 md:mt-8">Centralize suas informações da rede DERO</h3>

                <p className="mt-4 md:mt-6">de forma rápida e intuititva</p>

                <button onClick={handleClick} className="text-base mt-4 md:mt-6 bg-customPink w-full py-2 rounded md:max-w-44">Iniciar</button>
            </div>

            <div className="relative w-full h-full opacity-50 md:opacity-100 flex items-center justify-center p-4 md:w-1/2">
                <div id="landing-page-image" />
                <div id="landing-page-cir1" />
                <div id="landing-page-cir2" />
                <div id="landing-page-cir3" />
                <div id="landing-page-cir4" />
            </div>
        </div>
    )
}
