import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Pipe to get the user from the request.
 */
const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export default GetUser;
