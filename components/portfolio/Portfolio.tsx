import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart } from 'lucide-react';

const Portfolio = () => {
    const portfolioData = [
        { date: '2023-01-01', value: 1000 },
        { date: '2023-02-01', value: 1200 },
        { date: '2023-03-01', value: 1100 },
        { date: '2023-04-01', value: 1400 },
        { date: '2023-05-01', value: 1300 },
        { date: '2023-06-01', value: 1600 },
    ]

    const renderPortfolioChart = (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={portfolioData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold">OverView</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[200px] items-center justify-center">
                            <PieChart className="size-full text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderPortfolioChart}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export { Portfolio };