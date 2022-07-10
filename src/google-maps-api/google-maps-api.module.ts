import { Module } from '@nestjs/common';
import { GoogleMapsApiService } from './google-maps-api.service';

@Module({
  providers: [GoogleMapsApiService],
})
export class GoogleMapsApiModule {}
