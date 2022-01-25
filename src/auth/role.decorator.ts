import { SetMetadata } from '@nestjs/common';

export const Role = (role) => {
  return SetMetadata('role', role);
};