import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto';
import { SubscribeDAO } from './subscribe.dao';

@Injectable()
export class SubscribeService {
  constructor(private readonly subscribeDAO: SubscribeDAO) {}

  async createSubscribe(
    createSubscribeDto: CreateSubscribeDto
  ): Promise<CreateSubscribeDto> {
    for (const email of createSubscribeDto.emailAddrs) {
      for (const contract of createSubscribeDto.contractAddrs) {
        try {
          await this.subscribeDAO.create(email, contract);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return createSubscribeDto;
  }

  async getContractsByEmail(emailAddr: string): Promise<string[]> {
    const sublst = await this.subscribeDAO.getContractsByEmail(emailAddr);
    const strlst = [];
    for (const sub of sublst) {
      strlst.push(sub.contractAddr);
    }
    return strlst;
  }

  async getEmailsByContract(contractAddr: string): Promise<string[]> {
    const sublst = await this.subscribeDAO.getEmailsByContract(contractAddr);
    const strlst = [];
    for (const sub of sublst) {
      strlst.push(sub.emailAddr);
    }
    return strlst;
  }
}
