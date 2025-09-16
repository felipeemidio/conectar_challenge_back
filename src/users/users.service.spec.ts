import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, 
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
    ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
