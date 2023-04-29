import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
    async searchEvent() {
        return 'searchEvent';
    }

    async createEvent() {
        return 'createEvent';
    }

    async updatelike(){
        return 'updatelike';
    }
}
