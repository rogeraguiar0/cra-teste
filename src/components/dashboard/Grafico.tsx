import React, { useEffect, useRef } from "react";
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     BarElement,
     LineElement,
     PointElement,
     Title,
     Tooltip,
     Legend,
     Filler,
     TooltipItem,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { iGraficoProps } from "../../interfaces/intex";
import { getHourFromDate } from "../../utils/data";

ChartJS.register(
     CategoryScale,
     LinearScale,
     BarElement,
     LineElement,
     PointElement,
     Tooltip,
     Title,
     Legend,
     Filler
);

export const Grafico = ({ tipo, dadosLabels, dadosGrafico, labelSolo, titulo, alt, isHour }: iGraficoProps) => {
     const chartRefBar = useRef<ChartJS<"bar"> | null>(null);
     const chartRefLine = useRef<ChartJS<"line"> | null>(null);

     const formataDataLabelTop = (dataLabel: string, tipoFormatacao: string) => {
          const data = new Date(dataLabel)
          const dia = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(data);
          let mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(data);
          mes = mes.charAt(0).toUpperCase() + mes.slice(1)
          const ano = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(data);
          return tipoFormatacao === 'label' ? `${dia} ${mes}` : `${dia} ${mes}, ${ano}`
     }

     const formataDataLabelBottom = (dataLabel: string, tipoFormatacao: string) => {
          if (isHour) {
               return getHourFromDate(dataLabel)
          }

          const data = new Date(dataLabel)
          const dia = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(data);
          let mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(data);
          mes = mes.charAt(0).toUpperCase() + mes.slice(1)
          const ano = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(data);
          return tipoFormatacao === 'label' ? `${dia} ${mes}` : `${dia} ${mes}, ${ano}`
     }

     useEffect(() => {
          const chart = tipo === "bar" ? chartRefBar.current : chartRefLine.current;
          
          if (chart) {
               const ctx = chart.ctx;
               const gradient = ctx.createLinearGradient(0, 0, 0, 400);
               gradient.addColorStop(0, '#7FFFD4');
               gradient.addColorStop(1, '#1E90FF');

               chart.data.datasets[0].backgroundColor = gradient;
               chart.update();
          }
     }, []);

     const options = {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
               padding: {
                    left: 10,
                    right: 10,
                    top: 80,
                    bottom: 10
               }
          },
          plugins: {
               legend: {
                    display: false, // Esconde a legenda
               },
               title: {
                    display: false
               },
               tooltip: {
                    enabled: true,
                    bodyColor: '#E0E0E0', // Cor da fonte do tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo do tooltip
                    titleColor: '#E0E0E0', // Cor da fonte do título do tooltip
                    callbacks: {
                         title: function (context: TooltipItem<"line">[] | TooltipItem<"bar">[]) {
                              // Customize o título do tooltip aqui
                              const index = context[0].dataIndex;
                              return formataDataLabelTop(dadosLabels[index], 'tolltip');
                         },
                         label: function (context: TooltipItem<"line"> | TooltipItem<"bar">) {
                              // Customize o rótulo do tooltip aqui
                              const label = context.dataset.label || '';
                              const value = context.raw;
                              return `${label}: ${value}`;
                         }
                    }
               }
          },
          scales: {
               x: {
                    ticks: {
                         color: '#E0E0E0', // Cor das fontes dos rótulos do eixo X
                         maxRotation: 90,
                         minRotation: 45,
                    },
                    grid: {
                         display: false // Esconde as linhas de grade do eixo X
                    }
               },
               y: {
                    ticks: {
                         color: '#E0E0E0', // Cor das fontes dos rótulos do eixo Y
                    },
                    grid: {
                         color: 'rgba(224, 224, 224, 0.2)', // Linhas de grade pontilhadas
                         borderDash: [5, 5],
                    },
               },
          },
     };

     const data = {
          labels: dadosLabels.map(label => formataDataLabelBottom(label, 'label')),
          datasets: [
               {
                    label: labelSolo,
                    data: dadosGrafico,
                    borderColor: '#7FFFD4', // Cor das bordas das barras
                    borderWidth: 1,
               }
          ]
     }

     return (
          <div className="relative w-full h-64 md:h-80">
               <div className="absolute top-0 left-0 p-2 text-gray-300">
                    <p className="text-[#0084a9] text-base font-semibold">{titulo}</p>
                    {alt && <p>{alt}</p>}
               </div>

               {tipo === 'bar' ? <Bar ref={chartRefBar} data={data} options={options} /> : <Line ref={chartRefLine} data={data} options={options} />}
          </div>
     )
}
