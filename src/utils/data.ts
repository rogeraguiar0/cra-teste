export const formatUpdatedAt = (date: string) => {
    const getDate = new Date(date)

    const minutes = getDate.getMinutes()
    const hours = getDate.getHours()

    return `${hours}:${minutes}`
}

export const getHourFromDate = (date: string) => {
    const data = new Date(date)
    let horas = data.getHours()
    const periodo = horas >= 12 ? 'PM' : 'AM'

    horas = horas % 12
    horas = horas ? horas : 12

    const horasFormatadas = horas.toString().padStart(2, '0')

    return `${horasFormatadas} ${periodo}`
}