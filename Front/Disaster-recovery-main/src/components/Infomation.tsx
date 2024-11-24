    import React, { useState, useEffect } from 'react';
    // import axios from 'axios';
    import { Card, CardContent } from './ui/card';
    import { Button } from './ui/button';

    interface Article {
    id: number;
    title: string;
    summary: string;
    link: string;
    }

    const DisasterInfo: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Dummy data for demonstration purposes.
        const fetchArticles = async () => {
        const dummyArticles: Article[] = [
            {
            id: 1,
            title: 'Flood Preparedness Guide',
            summary: 'Steps to prepare for floods, including safety tips and evacuation plans.',
            link: 'https://redcross.or.ke/flood-guide',
            },
            {
            id: 2,
            title: 'Weather Updates from KMD',
            summary: 'Stay updated with the latest weather forecasts and warnings.',
            link: 'https://meteo.go.ke',
            },
            {
            id: 3,
            title: 'Emergency Contacts in Kenya',
            summary: 'A list of key contacts during emergencies.',
            link: 'https://redcross.or.ke/emergency-contacts',
            },
        ];
        setArticles(dummyArticles);
        };

        fetchArticles();
    }, []);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Disaster Preparedness Information</h1>

        <div className="mb-6">
            <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
            <Card key={article.id} className="border rounded-lg overflow-hidden">
                <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Read More
                </a>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
            <ul className="list-disc pl-6">
            <li>Kenya Red Cross Hotline: 1199</li>
            <li>Fire Department: 999</li>
            <li>Police Emergency Line: 112</li>
            <li>Ambulance Services: [Insert local number]</li>
            </ul>
        </div>

        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Downloadable Resources</h2>
            <Button className="bg-blue-600 text-white px-4 py-2">
            <a href="https://redcross.or.ke/flood-guide" target="_blank" rel="noopener noreferrer">
                Download Flood Preparedness Guide
            </a>
            </Button>
        </div>
        </div>
    );
    };

    export default DisasterInfo;
