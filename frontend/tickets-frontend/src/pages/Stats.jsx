import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stats } from '../api/ticket.service';

export default function Stats() {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => {
        fetchStats();}, 5000); // Refresh every 5 seconds

        fetchStats(); 
    }, []);

    const fetchStats = async () => {
        try {
            const response = await stats();
            setStatsData(response);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Statistics</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Dashboard
                    </button>
                </div>

                {statsData && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-600">Total Tickets</p>
                            <p className="text-3xl font-bold text-blue-600">{statsData.total_tickets}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-600">Open Tickets</p>
                            <p className="text-3xl font-bold text-orange-600">{statsData.open_tickets}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-600 mb-3">Priority Breakdown</p>
                            <div className="space-y-2">
                                <p>High: <span className="font-bold text-red-600">{statsData.priority_breakdown.high}</span></p>
                                <p>Medium: <span className="font-bold text-yellow-600">{statsData.priority_breakdown.medium}</span></p>
                                <p>Low: <span className="font-bold text-green-600">{statsData.priority_breakdown.low}</span></p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-600 mb-3">Category Breakdown</p>
                            <div className="space-y-2">
                                {Object.entries(statsData.category_breakdown).map(([key, value]) => (
                                    <p key={key}>{key}: <span className="font-bold">{value}</span></p>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded shadow col-span-2">
                            <p className="text-gray-600">Average Tickets Per Day</p>
                            <p className="text-3xl font-bold text-purple-600">{statsData.avg_tickets_per_day}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}