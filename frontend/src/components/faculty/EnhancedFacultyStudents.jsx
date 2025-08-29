import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
    Users, 
    Search, 
    Download,
    Eye,
    Mail,
    Phone,
    Filter,
    FileText,
    Award,
    BookOpen,
    TrendingUp,
    Calendar,
    MapPin,
    Star,
    CheckCircle,
    AlertCircle,
    BarChart3,
    PieChart,
    UserCheck,
    GraduationCap,
    Building2
} from 'lucide-react';
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

const EnhancedFacultyStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [selectedBatch, setSelectedBatch] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    useEffect(() => {
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
                        batch: '2025',
                        tenthMarks: 95.2,
                        twelfthMarks: 92.8
                    },
                    profileCompletion: 95,
                    placementStatus: 'Placed',
                    company: 'Google',
                    package: '45 LPA',
                    offerDate: '2025-02-15',
                    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'],
                    projects: [
                        {
                            title: 'AI-Powered Job Recommendation System',
                            description: 'Machine learning based job matching platform',
                            technologies: ['Python', 'TensorFlow', 'React', 'MongoDB']
                        }
                    ],
                    internships: [
                        {
                            company: 'Microsoft',
                            role: 'Software Engineering Intern',
                            duration: '6 months'
                        }
                    ],
                    achievements: ['Google Summer of Code 2024', 'Best Project Award'],
                    address: 'Bangalore, Karnataka'
                },
                profilePhoto: 'https://github.com/shadcn.png',
                lastUpdated: '2025-08-28',
                contactStatus: 'Active'
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
                        batch: '2025',
                        tenthMarks: 94.5,
                        twelfthMarks: 91.2
                    },
                    profileCompletion: 88,
                    placementStatus: 'Interviewing',
                    skills: ['VLSI Design', 'Python', 'MATLAB', 'Circuit Design', 'Signal Processing'],
                    projects: [
                        {
                            title: 'IoT-based Smart Home System',
                            description: 'Complete home automation solution',
                            technologies: ['Arduino', 'Python', 'IoT', 'Mobile App']
                        }
                    ],
                    internships: [
                        {
                            company: 'Intel',
                            role: 'Hardware Design Intern',
                            duration: '4 months'
                        }
                    ],
                    achievements: ['Best Technical Paper 2024'],
                    address: 'Hyderabad, Telangana'
                },
                lastUpdated: '2025-08-27',
                contactStatus: 'Active'
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
                        batch: '2025',
                        tenthMarks: 89.5,
                        twelfthMarks: 88.7
                    },
                    profileCompletion: 75,
                    placementStatus: 'Applied',
                    skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'],
                    projects: [
                        {
                            title: 'Hospital Management System',
                            description: 'Complete healthcare management solution',
                            technologies: ['Java', 'Spring Boot', 'MySQL', 'React']
                        }
                    ],
                    internships: [
                        {
                            company: 'TCS',
                            role: 'Software Developer Intern',
                            duration: '3 months'
                        }
                    ],
                    achievements: ['Coding Competition Winner'],
                    address: 'Mysore, Karnataka'
                },
                lastUpdated: '2025-08-26',
                contactStatus: 'Inactive'
            },
            {
                _id: '4',
                fullName: 'Priya Sharma',
                usn: '1JS22ME009',
                email: 'priya.sharma@jssate.ac.in',
                phoneNumber: '9876543213',
                profile: {
                    academicInfo: { 
                        cgpa: 7.8, 
                        branch: 'Mechanical Engineering',
                        semester: 8,
                        batch: '2025',
                        tenthMarks: 87.3,
                        twelfthMarks: 85.9
                    },
                    profileCompletion: 65,
                    placementStatus: 'Not Applied',
                    skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Python', 'Manufacturing'],
                    projects: [
                        {
                            title: 'Automated Manufacturing System',
                            description: 'Industry 4.0 based manufacturing solution',
                            technologies: ['IoT', 'PLC', 'SCADA', 'Python']
                        }
                    ],
                    internships: [
                        {
                            company: 'Bosch',
                            role: 'Manufacturing Engineering Intern',
                            duration: '2 months'
                        }
                    ],
                    achievements: ['SAE Competition Participant'],
                    address: 'Chennai, Tamil Nadu'
                },
                lastUpdated: '2025-08-25',
                contactStatus: 'Active'
            }
        ];

        setStudents(mockStudents);
        setLoading(false);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-green-100 text-green-800 border-green-200';
            case 'Interviewing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Applied': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Not Applied': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCompletionColor = (percentage) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesBranch = selectedBranch === 'all' || 
                             student.profile.academicInfo.branch.includes(selectedBranch);
        
        const matchesBatch = selectedBatch === 'all' || 
                           student.profile.academicInfo.batch === selectedBatch;
        
        const matchesStatus = selectedStatus === 'all' || 
                            student.profile.placementStatus === selectedStatus;
        
        return matchesSearch && matchesBranch && matchesBatch && matchesStatus;
    });

    // Statistics
    const stats = {
        total: students.length,
        placed: students.filter(s => s.profile.placementStatus === 'Placed').length,
        interviewing: students.filter(s => s.profile.placementStatus === 'Interviewing').length,
        applied: students.filter(s => s.profile.placementStatus === 'Applied').length,
        avgCGPA: students.reduce((sum, s) => sum + s.profile.academicInfo.cgpa, 0) / students.length,
        highCompletion: students.filter(s => s.profile.profileCompletion >= 80).length
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-sm border">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Users className="w-8 h-8 text-blue-600" />
                            Student Management
                        </h1>
                        <p className="text-gray-600 mt-1">Comprehensive student database and analytics</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </Button>
                        <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Mail className="w-4 h-4 mr-2" />
                            Bulk Email
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs opacity-90">Total Students</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.placed}</div>
                            <p className="text-xs opacity-90">Placed</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.interviewing}</div>
                            <p className="text-xs opacity-90">Interviewing</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.applied}</div>
                            <p className="text-xs opacity-90">Applied</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.avgCGPA.toFixed(1)}</div>
                            <p className="text-xs opacity-90">Avg CGPA</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{stats.highCompletion}</div>
                            <p className="text-xs opacity-90">Complete Profiles</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name, USN, or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Branches</SelectItem>
                                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                                        <SelectItem value="Electronics">Electronics & Communication</SelectItem>
                                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                                        <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Batch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Batches</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Placement Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Placed">Placed</SelectItem>
                                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                                        <SelectItem value="Applied">Applied</SelectItem>
                                        <SelectItem value="Not Applied">Not Applied</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-1 border rounded-md">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Users className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('table')}
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Display */}
                {viewMode === 'grid' ? (
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
                                            <p className="text-xs text-gray-500">{student.profile.academicInfo.branch.split(' ')[0]} • {student.profile.academicInfo.batch}</p>
                                        </div>
                                        <Badge className={getStatusColor(student.profile.placementStatus)}>
                                            {student.profile.placementStatus}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Academic Performance */}
                                    <div className="grid grid-cols-3 gap-3 text-sm">
                                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                                            <p className="text-blue-600 font-semibold text-lg">{student.profile.academicInfo.cgpa}</p>
                                            <p className="text-xs text-gray-600">CGPA</p>
                                        </div>
                                        <div className="text-center p-2 bg-green-50 rounded-lg">
                                            <p className="text-green-600 font-semibold text-lg">{student.profile.projects?.length || 0}</p>
                                            <p className="text-xs text-gray-600">Projects</p>
                                        </div>
                                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                                            <p className={`font-semibold text-lg ${getCompletionColor(student.profile.profileCompletion)}`}>
                                                {student.profile.profileCompletion}%
                                            </p>
                                            <p className="text-xs text-gray-600">Complete</p>
                                        </div>
                                    </div>

                                    {/* Placement Info */}
                                    {student.profile.placementStatus === 'Placed' && student.profile.company && (
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-green-600" />
                                                <p className="text-sm font-medium text-green-800">{student.profile.company}</p>
                                            </div>
                                            {student.profile.package && (
                                                <p className="text-sm text-green-600 mt-1">Package: {student.profile.package}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Skills */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Key Skills</p>
                                        <div className="flex flex-wrap gap-1">
                                            {student.profile.skills.slice(0, 3).map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {student.profile.skills.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{student.profile.skills.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="text-xs text-gray-600 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3 h-3" />
                                            <span className="truncate">{student.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3" />
                                            <span>{student.phoneNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            <span>{student.profile.address}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <Eye className="w-4 h-4 mr-1" />
                                            View Full Profile
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
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Branch</TableHead>
                                        <TableHead>CGPA</TableHead>
                                        <TableHead>Completion</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student) => (
                                        <TableRow key={student._id} className="hover:bg-gray-50">
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${student.fullName}&background=random`} />
                                                        <AvatarFallback>{student.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{student.fullName}</p>
                                                        <p className="text-sm text-gray-500">{student.usn}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{student.profile.academicInfo.branch.split(' ')[0]}</p>
                                                    <p className="text-sm text-gray-500">Batch {student.profile.academicInfo.batch}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-mono">
                                                    {student.profile.academicInfo.cgpa}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{width: `${student.profile.profileCompletion}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium">{student.profile.profileCompletion}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(student.profile.placementStatus)}>
                                                    {student.profile.placementStatus}
                                                </Badge>
                                                {student.profile.company && (
                                                    <p className="text-xs text-gray-600 mt-1">{student.profile.company}</p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-gray-600">
                                                    <p className="truncate max-w-32">{student.email}</p>
                                                    <p>{student.phoneNumber}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Results Summary */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Showing {filteredStudents.length} of {students.length} students</span>
                            <div className="flex gap-4">
                                <span>Placement Rate: {((stats.placed / stats.total) * 100).toFixed(1)}%</span>
                                <span>Avg Profile Completion: {((students.reduce((sum, s) => sum + s.profile.profileCompletion, 0) / students.length)).toFixed(1)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EnhancedFacultyStudents;
