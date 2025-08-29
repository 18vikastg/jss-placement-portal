import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
    Users, 
    Search, 
    Download,
    Eye,
    Mail,
    Phone,
    MapPin,
    Building2,
    GraduationCap,
    Award,
    CheckCircle,
    Calendar,
    Briefcase,
    TrendingUp,
    Code,
    Heart,
    MessageCircle,
    Filter,
    Star,
    Target,
    Clock,
    FileText,
    PieChart,
    BarChart3,
    Activity,
    Plus,
    RefreshCw,
    Settings,
    Bookmark,
    UserCheck,
    SendHorizontal
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'

const EnhancedRecruiterDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const [activeTab, setActiveTab] = useState('discover')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterBranch, setFilterBranch] = useState('all')
    const [filterCGPA, setFilterCGPA] = useState('all')
    const [filterSkills, setFilterSkills] = useState('all')
    const [selectedStudents, setSelectedStudents] = useState([])
    const [loading, setLoading] = useState(false)

    // Enhanced dashboard stats
    const [dashboardStats, setDashboardStats] = useState({
        totalCandidates: 245,
        shortlistedCandidates: 32,
        interviewsScheduled: 15,
        selectedCandidates: 8,
        avgCGPA: 8.2,
        topSkills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js'],
        newApplications: 12,
        activeJobs: 3
    })

    // Enhanced students data
    const [students, setStudents] = useState([
        {
            _id: '1',
            fullname: 'Arjun Sharma',
            email: 'arjun@jssate.ac.in',
            phoneNumber: '9876543210',
            profile: {
                usn: '1JS22CS001',
                branch: 'Computer Science Engineering',
                batch: '2025',
                semester: 8,
                cgpa: 9.2,
                profilePhoto: 'https://github.com/shadcn.png',
                skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
                projects: [
                    {
                        title: 'E-commerce Platform',
                        description: 'Full-stack web application with payment integration and real-time chat',
                        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
                        link: 'https://github.com/arjun/ecommerce',
                        duration: '3 months'
                    },
                    {
                        title: 'Social Media App',
                        description: 'Real-time messaging and post sharing application with advanced features',
                        technologies: ['React Native', 'Firebase', 'Socket.io', 'Redux'],
                        link: 'https://github.com/arjun/social-app',
                        duration: '4 months'
                    }
                ],
                internships: [
                    {
                        company: 'Tech Solutions Pvt Ltd',
                        role: 'Software Development Intern',
                        duration: '6 months',
                        description: 'Developed REST APIs, frontend components, and worked on microservices architecture'
                    }
                ],
                achievements: ['College Hackathon Winner 2024', 'Best Project Award', 'Dean\'s List 2023'],
                certifications: ['AWS Certified Developer', 'MongoDB Certified Developer'],
                address: 'Bangalore, Karnataka',
                dateOfBirth: '2003-05-15',
                tenthMarks: 95.2,
                twelfthMarks: 92.8,
                github: 'https://github.com/arjun-sharma',
                linkedin: 'https://linkedin.com/in/arjun-sharma',
                portfolio: 'https://arjunsharma.dev'
            },
            placementStatus: 'Available',
            expectedSalary: '12-15 LPA',
            preferredLocations: ['Bangalore', 'Hyderabad', 'Chennai'],
            lastActive: '2025-08-29',
            profileCompleteness: 95,
            applicationStatus: 'Not Applied'
        },
        {
            _id: '2',
            fullname: 'Priya Reddy',
            email: 'priya@jssate.ac.in',
            phoneNumber: '9876543211',
            profile: {
                usn: '1JS22EC015',
                branch: 'Electronics & Communication',
                batch: '2025',
                semester: 8,
                cgpa: 8.9,
                skills: ['VLSI Design', 'Python', 'MATLAB', 'Circuit Design', 'Signal Processing'],
                projects: [
                    {
                        title: 'IoT Weather Monitoring System',
                        description: 'Smart weather monitoring with real-time data collection and analysis',
                        technologies: ['Arduino', 'Python', 'IoT', 'Data Analytics'],
                        duration: '2 months'
                    }
                ],
                internships: [
                    {
                        company: 'Intel Technology India',
                        role: 'Hardware Design Intern',
                        duration: '3 months',
                        description: 'Worked on chip design and verification processes'
                    }
                ],
                achievements: ['Best Technical Paper 2024', 'Innovation Award'],
                certifications: ['VLSI Certification', 'Python for Engineers'],
                address: 'Hyderabad, Telangana',
                tenthMarks: 94.5,
                twelfthMarks: 91.2
            },
            placementStatus: 'Available',
            expectedSalary: '10-12 LPA',
            preferredLocations: ['Hyderabad', 'Bangalore', 'Pune'],
            lastActive: '2025-08-28',
            profileCompleteness: 88,
            applicationStatus: 'Applied'
        },
        {
            _id: '3',
            fullname: 'Kiran Kumar',
            email: 'kiran@jssate.ac.in',
            phoneNumber: '9876543212',
            profile: {
                usn: '1JS22IT023',
                branch: 'Information Technology',
                batch: '2025',
                semester: 8,
                cgpa: 8.4,
                skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'Kubernetes'],
                projects: [
                    {
                        title: 'Hospital Management System',
                        description: 'Complete hospital management solution with patient tracking',
                        technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
                        duration: '4 months'
                    }
                ],
                internships: [
                    {
                        company: 'Infosys Limited',
                        role: 'Software Engineering Intern',
                        duration: '4 months',
                        description: 'Developed enterprise applications using Java and Spring framework'
                    }
                ],
                achievements: ['Coding Competition Winner', 'Academic Excellence Award'],
                certifications: ['Oracle Java Certification', 'Spring Framework Certification'],
                address: 'Mysore, Karnataka',
                tenthMarks: 89.5,
                twelfthMarks: 88.7
            },
            placementStatus: 'Available',
            expectedSalary: '8-10 LPA',
            preferredLocations: ['Bangalore', 'Mysore', 'Chennai'],
            lastActive: '2025-08-29',
            profileCompleteness: 82,
            applicationStatus: 'Shortlisted'
        }
    ])

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800 border-green-200';
            case 'Placed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Applied': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Shortlisted': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Selected': return 'bg-green-100 text-green-800 border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesBranch = filterBranch === 'all' || student.profile.branch.includes(filterBranch);
        const matchesCGPA = filterCGPA === 'all' || 
                           (filterCGPA === '9+' && student.profile.cgpa >= 9) ||
                           (filterCGPA === '8-9' && student.profile.cgpa >= 8 && student.profile.cgpa < 9) ||
                           (filterCGPA === '7-8' && student.profile.cgpa >= 7 && student.profile.cgpa < 8);
        
        return matchesSearch && matchesBranch && matchesCGPA;
    });

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents(prev => 
            prev.includes(studentId) 
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Enhanced Header */}
                <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-sm border">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-indigo-600" />
                            Recruiter Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">JSS Academy of Technical Education - Talent Pool</p>
                        {user && (
                            <p className="text-sm text-indigo-600 mt-1">Welcome back, {user.fullname || 'Recruiter'}</p>
                        )}
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
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Job
                        </Button>
                    </div>
                </div>

                {/* Enhanced Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Total Candidates</CardTitle>
                            <Users className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardStats.totalCandidates}</div>
                            <p className="text-xs opacity-80 mt-1">Available for recruitment</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Shortlisted</CardTitle>
                            <UserCheck className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardStats.shortlistedCandidates}</div>
                            <p className="text-xs opacity-80 mt-1">Under review</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Interviews</CardTitle>
                            <Calendar className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardStats.interviewsScheduled}</div>
                            <p className="text-xs opacity-80 mt-1">Scheduled this week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium opacity-90">Selected</CardTitle>
                            <CheckCircle className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{dashboardStats.selectedCandidates}</div>
                            <p className="text-xs opacity-80 mt-1">Final selections</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Tabs Section */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
                        <TabsTrigger value="discover" className="flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Discover
                        </TabsTrigger>
                        <TabsTrigger value="shortlisted" className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4" />
                            Shortlisted
                        </TabsTrigger>
                        <TabsTrigger value="interviews" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Interviews
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger value="communicate" className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Communicate
                        </TabsTrigger>
                    </TabsList>

                    {/* Discover Tab - Enhanced */}
                    <TabsContent value="discover" className="space-y-6">
                        {/* Advanced Filters */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-indigo-600" />
                                    Advanced Filters
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search by name, USN, or skills..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <Select value={filterBranch} onValueChange={setFilterBranch}>
                                        <SelectTrigger>
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
                                    <Select value={filterCGPA} onValueChange={setFilterCGPA}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="CGPA Range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All CGPA</SelectItem>
                                            <SelectItem value="9+">9.0+ (Excellent)</SelectItem>
                                            <SelectItem value="8-9">8.0 - 8.9 (Very Good)</SelectItem>
                                            <SelectItem value="7-8">7.0 - 7.9 (Good)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={filterSkills} onValueChange={setFilterSkills}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Key Skills" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Skills</SelectItem>
                                            <SelectItem value="javascript">JavaScript</SelectItem>
                                            <SelectItem value="python">Python</SelectItem>
                                            <SelectItem value="java">Java</SelectItem>
                                            <SelectItem value="react">React</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedStudents.length > 0 && (
                                    <div className="mt-4 flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
                                        <span className="text-sm font-medium">
                                            {selectedStudents.length} candidate(s) selected
                                        </span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Send Message
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Schedule Interview
                                            </Button>
                                            <Button size="sm">
                                                <Bookmark className="w-4 h-4 mr-2" />
                                                Add to Shortlist
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Enhanced Students Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredStudents.map((student) => (
                                <Card key={student._id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-indigo-500">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Avatar className="h-14 w-14">
                                                        <AvatarImage src={student.profile.profilePhoto || `https://ui-avatars.com/api/?name=${student.fullname}&background=random`} />
                                                        <AvatarFallback>{student.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{student.fullname}</h3>
                                                    <p className="text-sm text-gray-600">{student.profile.usn}</p>
                                                    <p className="text-xs text-gray-500">{student.profile.branch.split(' ')[0]} • {student.profile.batch}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Badge className={getStatusColor(student.applicationStatus)}>
                                                    {student.applicationStatus}
                                                </Badge>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student._id)}
                                                    onChange={() => toggleStudentSelection(student._id)}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Academic Info */}
                                        <div className="grid grid-cols-3 gap-3 text-sm">
                                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                                                <p className="text-blue-600 font-semibold text-lg">{student.profile.cgpa}</p>
                                                <p className="text-xs text-gray-600">CGPA</p>
                                            </div>
                                            <div className="text-center p-2 bg-green-50 rounded-lg">
                                                <p className="text-green-600 font-semibold text-lg">{student.profile.projects?.length || 0}</p>
                                                <p className="text-xs text-gray-600">Projects</p>
                                            </div>
                                            <div className="text-center p-2 bg-purple-50 rounded-lg">
                                                <p className="text-purple-600 font-semibold text-lg">{student.profileCompleteness}%</p>
                                                <p className="text-xs text-gray-600">Complete</p>
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Technical Skills</p>
                                            <div className="flex flex-wrap gap-1">
                                                {student.profile.skills.slice(0, 4).map((skill, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {student.profile.skills.length > 4 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{student.profile.skills.length - 4} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Latest Project */}
                                        {student.profile.projects && student.profile.projects[0] && (
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <p className="font-medium text-sm text-gray-800">{student.profile.projects[0].title}</p>
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                    {student.profile.projects[0].description}
                                                </p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {student.profile.projects[0].technologies.slice(0, 3).map((tech, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Contact Info */}
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate">{student.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3" />
                                                <span>{student.preferredLocations.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-3 h-3" />
                                                <span>Expected: {student.expectedSalary}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" className="flex-1">
                                                <Eye className="w-4 h-4 mr-1" />
                                                View Profile
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <MessageCircle className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Heart className="w-4 h-4" />
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

                    {/* Shortlisted Tab */}
                    <TabsContent value="shortlisted" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bookmark className="w-5 h-5 text-purple-600" />
                                    Shortlisted Candidates
                                </CardTitle>
                                <CardDescription>Candidates you've marked for further consideration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Candidate</TableHead>
                                            <TableHead>Branch</TableHead>
                                            <TableHead>CGPA</TableHead>
                                            <TableHead>Skills</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.filter(s => s.applicationStatus === 'Shortlisted').map((student) => (
                                            <TableRow key={student._id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${student.fullname}&background=random`} />
                                                            <AvatarFallback>{student.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{student.fullname}</p>
                                                            <p className="text-sm text-gray-500">{student.profile.usn}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{student.profile.branch.split(' ')[0]}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{student.profile.cgpa}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {student.profile.skills.slice(0, 2).map((skill, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {student.profile.skills.length > 2 && (
                                                            <span className="text-xs text-gray-500">+{student.profile.skills.length - 2}</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(student.applicationStatus)}>
                                                        {student.applicationStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        <Button size="sm" variant="outline">
                                                            <Calendar className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            <MessageCircle className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-blue-600" />
                                        Recruitment Funnel
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Total Applications</span>
                                            <span className="font-semibold">245</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span>Shortlisted</span>
                                            <span className="font-semibold">32 (13%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '13%'}}></div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span>Interviewed</span>
                                            <span className="font-semibold">15 (6%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-orange-600 h-2 rounded-full" style={{width: '6%'}}></div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span>Selected</span>
                                            <span className="font-semibold">8 (3%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{width: '3%'}}></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-green-600" />
                                        Top Skills in Demand
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {dashboardStats.topSkills.map((skill, index) => (
                                            <div key={skill} className="flex justify-between items-center">
                                                <span>{skill}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                                            style={{width: `${90 - index * 15}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600">{90 - index * 15}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Communication Tab */}
                    <TabsContent value="communicate" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <SendHorizontal className="w-5 h-5 text-blue-600" />
                                        Send Message to Candidates
                                    </CardTitle>
                                    <CardDescription>Communicate with selected candidates</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recipient group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="shortlisted">Shortlisted Candidates</SelectItem>
                                            <SelectItem value="interviewed">Interviewed Candidates</SelectItem>
                                            <SelectItem value="all">All Candidates</SelectItem>
                                            <SelectItem value="custom">Custom Selection</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                    <Input placeholder="Subject" />
                                    
                                    <Textarea 
                                        placeholder="Type your message here..."
                                        className="min-h-32"
                                    />
                                    
                                    <Button className="w-full">
                                        <SendHorizontal className="w-4 h-4 mr-2" />
                                        Send Message
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                        Schedule Interviews
                                    </CardTitle>
                                    <CardDescription>Bulk interview scheduling</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select candidates" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="shortlisted">All Shortlisted</SelectItem>
                                            <SelectItem value="selected">Selected Individuals</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                    <Input type="date" />
                                    <Input type="time" />
                                    
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Interview type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Technical Round</SelectItem>
                                            <SelectItem value="hr">HR Round</SelectItem>
                                            <SelectItem value="final">Final Round</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                    <Textarea 
                                        placeholder="Additional instructions..."
                                        className="min-h-20"
                                    />
                                    
                                    <Button className="w-full">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Interviews
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

export default EnhancedRecruiterDashboard;
