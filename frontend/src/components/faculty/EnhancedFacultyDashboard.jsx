import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
    Users, 
    GraduationCap, 
    Building2, 
    TrendingUp, 
    Search, 
    Download,
    Eye,
    Mail,
    Phone,
    Calendar,
    Award,
    FileText,
    BarChart3,
    Filter,
    RefreshCw,
    BookOpen,
    Target,
    Clock,
    CheckCircle,
    AlertCircle,
    PieChart,
    Activity,
    MapPin,
    Star,
    MessageSquare,
    Bell,
    Settings
} from 'lucide-react';
import { toast } from 'sonner';

const EnhancedFacultyDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [selectedBatch, setSelectedBatch] = useState('all');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        // Enhanced mock data with realistic metrics
        const mockData = {
            statistics: {
                totalStudents: 245,
                profileCompletedStudents: 198,
                profileCompletionRate: 81,
                activeDrives: 8,
                placedStudents: 156,
                averageCGPA: 7.8,
                pendingApplications: 23,
                upcomingInterviews: 12
            },
            recentApplications: [
                {
                    _id: '1',
                    applicant: { fullName: 'Priya Sharma', usn: '1JS22CS045', branch: 'CSE' },
                    job: { title: 'Software Developer', company: 'Infosys' },
                    status: 'Shortlisted',
                    appliedDate: '2025-08-28'
                },
                {
                    _id: '2',
                    applicant: { fullName: 'Rahul Kumar', usn: '1JS22EC032', branch: 'ECE' },
                    job: { title: 'Data Analyst', company: 'TCS' },
                    status: 'Interview Scheduled',
                    appliedDate: '2025-08-27'
                },
                {
                    _id: '3',
                    applicant: { fullName: 'Anita Reddy', usn: '1JS22IT018', branch: 'IT' },
                    job: { title: 'Frontend Developer', company: 'Wipro' },
                    status: 'Applied',
                    appliedDate: '2025-08-26'
                }
            ],
            activeDrives: [
                {
                    _id: '1',
                    title: 'Software Development Program',
                    company: { name: 'Microsoft', logo: null },
                    status: 'Active',
                    deadline: '2025-09-15',
                    positions: 25,
                    applicants: 89
                },
                {
                    _id: '2',
                    title: 'Graduate Engineer Trainee',
                    company: { name: 'Amazon', logo: null },
                    status: 'Active',
                    deadline: '2025-09-20',
                    positions: 15,
                    applicants: 67
                }
            ],
            branchWiseStats: [
                { branch: 'Computer Science', total: 85, placed: 68, percentage: 80 },
                { branch: 'Electronics & Communication', total: 72, placed: 51, percentage: 71 },
                { branch: 'Information Technology', total: 58, placed: 37, percentage: 64 },
                { branch: 'Mechanical Engineering', total: 30, placed: 18, percentage: 60 }
            ]
        };
        
        setDashboardData(mockData);
        
        // Enhanced mock students data
        const mockStudents = [
            {
                _id: '1',
                fullName: 'Arjun Patel',
                usn: '1JS22CS001',
                email: 'arjun.patel@jssate.ac.in',
                phoneNumber: '9876543210',
                profile: {
                    academicInfo: { 
                        cgpa: 9.2, 
                        branch: 'Computer Science Engineering',
                        semester: 8,
                        batch: '2025'
                    },
                    profileCompletion: 95,
                    placementStatus: 'Placed',
                    company: 'Google',
                    package: '45 LPA',
                    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
                    projects: 4,
                    internships: 2
                },
                profilePhoto: 'https://github.com/shadcn.png'
            },
            {
                _id: '2',
                fullName: 'Sneha Reddy',
                usn: '1JS22EC015',
                email: 'sneha.reddy@jssate.ac.in',
                phoneNumber: '9876543211',
                profile: {
                    academicInfo: { 
                        cgpa: 8.7, 
                        branch: 'Electronics & Communication',
                        semester: 8,
                        batch: '2025'
                    },
                    profileCompletion: 88,
                    placementStatus: 'Interviewing',
                    company: 'Intel',
                    skills: ['VLSI', 'Python', 'MATLAB', 'Circuit Design'],
                    projects: 3,
                    internships: 1
                }
            },
            {
                _id: '3',
                fullName: 'Kiran Kumar',
                usn: '1JS22IT023',
                email: 'kiran.kumar@jssate.ac.in',
                phoneNumber: '9876543212',
                profile: {
                    academicInfo: { 
                        cgpa: 8.1, 
                        branch: 'Information Technology',
                        semester: 8,
                        batch: '2025'
                    },
                    profileCompletion: 75,
                    placementStatus: 'Applied',
                    skills: ['Java', 'Spring Boot', 'React', 'MySQL'],
                    projects: 2,
                    internships: 1
                }
            }
        ];

        setStudents(mockStudents);
        setLoading(false);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-green-100 text-green-800 border-green-200';
            case 'Interviewing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shortlisted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Applied': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.usn.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBranch = selectedBranch === 'all' || 
                             student.profile.academicInfo.branch.includes(selectedBranch);
        const matchesBatch = selectedBatch === 'all' || 
                           student.profile.academicInfo.batch === selectedBatch;
        return matchesSearch && matchesBranch && matchesBatch;
    });

    if (loading || !dashboardData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Enhanced Header */}
                <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-sm border">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                            Faculty Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">JSS Academy of Technical Education - Placement Cell</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Enhanced Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Total Students</CardTitle>
                            <Users className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardData.statistics.totalStudents}</div>
                            <p className="text-xs opacity-80 mt-1">Active registrations</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Placed Students</CardTitle>
                            <CheckCircle className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardData.statistics.placedStudents}</div>
                            <p className="text-xs opacity-80 mt-1">Successfully placed</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Active Drives</CardTitle>
                            <Building2 className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardData.statistics.activeDrives}</div>
                            <p className="text-xs opacity-80 mt-1">Ongoing recruitment</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Avg CGPA</CardTitle>
                            <Award className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardData.statistics.averageCGPA}</div>
                            <p className="text-xs opacity-80 mt-1">Class performance</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Tabs Section */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="students" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Students
                        </TabsTrigger>
                        <TabsTrigger value="drives" className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Placement Drives
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <PieChart className="w-4 h-4" />
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Applications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        Recent Applications
                                    </CardTitle>
                                    <CardDescription>Latest student applications and their status</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {dashboardData.recentApplications.map((application) => (
                                        <div key={application._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${application.applicant.fullName}&background=random`} />
                                                    <AvatarFallback>{application.applicant.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{application.applicant.fullName}</p>
                                                    <p className="text-xs text-gray-500">{application.job.company} - {application.job.title}</p>
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(application.status)}>
                                                {application.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Branch-wise Placement Statistics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                        Branch-wise Placement Stats
                                    </CardTitle>
                                    <CardDescription>Placement percentage by department</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {dashboardData.branchWiseStats.map((branch, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">{branch.branch}</span>
                                                <span className="text-sm text-gray-600">{branch.placed}/{branch.total} ({branch.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${branch.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Students Tab */}
                    <TabsContent value="students" className="space-y-6">
                        {/* Filters */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search students by name or USN..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                        <SelectTrigger className="w-full sm:w-48">
                                            <SelectValue placeholder="Select Branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Branches</SelectItem>
                                            <SelectItem value="Computer Science">CSE</SelectItem>
                                            <SelectItem value="Electronics">ECE</SelectItem>
                                            <SelectItem value="Information Technology">IT</SelectItem>
                                            <SelectItem value="Mechanical">ME</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                                        <SelectTrigger className="w-full sm:w-32">
                                            <SelectValue placeholder="Batch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="2025">2025</SelectItem>
                                            <SelectItem value="2024">2024</SelectItem>
                                            <SelectItem value="2023">2023</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Students Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStudents.map((student) => (
                                <Card key={student._id} className="hover:shadow-lg transition-shadow duration-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={student.profilePhoto || `https://ui-avatars.com/api/?name=${student.fullName}&background=random`} />
                                                <AvatarFallback>{student.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{student.fullName}</h3>
                                                <p className="text-sm text-gray-600">{student.usn}</p>
                                            </div>
                                            <Badge className={getStatusColor(student.profile.placementStatus)}>
                                                {student.profile.placementStatus}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-gray-600">Branch</p>
                                                <p className="font-medium">{student.profile.academicInfo.branch.split(' ')[0]}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">CGPA</p>
                                                <p className="font-medium">{student.profile.academicInfo.cgpa}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Completion</p>
                                                <p className="font-medium">{student.profile.profileCompletion}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Projects</p>
                                                <p className="font-medium">{student.profile.projects || 0}</p>
                                            </div>
                                        </div>
                                        
                                        {student.profile.placementStatus === 'Placed' && student.profile.company && (
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium text-green-800">Placed at {student.profile.company}</p>
                                                {student.profile.package && (
                                                    <p className="text-sm text-green-600">Package: {student.profile.package}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" className="flex-1">
                                                <Eye className="w-4 h-4 mr-1" />
                                                View Profile
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Mail className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Placement Drives Tab */}
                    <TabsContent value="drives" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {dashboardData.activeDrives.map((drive) => (
                                <Card key={drive._id} className="hover:shadow-lg transition-shadow duration-200">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{drive.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 mt-1">
                                                    <Building2 className="w-4 h-4" />
                                                    {drive.company.name}
                                                </CardDescription>
                                            </div>
                                            <Badge className={getStatusColor(drive.status)}>
                                                {drive.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Positions</p>
                                                <p className="font-medium text-lg">{drive.positions}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Applicants</p>
                                                <p className="font-medium text-lg">{drive.applicants}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            Deadline: {new Date(drive.deadline).toLocaleDateString()}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-sm">
                                                <span>Application Progress</span>
                                                <span>{drive.applicants}/{drive.positions * 4} expected</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                                                    style={{ width: `${Math.min((drive.applicants / (drive.positions * 4)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" className="flex-1">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Users className="w-4 h-4 mr-2" />
                                                Applicants
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-blue-600" />
                                        Placement Trends
                                    </CardTitle>
                                    <CardDescription>Monthly placement statistics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center text-gray-500">
                                        <p>Chart will be integrated here (Chart.js or similar)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-green-600" />
                                        Quick Actions
                                    </CardTitle>
                                    <CardDescription>Common faculty operations</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start" variant="outline">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Send Notification to Students
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Student Database
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Campus Drive
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Bell className="w-4 h-4 mr-2" />
                                        Placement Announcements
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default EnhancedFacultyDashboard;
