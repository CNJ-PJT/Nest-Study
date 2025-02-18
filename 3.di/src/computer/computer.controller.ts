import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';


@Controller('computer')
export class ComputerController {
    constructor(private cpuService: CpuService, private diskService: DiskService){}

    @Get()
    run() {
        return [this.cpuService.compute(1000000, 532489423987), this.diskService.getData('DI 실습')];
    }
}
