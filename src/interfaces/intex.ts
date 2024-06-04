import { IconType } from "react-icons"

export interface iGraficoResponse {
    labels: string[]
    data: number[]
    diff?: number
    updated_at?: string
}

export interface iDashboardData {
    valor: {
        valor: string
        variacao: string
    }
    market_cap: string
    volume: string
    chainHeight: number
    networkHashrate1d: number
    networkHashrate7d: number
    grafico: {
        graficoMedia: iGraficoResponse
        graficoHora: iGraficoResponse
    }
}

export interface iMinerData {
    dadosMinerador: {
        event_id: string
        event_type: string
        miner: string
        event: {
            event_type: string
            height: string
            difficulty: string
            timestamp: string
        }
    }[]
    ganhosHora: iGraficoResponse
    ganhosDiarios: iGraficoResponse
    meta: {
        totalEvents: number
		totalPages: number
		pageSize: number
		currentPage: number
    }
}

export interface iLandingPageProps {
    setExibirLanding: React.Dispatch<React.SetStateAction<boolean>>
}

export interface iDashCardProps {
    className?: string
    Icon: IconType
    titulo: string
    variacao?: string
    conteudo: string
}

export interface iGraficoProps {
    tipo: string
    dadosLabels: string[]
    dadosGrafico: number[]
    labelSolo: string | undefined
    titulo: string
    alt?: JSX.Element
    isHour?: boolean
}

export interface iMinerPagination {
    page: string
    pageSize: string
}

export interface iMinerPageProps {
    loading: boolean
    apiData: iMinerData
    request: (wallet: string, page?: string, pageSize?: string) => Promise<void>
}