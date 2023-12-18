export interface UserRequest extends Request {
  user?: {
    user_guid: number;
    name: string;
    email: string;
  };
}

export interface UserJwt extends UserRequest {
  iat: number;
  exp: number;
}
