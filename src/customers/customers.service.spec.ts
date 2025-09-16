import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
      
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
