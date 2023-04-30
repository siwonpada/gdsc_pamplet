import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ManagerBoothGuard extends AuthGuard('manager_jwt') {}