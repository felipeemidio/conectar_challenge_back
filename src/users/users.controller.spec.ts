import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from 'src/core/enum/user_role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          findAll: jest.fn(),
          findOne: jest.fn(),
        },
      }],
    }).overrideGuard(AuthGuard)
    .useValue({ canActivate: jest.fn(() => true) }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      var result = [{
        id: 1,
        name: 'test',
        email: 'test',
        role: UserRole.ADMIN,
        password: 'test',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
