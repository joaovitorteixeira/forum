import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../users/entity/users.entity';
import CreateTermsConditionsDto from './dto/create-terms-conditions.dto';
import { TermsConditions } from './entity/terms-conditions.entity';
import { TermsConditionsService } from './terms-conditions.service';

describe('TermsConditionsService', () => {
  let service: TermsConditionsService;
  let termsConditionsRepository: Repository<TermsConditions>;
  const termsConditions: CreateTermsConditionsDto = {
    description: 'Test terms and conditions',
  };
  const mockCreateTermsConditions = (users) => {
    return jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({
        ...termsConditions,
        users,
        save: jest.fn().mockResolvedValue(termsConditions),
      }),
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermsConditionsService,
        {
          provide: getRepositoryToken(TermsConditions),
          useValue: {
            create: jest.fn().mockReturnValue({
              save: jest.fn().mockResolvedValue(termsConditions),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TermsConditionsService>(TermsConditionsService);
    termsConditionsRepository = module.get(getRepositoryToken(TermsConditions));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('termsConditionsRepository should be defined', () => {
    expect(termsConditionsRepository).toBeDefined();
  });

  it('Should create a new terms and conditions', async () => {
    await expect(service.create(termsConditions)).resolves.toEqual(
      termsConditions,
    );
    expect(termsConditionsRepository.create).toHaveBeenCalledWith(
      termsConditions,
    );
  });

  it('Should agree to terms and conditions', async () => {
    termsConditionsRepository.createQueryBuilder = mockCreateTermsConditions(
      [],
    );
    await expect(service.agree({ id: 1 }, new User())).resolves.toEqual(
      termsConditions,
    );
  });

  it('Should not agree to terms and conditions', async () => {
    termsConditionsRepository.createQueryBuilder = mockCreateTermsConditions([
      new User(),
    ]);
    await expect(service.agree({ id: 1 }, new User())).rejects.toThrow(
      'Terms and conditions already agreed',
    );
  });
});
