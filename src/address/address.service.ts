import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleMapsApiService } from '../google-maps-api/google-maps-api.service';
import User from '../users/entity/users.entity';
import CreateAddressDto from './dto/create-address.dto';
import Address from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private googleMapsApi: GoogleMapsApiService,
  ) {}

  /**
   * Create a new address for the user.
   * @param param0 User's address
   * @returns Location of the address created on the database
   */
  @OnEvent('user.created', { async: true })
  async createAddress({
    address,
    user,
  }: {
    address: CreateAddressDto;
    user: User;
  }): Promise<User> {
    const { lng, lat } = await this.googleMapsApi.getCoordinates(address);

    user.address = this.addressRepository.create({
      lat: '' + lat,
      lng: '' + lng,
    });

    return user.save();
  }
}
