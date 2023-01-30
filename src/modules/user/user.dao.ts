import { UpdateAvaterDto } from './user.dto';
import { BasicUser } from './user.interface';
import User from './user.model';
class UserDao {
    public async findAll(): Promise<BasicUser[]> {
        const _user = await User.find();
        return _user;
    }
    public async findById(id: string): Promise<typeof User | null> {
        return await User.findById(id);
    }
    public async findUserByEmail(email: string): Promise<BasicUser> {
        return await User.findOne({ email });
    }
    public async updateAvater(
        id: string,
        avater: UpdateAvaterDto
    ): Promise<typeof User | null> {
        return await User.findByIdAndUpdate(id, {
            $set: {
                avater: avater,
            },
        });
    }

    public async create(userData): Promise<BasicUser> {
        const newUser = new User(userData);
        const _user = await newUser.save();
        return _user;
    }
    public async findUserWithPhone(attributeValue: string): Promise<BasicUser> {
        return await User.findOne({ phone: attributeValue });
    }
}

export default UserDao;
