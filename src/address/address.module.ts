import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMapsApiModule } from '../google-maps-api/google-maps-api.module';
import { AddressService } from './address.service';
import Address from './entity/address.entity';

@Module({
  providers: [AddressService],
  imports: [GoogleMapsApiModule, TypeOrmModule.forFeature([Address])],
})
export class AddressModule {}
