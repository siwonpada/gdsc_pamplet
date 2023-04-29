import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
    async searchItem() {
        return 'search item';
    }

    async createItem() {
        throw new Error('Method not implemented.');
    }
}
