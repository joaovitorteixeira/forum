import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import UserRegisterDto from '../users/dto/user-register.dto';
import User from '../users/entity/users.entity';
import CreateAddressDto from './dto/create-address.dto';
import Address from './entity/address.entity';

@Injectable()
export class AddressService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_API_KEY');

  constructor(private config: ConfigService) {
    super();
  }

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
    const newAddress = new Address();
    const { lng, lat } = await this.getCoordinates(address);

    newAddress.lng = '' + lng;
    newAddress.lat = '' + lat;
    user.address = newAddress;

    return user.save();
  }

  /**
   * Get the address from the latitude and longitude.
   * @param address User's address
   * @returns Location of the address
   */
  public async getCoordinates(
    address: CreateAddressDto,
  ): Promise<LatLngLiteral> {
    const googleRes = await this.geocode({
      params: {
        address: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.postalCode}`,
        key: this.accessKey,
      },
    });

    const { lng, lat } = googleRes.data.results[0].geometry.location;
    return { lng, lat };
  }
}
