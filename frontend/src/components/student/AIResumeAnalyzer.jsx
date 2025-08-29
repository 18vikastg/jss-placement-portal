import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Brain, ExternalLink, Server, Upload, RefreshCw, Play, Square } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { AI_RESUME_ANALYZER_API_END_POINT } from '@/utils/constant';

const AIResumeAnalyzer = () => {
    const [analyzerStatus, setAnalyzerStatus] = useState({ running: false, url: null, port: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    // Check analyzer status on component mount
    useEffect(() => {
        checkAnalyzerStatus();
    }, []);

    const checkAnalyzerStatus = async () => {
        try {
            const response = await axios.get(`${AI_RESUME_ANALYZER_API_END_POINT}/status`, {
                withCredentials: true,
            });
            
            if (response.data.success) {
                setAnalyzerStatus(response.data);
            }
        } catch (error) {
            console.error('Error checking analyzer status:', error);
            setAnalyzerStatus({ running: false, url: null, port: null });
        }
    };

    const startAnalyzer = async () => {
        setIsStarting(true);
        try {
            toast.info('Starting your AI Resume Analyzer... This may take a moment.');
            
            const response = await axios.get(`${AI_RESUME_ANALYZER_API_END_POINT}/start`, {
                withCredentials: true,
            });

            if (response.data.success) {
                setAnalyzerStatus({
                    running: true,
                    url: response.data.url,
                    port: response.data.port
                });
                toast.success('Your AI Resume Analyzer is now running!');
            } else {
                toast.error('Failed to start analyzer');
            }
        } catch (error) {
            console.error('Error starting analyzer:', error);
            toast.error(error.response?.data?.message || 'Failed to start analyzer');
        } finally {
            setIsStarting(false);
        }
    };

    const stopAnalyzer = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${AI_RESUME_ANALYZER_API_END_POINT}/stop`, {}, {
                withCredentials: true,
            });

            if (response.data.success) {
                setAnalyzerStatus({ running: false, url: null, port: null });
                toast.success('AI Resume Analyzer stopped');
            }
        } catch (error) {
            console.error('Error stopping analyzer:', error);
            toast.error('Failed to stop analyzer');
        } finally {
            setIsLoading(false);
        }
    };

    const openAnalyzer = () => {
        if (analyzerStatus.url) {
            window.open(analyzerStatus.url, '_blank');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                    <Brain className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Your AI Resume Analyzer</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Access your powerful Streamlit-based AI Resume Analyzer with comprehensive NLP analysis, 
                    intelligent scoring, field recommendations, and skill insights.
                </p>
            </div>

            {/* Status Card */}
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Server className="w-5 h-5" />
                        <span>Analyzer Status</span>
                        <Badge variant={analyzerStatus.running ? "default" : "secondary"}>
                            {analyzerStatus.running ? "Running" : "Stopped"}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Control and access your AI Resume Analyzer application
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Status Display */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {analyzerStatus.running ? "🟢 Online" : "🔴 Offline"}
                            </div>
                            <div className="text-sm text-gray-600">Status</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {analyzerStatus.port || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">Port</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {analyzerStatus.url ? "Ready" : "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">URL Status</div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button
                            onClick={checkAnalyzerStatus}
                            variant="outline"
                            disabled={isLoading}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh Status
                        </Button>

                        {!analyzerStatus.running ? (
                            <Button
                                onClick={startAnalyzer}
                                disabled={isStarting}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isStarting ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Starting...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Start Analyzer
                                    </>
                                )}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={openAnalyzer}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open Analyzer
                                </Button>
                                <Button
                                    onClick={stopAnalyzer}
                                    variant="destructive"
                                    disabled={isLoading}
                                >
                                    <Square className="w-4 h-4 mr-2" />
                                    Stop Analyzer
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Analyzer URL Display */}
                    {analyzerStatus.running && analyzerStatus.url && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-blue-900">Your Analyzer is Running:</p>
                                    <p className="text-blue-700 font-mono text-sm">{analyzerStatus.url}</p>
                                </div>
                                <Button 
                                    onClick={openAnalyzer}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    Open
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Features Overview */}
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>Your AI Resume Analyzer Features</span>
                    </CardTitle>
                    <CardDescription>
                        Comprehensive resume analysis powered by advanced NLP and machine learning
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">🎯 Field Detection</h4>
                            <p className="text-sm text-gray-600">
                                Automatically identifies your career field (Data Science, Web Dev, UI/UX, etc.)
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">📊 Smart Scoring</h4>
                            <p className="text-sm text-gray-600">
                                Comprehensive resume scoring with detailed breakdown and recommendations
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">🔍 Skills Analysis</h4>
                            <p className="text-sm text-gray-600">
                                NLP-powered skill extraction and field-specific skill recommendations
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">📚 Course Suggestions</h4>
                            <p className="text-sm text-gray-600">
                                Personalized course recommendations based on your career field
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">📈 Progress Tracking</h4>
                            <p className="text-sm text-gray-600">
                                Track your resume improvements over time with analytics
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">💾 Database Storage</h4>
                            <p className="text-sm text-gray-600">
                                Secure storage of analysis results and user feedback
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Embedded Analyzer (when running) */}
            {analyzerStatus.running && analyzerStatus.url && (
                <Card className="w-full max-w-6xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                                <Upload className="w-5 h-5" />
                                <span>AI Resume Analyzer</span>
                            </span>
                            <Button 
                                onClick={openAnalyzer}
                                size="sm"
                                variant="outline"
                            >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Open in New Tab
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <iframe
                            src={analyzerStatus.url}
                            width="100%"
                            height="800"
                            frameBorder="0"
                            title="AI Resume Analyzer"
                            className="rounded-lg"
                            style={{ minHeight: '800px' }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Instructions */}
            {!analyzerStatus.running && (
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle>🚀 Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <p className="text-gray-700">
                                <strong>Step 1:</strong> Click "Start Analyzer" to launch your AI Resume Analyzer
                            </p>
                            <p className="text-gray-700">
                                <strong>Step 2:</strong> Wait for the application to start (may take 30-60 seconds)
                            </p>
                            <p className="text-gray-700">
                                <strong>Step 3:</strong> Upload your resume and get comprehensive AI-powered analysis
                            </p>
                            <p className="text-gray-700">
                                <strong>Step 4:</strong> Review detailed recommendations and improve your resume
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AIResumeAnalyzer;
