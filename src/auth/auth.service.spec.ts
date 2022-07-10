import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import User from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';
import HashPassword from '../Util/HashPassword';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let hashPassword: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
      imports: [JwtModule, EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    usersService = module.get<UsersService>(UsersService);
    hashPassword = jest.spyOn(HashPassword, 'comparePassword');
  });

  afterEach(() => {
    hashPassword.mockRestore();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('Should create a token', async () => {
    const user = new User();

    user.email = 'test@email.com';
    user.id = 1;
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

    const token = await service.createToken(user);

    expect(token).toBeDefined();
    expect(token.accessToken).toBe('token');
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: user.email,
      id: user.id,
    });
  });

  it('Should validate a user', async () => {
    const user = new User();

    user.email = 'test@email.com';
    user.id = 1;
    user.password = 'password-hash';
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    hashPassword.mockResolvedValueOnce(true);

    const validatedUser = await service.validateUser(user.email, 'password');

    expect(validatedUser).toBeDefined();
    expect(validatedUser).toEqual(user);
    expect(usersService.findOne).toHaveBeenCalledWith(user.email);
    expect(hashPassword).toHaveBeenCalledWith('password', user.password);
  });

  it('Should not validate a user because email is not found', async () => {
    const user = new User();

    user.email = 'invalid@email.com';
    user.id = 1;

    jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

    const validatedUser = await service.validateUser(user.email, 'password');

    expect(validatedUser).toBeNull();
    expect(usersService.findOne).toHaveBeenCalledWith(user.email);
    expect(hashPassword).not.toHaveBeenCalled();
  });

  it('Should not validate a user because password is invalid', async () => {
    const user = new User();

    user.email = 'test@email.com';
    user.id = 1;
    user.password = 'password-hash';

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    hashPassword.mockResolvedValueOnce(false);

    const validatedUser = await service.validateUser(
      user.email,
      'invalid-password',
    );

    expect(validatedUser).toBeNull();
    expect(usersService.findOne).toHaveBeenCalledWith(user.email);
    expect(hashPassword).toHaveBeenCalledWith(
      'invalid-password',
      user.password,
    );
  });
});
