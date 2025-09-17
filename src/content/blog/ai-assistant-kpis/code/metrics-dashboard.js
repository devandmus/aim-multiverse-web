/**
 * Dashboard de métricas para asistentes de IA
 * Componente React para mostrar KPIs en tiempo real
 */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MetricsDashboard = () => {
    const [metrics, setMetrics] = useState({
        responseTime: 0,
        accuracy: 0,
        userSatisfaction: 0,
        totalInteractions: 0,
        escalationRate: 0,
        kpiImprovement: {}
    });

    const [timeSeriesData, setTimeSeriesData] = useState([]);

    // Simular datos en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prevMetrics => ({
                ...prevMetrics,
                responseTime: Math.random() * 2 + 0.5, // 0.5-2.5 segundos
                accuracy: Math.random() * 20 + 80, // 80-100%
                userSatisfaction: Math.random() * 2 + 4, // 4-6 puntos
                totalInteractions: prevMetrics.totalInteractions + Math.floor(Math.random() * 3),
                escalationRate: Math.random() * 10 + 5, // 5-15%
            }));

            // Actualizar datos de serie temporal
            const now = new Date();
            const newDataPoint = {
                time: now.toLocaleTimeString(),
                responseTime: Math.random() * 2 + 0.5,
                accuracy: Math.random() * 20 + 80,
                interactions: Math.floor(Math.random() * 10) + 5
            };

            setTimeSeriesData(prev => {
                const updated = [...prev, newDataPoint];
                return updated.slice(-20); // Mantener solo los últimos 20 puntos
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const kpiCards = [
        {
            title: 'Tiempo de Respuesta',
            value: `${metrics.responseTime.toFixed(1)}s`,
            target: '< 2s',
            status: metrics.responseTime < 2 ? 'good' : 'warning',
            icon: '⚡'
        },
        {
            title: 'Precisión',
            value: `${metrics.accuracy.toFixed(1)}%`,
            target: '> 85%',
            status: metrics.accuracy > 85 ? 'good' : 'warning',
            icon: '🎯'
        },
        {
            title: 'Satisfacción Usuario',
            value: `${metrics.userSatisfaction.toFixed(1)}/5`,
            target: '> 4.5',
            status: metrics.userSatisfaction > 4.5 ? 'good' : 'warning',
            icon: '😊'
        },
        {
            title: 'Interacciones Totales',
            value: metrics.totalInteractions.toLocaleString(),
            target: 'Crecimiento',
            status: 'info',
            icon: '📊'
        },
        {
            title: 'Tasa de Escalación',
            value: `${metrics.escalationRate.toFixed(1)}%`,
            target: '< 15%',
            status: metrics.escalationRate < 15 ? 'good' : 'warning',
            icon: '🔄'
        }
    ];

    return (
        <div className="metrics-dashboard bg-base-dark text-base-light p-6 rounded-xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Dashboard de Métricas IA</h2>
                <p className="text-base-grey">Monitoreo en tiempo real del asistente de IA</p>
            </div>

            {/* Tarjetas de KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {kpiCards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg border ${card.status === 'good' ? 'border-green-500 bg-green-500/10' :
                                card.status === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
                                    'border-blue-500 bg-blue-500/10'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{card.icon}</span>
                            <span className="text-xs text-base-grey">{card.target}</span>
                        </div>
                        <h3 className="font-semibold mb-1">{card.title}</h3>
                        <p className="text-xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Gráficos de tendencias */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de tiempo de respuesta */}
                <div className="bg-base-darker p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Tiempo de Respuesta</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    color: '#F5F5F5'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="responseTime"
                                stroke="#00FFF7"
                                strokeWidth={2}
                                dot={{ fill: '#00FFF7', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de precisión */}
                <div className="bg-base-darker p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Precisión del Asistente</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    color: '#F5F5F5'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="accuracy"
                                stroke="#F8F32B"
                                strokeWidth={2}
                                dot={{ fill: '#F8F32B', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Alertas y recomendaciones */}
            <div className="mt-6 bg-base-darker p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Alertas y Recomendaciones</h3>
                <div className="space-y-2">
                    {metrics.responseTime > 2 && (
                        <div className="flex items-center gap-2 text-yellow-400">
                            <span>⚠️</span>
                            <span>Tiempo de respuesta por encima del objetivo. Considera optimizar el modelo.</span>
                        </div>
                    )}
                    {metrics.accuracy < 85 && (
                        <div className="flex items-center gap-2 text-yellow-400">
                            <span>⚠️</span>
                            <span>Precisión por debajo del 85%. Revisa el entrenamiento del modelo.</span>
                        </div>
                    )}
                    {metrics.escalationRate > 15 && (
                        <div className="flex items-center gap-2 text-yellow-400">
                            <span>⚠️</span>
                            <span>Alta tasa de escalación. Mejora las respuestas automáticas.</span>
                        </div>
                    )}
                    {metrics.responseTime <= 2 && metrics.accuracy >= 85 && metrics.escalationRate <= 15 && (
                        <div className="flex items-center gap-2 text-green-400">
                            <span>✅</span>
                            <span>Todas las métricas están dentro de los objetivos. ¡Excelente trabajo!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricsDashboard;
