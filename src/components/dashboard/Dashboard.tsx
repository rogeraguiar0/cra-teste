import React from "react"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { FaMoneyBillTrendUp as DolarIcon } from "react-icons/fa6";
import { GiTakeMyMoney as TakeIcon, GiMoneyStack as VolumeIcon , GiNetworkBars as HashIcon } from "react-icons/gi";
import { SiHiveBlockchain as ChainIcon} from "react-icons/si";
import CRA from "../../assets/CRA.png"
import { DashCard } from "./DashCard"
import { Grafico } from "./Grafico"
import { iDashboardData, iGraficoResponse, iMinerData } from "../../interfaces/intex"
import { MinerPage } from "../minerPage/MinerPage"
import { formatUpdatedAt } from "../../utils/data";
import { apiUrl } from "../../api";

export const Dashboard = () => {
    const [dashboardData, setDashboardData] = React.useState({} as iDashboardData)
    const [loadingMiner, setLoadingMiner] = React.useState(false)
    const [minerData, setMinerData] = React.useState({} as iMinerData)
    const [graficoMedia, setGraficoMedia] = React.useState({} as iGraficoResponse)
    const [graficoHora, setGraficoHora] = React.useState({} as iGraficoResponse)

    const fetchData = async () => {
        await axios.get(`${apiUrl}/dashboard`)
            .then(({ data }) => {
                const { grafico, ...rest } = data
                setDashboardData(rest)
                setGraficoMedia(grafico.graficoMedia)
                setGraficoHora(grafico.graficoHora)
            })
            .catch((err) => console.log(err))
    }

    const getMinerData = async (wallet: string, page = "1", pageSize = "12") => {
        setLoadingMiner(true)
        await axios.get(`${apiUrl}/minerador/${wallet}`, {
            params: {
                page: page,
                pageSize: pageSize
            }
        })
            .then(({ data }) => setMinerData(data))
            .catch((err) => console.log(err))
            .finally(() => setLoadingMiner(false))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement
        const input = form.firstChild as HTMLInputElement

        const wallet = input.value

        getMinerData(wallet)
        input.value = ""
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <header className="flex justify-between items-center px-4 h-20 bg-[#000d13]">
                <div className="h-full w-full flex justify-between items-center container max-w-custom ">
                    <img src={CRA} className="w-[60px] h-[65px]" />
                    <nav className="pl-4 w-[300px]">
                        <form className="flex items-center w-full" onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="text"
                                placeholder="Pesquisar carteira..."
                                className="px-2 py-1 text-base text-[#bdf3ff] rounded-l rounded-r-none font-texto bg-[#3d3d3d78] outline-none w-full max-w-[300px] h-9"
                            />
                            <button type="submit" className="bg-custom-icon h-9 rounded-l-none rounded-r px-2 transition-colors duration-300 hover:bg-[#00C8FF]">
                                <FaSearch color="#ffffff" />
                            </button>
                        </form>
                    </nav>
                </div>
            </header>

            <main className="p-4 bg-[#002534] min-h-minDashboard">
                {dashboardData.valor && (
                        <section className="container max-w-custom grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            <DashCard Icon={ DolarIcon } titulo="Valor (DERO/USD)" conteudo={dashboardData.valor.valor} variacao={dashboardData.valor.variacao} />
                            <DashCard Icon={ TakeIcon }  titulo="Market Cap." conteudo={dashboardData.market_cap} />
                            <DashCard Icon={ VolumeIcon } titulo="Volume (24H)" conteudo={dashboardData.volume} />
                            <DashCard Icon={ ChainIcon } titulo="Chain Height" conteudo={dashboardData.chainHeight.toLocaleString("de-DE")} />
                            <DashCard className="md:col-span-2" Icon={ HashIcon } titulo="Hashrate 1d" conteudo={dashboardData.networkHashrate1d.toLocaleString("de-DE")} />
                            <DashCard className="md:col-span-2"  Icon={ HashIcon } titulo="Hashrate 7d" conteudo={dashboardData.networkHashrate7d.toLocaleString("de-DE")} />
                        </section>
                    )
                }

                <section className="container max-w-custom grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {graficoMedia?.data && (
                        <div className="w-full flex justify-center bg-[#000d13] rounded-lg shadow-custom-grafico p-2">
                            <Grafico
                                dadosGrafico={graficoMedia.data}
                                titulo="Dificuldade média (30 dias)"
                                labelSolo="MH/s"
                                alt={<p>Variação: <span className={`${graficoMedia.diff! >= 0 ? "text-green-500" : "text-red-500"} text-xs font-bold`}>{graficoMedia.diff}</span></p>}
                                tipo="bar"
                                dadosLabels={graficoMedia.labels}
                            />
                        </div>
                    )}
                    {graficoHora?.data && (
                        <div className="w-full flex justify-center bg-[#000d13] rounded-lg shadow-custom-grafico p-2">
                            <Grafico
                                dadosGrafico={graficoHora.data}
                                titulo="Dificuldade por hora"
                                labelSolo="Hora"
                                alt={
                                    <p>
                                        Hora da última atualização: {formatUpdatedAt(graficoHora.updated_at!)}
                                    </p>
                                }
                                tipo="line"
                                dadosLabels={graficoHora.labels}
                                isHour
                            />
                        </div>
                    )}
                </section>

                {minerData?.dadosMinerador && (
                    <MinerPage
                        loading={loadingMiner}
                        apiData={minerData}
                        request={getMinerData}
                    />
                )}
            </main>
        </div>
    )
}
