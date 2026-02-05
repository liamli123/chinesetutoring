'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { manimClient, ManimJob } from '@/lib/manim-client';
import { Loader2, PlayCircle, AlertCircle, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ManimGenerator() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentJob, setCurrentJob] = useState<ManimJob | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<string>('');
    const pollInterval = useRef<NodeJS.Timeout | null>(null);

    const startGeneration = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setError(null);
        setLogs('');
        setCurrentJob(null);

        try {
            const jobId = await manimClient.startRender(prompt);
            const initialJob = await manimClient.getJobStatus(jobId);
            setCurrentJob(initialJob);

            // Start polling
            pollInterval.current = setInterval(async () => {
                try {
                    const status = await manimClient.getJobStatus(jobId);
                    setCurrentJob(status);

                    if (status.status === 'done' || status.status === 'error' || status.status === 'cancelled') {
                        stopPolling();
                        setIsGenerating(false);
                        if (status.status === 'error') {
                            setError(status.error || 'Unknown error occurred');
                            // Fetch logs on error
                            const logContent = await manimClient.getJobLog(jobId);
                            setLogs(logContent);
                        }
                    } else {
                        // Still running, maybe fetch logs intermittently? 
                        // Let's only fetch logs if it's taking a while or on demand
                    }
                } catch (err) {
                    console.error("Polling error", err);
                    stopPolling();
                    setIsGenerating(false);
                    setError("Failed to poll job status");
                }
            }, 2000);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to start generation");
            setIsGenerating(false);
        }
    };

    const stopPolling = () => {
        if (pollInterval.current) {
            clearInterval(pollInterval.current);
            pollInterval.current = null;
        }
    };

    const cancelGeneration = async () => {
        if (currentJob && isGenerating) {
            await manimClient.cancelJob(currentJob.job_id);
            stopPolling();
            setIsGenerating(false);
            setCurrentJob(prev => prev ? { ...prev, status: 'cancelled' } : null);
        }
    };

    useEffect(() => {
        return () => stopPolling();
    }, []);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Math Visualizer
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="logs" disabled={!currentJob}>Logs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Describe the animation
                            </label>
                            <Textarea
                                placeholder="E.g. Draw a blue circle and then morph it into a square..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isGenerating}
                                className="min-h-[100px] resize-y font-mono text-sm"
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {currentJob && (
                            <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center min-h-[300px]">
                                {currentJob.status === 'done' && currentJob.video_url ? (
                                    <video
                                        controls
                                        autoPlay
                                        className="w-full max-h-[500px] rounded shadow-sm"
                                        src={currentJob.video_url.startsWith('http') ? currentJob.video_url : `${process.env.NEXT_PUBLIC_MANIM_API_URL}${currentJob.video_url}`}
                                    />
                                ) : (
                                    <div className="text-center space-y-4">
                                        {currentJob.status === 'running' || currentJob.status === 'queued' ? (
                                            <>
                                                <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto" />
                                                <div className="space-y-1">
                                                    <p className="font-medium text-lg">Generating Animation...</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {currentJob.status === 'queued' ? 'Waiting in queue...' : 'Rendering 3D scene...'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Estimated time: {Math.round(currentJob.estimated_seconds || 15)}s
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-muted-foreground">Status: {currentJob.status}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="logs">
                        <div className="bg-black text-green-400 p-4 rounded-md font-mono text-xs h-[400px] overflow-auto whitespace-pre-wrap">
                            {logs || "No logs available yet..."}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                    Powered by 3Blue1Brown's Manim & DeepSeek
                </div>
                {isGenerating ? (
                    <Button variant="destructive" onClick={cancelGeneration}>Cancel</Button>
                ) : (
                    <Button onClick={startGeneration} disabled={!prompt.trim() || isGenerating} className="bg-blue-600 hover:bg-blue-700">
                        <PlayCircle className="mr-2 h-4 w-4" /> Generate
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
