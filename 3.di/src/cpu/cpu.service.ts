import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) {}
    compute(a: number, b: number) {
        console.log(`Power Input 20 watts`);
        this.powerService.supplyPower(20);
        return a+ b;
    }
}
