import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{
        provide: CustomersService,
        useValue: {
          findAll: jest.fn(),
          findOne: jest.fn(),
        },
      }],
    }).overrideGuard(AuthGuard).useValue({ canActivate: jest.fn(() => true) }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
