import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// User schema (matching your model)
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createTestUsers() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check if test users already exist
        const existingUsers = await User.find({ 
            email: { $in: ['patel@gmail.com', 'test@student.com'] } 
        });
        
        if (existingUsers.length > 0) {
            console.log('✅ Test users already exist:');
            existingUsers.forEach(user => {
                console.log(`   - ${user.email} (${user.role})`);
            });
        } else {
            console.log('👤 Creating test users...');
            
            // Hash passwords
            const hashedPassword1 = await bcrypt.hash('patel@gmail.com', 10);
            const hashedPassword2 = await bcrypt.hash('password123', 10);

            const testUsers = [
                {
                    fullname: 'Patel Student',
                    email: 'patel@gmail.com',
                    phoneNumber: 9876543210,
                    password: hashedPassword1,
                    role: 'student',
                    profile: {
                        bio: 'Test student user',
                        skills: ['JavaScript', 'React', 'Node.js'],
                        profilePhoto: ''
                    }
                },
                {
                    fullname: 'Test Student',
                    email: 'test@student.com',
                    phoneNumber: 9876543211,
                    password: hashedPassword2,
                    role: 'student',
                    profile: {
                        bio: 'Another test student user',
                        skills: ['Python', 'Django', 'PostgreSQL'],
                        profilePhoto: ''
                    }
                }
            ];

            await User.insertMany(testUsers);
            console.log('✅ Test users created successfully!');
        }

        console.log('\n🎯 You can now login with:');
        console.log('   Email: patel@gmail.com');
        console.log('   Password: patel@gmail.com');
        console.log('   Role: student');
        console.log('\n   OR');
        console.log('\n   Email: test@student.com');
        console.log('   Password: password123');
        console.log('   Role: student');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n📪 Disconnected from MongoDB');
    }
}

createTestUsers();
