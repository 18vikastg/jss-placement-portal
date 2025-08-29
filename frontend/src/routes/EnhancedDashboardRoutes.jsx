import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EnhancedFacultyDashboard from '../components/faculty/EnhancedFacultyDashboard';
import EnhancedRecruiterDashboard from '../components/recruiter/EnhancedRecruiterDashboard';
import FacultyStudents from '../components/faculty/FacultyStudents';
import FacultyPlacements from '../components/faculty/FacultyPlacements';

// Enhanced Routes for Faculty and Recruiter modules
const EnhancedDashboardRoutes = () => {
    return (
        <Routes>
            {/* Faculty Routes */}
            <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
            <Route path="/faculty/dashboard" element={<EnhancedFacultyDashboard />} />
            <Route path="/faculty/students" element={<FacultyStudents />} />
            <Route path="/faculty/placements" element={<FacultyPlacements />} />
            
            {/* Recruiter Routes */}
            <Route path="/recruiter" element={<Navigate to="/recruiter/dashboard" replace />} />
            <Route path="/recruiter/dashboard" element={<EnhancedRecruiterDashboard />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/faculty/dashboard" replace />} />
        </Routes>
    );
};

export default EnhancedDashboardRoutes;
