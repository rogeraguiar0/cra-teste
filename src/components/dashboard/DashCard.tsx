import { iDashCardProps } from "../../interfaces/intex"

export const DashCard = ({Icon ,titulo, variacao, conteudo, className }: iDashCardProps) => {
    return (
        <div className={`bg-[#000d13] rounded-lg p-2 flow mobile:flex mobile:justify-between flex-row md:p-4 shadow-custom-card ${className}`}>
            <div className="flex flex-col items-center md:items-start p-1 gap-2">
                <h2 className="text-[#0084a9] text-base font-semibold text-left">{titulo} </h2>
                <p className="text-[#F6F6F6] text-base font-bold">
                    {conteudo}
                    {variacao  && 
                        <span className={`${variacao?.charAt(0) == "+" ? "text-green-500" : "text-red-500"} text-xs pl-3`}>
                            {variacao}
                        </span>
                    }
                </p> 
            </div>
            <div className="w-full h-16 mt-4 mobile:w-16 mobile:mt-0 md:h-16 bg-custom-icon flex items-center justify-center rounded-lg">
                <Icon color="#ffffff" className="text-3xl" />
            </div>
        </div>
    )
}
