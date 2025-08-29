import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads to your existing analyzer directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../ai-resume-analyser/Uploaded_Resumes');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Keep original filename with timestamp to avoid conflicts
        const timestamp = Date.now();
        const originalName = file.originalname;
        cb(null, `${timestamp}_${originalName}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow only PDF, DOC, and DOCX files
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
        }
    }
});

// Global variable to track Streamlit process
let streamlitProcess = null;
let streamlitPort = 8501; // Default Streamlit port

// Function to start your Streamlit app
const startStreamlitApp = () => {
    return new Promise((resolve, reject) => {
        if (streamlitProcess && !streamlitProcess.killed) {
            console.log("Your AI Resume Analyzer is already running");
            resolve(streamlitPort);
            return;
        }

        console.log("Starting your AI Resume Analyzer Streamlit app...");
        const analyzerPath = path.join(__dirname, '../../ai-resume-analyser');
        const streamlitPath = path.join(__dirname, '../../ai-resume-analyser/.venv/bin/streamlit');
        
    // Spawn streamlit process
    streamlitProcess = spawn(streamlitPath, [
        'run', 'App/App.py',
        '--server.port=8502',
        '--server.headless=true',
        '--server.address=localhost'
    ], {
        cwd: analyzerPath,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe']
    });        streamlitProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`Streamlit output: ${output}`);
            
            // Check if Streamlit is ready
            if (output.includes('You can now view your Streamlit app in your browser') || 
                output.includes('Local URL:') || 
                output.includes('Network URL:')) {
                console.log(`Your AI Resume Analyzer started successfully on port ${streamlitPort}`);
                resolve(streamlitPort);
            }
        });

        streamlitProcess.stderr.on('data', (data) => {
            const error = data.toString();
            console.error(`Streamlit error: ${error}`);
            
            // If port is in use, try next port
            if (error.includes('Address already in use')) {
                streamlitPort++;
                console.log(`Port busy, trying port ${streamlitPort}`);
                streamlitProcess.kill();
                setTimeout(() => startStreamlitApp().then(resolve).catch(reject), 1000);
            }
        });

        streamlitProcess.on('error', (error) => {
            console.error('Failed to start your Streamlit app:', error);
            reject(error);
        });

        streamlitProcess.on('close', (code) => {
            console.log(`Your Streamlit process exited with code ${code}`);
            streamlitProcess = null;
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            if (streamlitProcess && !streamlitProcess.killed) {
                console.log("Your AI Resume Analyzer started (timeout reached)");
                resolve(streamlitPort);
            }
        }, 30000);
    });
};

// Route to start/get your Streamlit app URL
router.get('/start', async (req, res) => {
    try {
        const port = await startStreamlitApp();
        res.json({
            success: true,
            message: 'Your AI Resume Analyzer is ready',
            url: `http://localhost:${port}`,
            port: port,
            description: 'Full-featured AI Resume Analyzer with NLP, scoring, and recommendations'
        });
    } catch (error) {
        console.error('Error starting your Streamlit app:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start your AI Resume Analyzer',
            error: error.message
        });
    }
});

// Route to check if your Streamlit app is running
router.get('/status', (req, res) => {
    const isRunning = streamlitProcess && !streamlitProcess.killed;
    res.json({
        success: true,
        running: isRunning,
        port: isRunning ? streamlitPort : null,
        url: isRunning ? `http://localhost:${streamlitPort}` : null,
        message: isRunning ? 'Your AI Resume Analyzer is running' : 'Your AI Resume Analyzer is not running'
    });
});

// Route to stop your Streamlit app
router.post('/stop', (req, res) => {
    if (streamlitProcess && !streamlitProcess.killed) {
        streamlitProcess.kill();
        streamlitProcess = null;
        res.json({
            success: true,
            message: 'Your AI Resume Analyzer stopped'
        });
    } else {
        res.json({
            success: true,
            message: 'Your AI Resume Analyzer was not running'
        });
    }
});

// Upload resume file to your analyzer's upload directory
router.post('/upload', upload.single('resume'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // File uploaded to your ai-resume-analyser/Uploaded_Resumes directory
        res.json({
            success: true,
            message: 'Resume uploaded to your AI Resume Analyzer successfully',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                path: req.file.path,
                uploadedTo: 'ai-resume-analyser/Uploaded_Resumes'
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        service: 'Your AI Resume Analyzer Integration API',
        timestamp: new Date().toISOString(),
        streamlit_running: streamlitProcess && !streamlitProcess.killed,
        analyzer_path: path.join(__dirname, '../../ai-resume-analyser'),
        description: 'Integration API for your existing Streamlit-based AI Resume Analyzer'
    });
});

export default router;
