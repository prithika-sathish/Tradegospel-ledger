import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.headers['x-role'];

    if (role !== this.requiredRole) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}
