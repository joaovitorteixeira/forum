import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export default GetUser;
