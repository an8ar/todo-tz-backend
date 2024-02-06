import { TokenPayload } from 'src/modules/auth/interfaces/token-payload.interface';
export declare global {
  type AnyObject = Record<string, unknown>;

  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}
