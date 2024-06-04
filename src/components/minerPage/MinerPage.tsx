import React from "react"
import { iMinerPageProps } from "../../interfaces/intex"
import { FaCalendarDay } from "react-icons/fa"
import { FaHourglass } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { DashCard } from "../dashboard/DashCard"
import { Grafico } from "../dashboard/Grafico"

export const MinerPage = ({ loading, apiData, request }: iMinerPageProps) => {
    const [minerPagination, setMinerPagination] = React.useState({ page: "1", pageSize: "12" })

    const ganhosUltimoDia = apiData.ganhosDiarios.data[apiData.ganhosDiarios.data.length - 1].toFixed(2)
    const calculoGanhosUltimaHoraValida = () => {
        const arr = apiData.ganhosHora.data
        const arrFiltrado = arr.filter((elt) => elt !== 0)

        return arrFiltrado[arrFiltrado.length - 1] + " Dero"
    }
    const calculoGanhosMensal = () => {
        const arr = apiData.ganhosDiarios.data
        return arr.reduce((acc, act) => acc + act, 0).toFixed(2) + " Dero"
    }

    const nextPage = () => {
        request(apiData.dadosMinerador[0].miner, `${+minerPagination.page + 1}`, minerPagination.pageSize)
        setMinerPagination({ page: `${+minerPagination.page + 1}`, pageSize: "12" })
    }
    const prevPage = () => {
        request(apiData.dadosMinerador[0].miner, `${+minerPagination.page - 1}`, minerPagination.pageSize)
        setMinerPagination({ page: `${+minerPagination.page - 1}`, pageSize: "12" })
    }

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 text-white flex flex-col items-center justify-center gap-2">
                    <h3 className="text-2xl">Carregando...</h3>

                    <p className="text-lg">Por favor, aguarde :D</p>
                </div>
            )}
            <section id="miner-data" className="mt-8 text-white flex flex-col gap-2 w-full">
                <div className="container max-w-custom grid grid-cols-2 gap-2">
                    <DashCard Icon={FaCalendarDay} titulo="Ganhos do último dia" conteudo={ganhosUltimoDia} />
                    <DashCard Icon={FaHourglass} titulo="Ganhos da última hora válida" conteudo={calculoGanhosUltimaHoraValida()} />
                    <DashCard Icon={FaCalendar} className="md:col-span-2" titulo="Ganhos no último mês" conteudo={calculoGanhosMensal()} />
                </div>

                <div className="container max-w-custom grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="w-full flex justify-center bg-[#000d13] rounded-lg shadow-custom-grafico p-2">
                        <Grafico tipo="line" titulo="Ganhos Diários" labelSolo="Dero" dadosGrafico={apiData.ganhosDiarios.data} dadosLabels={apiData.ganhosDiarios.labels} />
                    </div>

                    <div className="w-full flex justify-center bg-[#000d13] rounded-lg shadow-custom-grafico p-2">
                        <Grafico tipo="bar" titulo="Ganhos por Hora (48h)" labelSolo="Dero" dadosGrafico={apiData.ganhosHora.data} dadosLabels={apiData.ganhosHora.labels} isHour />
                    </div>
                </div>


                <div className="bg-[#000d13] container max-w-custom flex flex-col items-center gap-2">
                    <h2 className="text-[#0084a9] text-lg font-semibold">Informações encontradas:</h2>

                    <div className="w-full flex flex-col gap-2 p-2">
                        {apiData.dadosMinerador.map((elt, i) => {
                            const event = elt.event

                            return (
                                <div key={elt.event_id} className={`flex justify-between gap-2 w-full ${i % 2 == 0 ? "bg-transparent" : "bg-[#002534]"}`}>
                                    <h3 className="flex-1 text-center">{elt.event_type === "blockMined" ? "Bloco Minerado" : "Bloco Órfão"}</h3>

                                    <p className="flex-1 text-center">Height: {event.height}</p>

                                    <p className="flex-1 text-center">Difficulty: {event.difficulty}</p>

                                    <p className="flex-1 text-center">Data: {new Date(event.timestamp).toLocaleDateString()}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                            {minerPagination.page !== "1" && <button type="button" onClick={prevPage}><IoIosArrowBack /></button>}
                            <p>Página atual: {minerPagination.page}</p>
                            {apiData.meta.totalPages !== apiData.meta.currentPage && <button type="button" onClick={nextPage}><IoIosArrowForward /></button>}
                        </div>
                        <p>Total de páginas: {apiData.meta.totalPages} | Total de eventos: {apiData.meta.totalEvents}</p>
                        <div>
                            <p>Eventos por página: {minerPagination.pageSize}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
