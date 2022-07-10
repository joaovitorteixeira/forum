import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CreateAddressDto from '../address/dto/create-address.dto';

@Injectable()
export class GoogleMapsApiService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_API_KEY');

  constructor(private config: ConfigService) {
    super();
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
