import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleMapsApiService } from './google-maps-api.service';

@Module({
  providers: [GoogleMapsApiService],
  imports: [ConfigModule],
  exports: [GoogleMapsApiService],
})
export class GoogleMapsApiModule {}
