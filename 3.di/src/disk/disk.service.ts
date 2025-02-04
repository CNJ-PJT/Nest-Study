import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {}

    getData(data: string) {
        console.log(`power input 10 watts`);
        this.powerService.supplyPower(10);
        
        return data;
    }

}
