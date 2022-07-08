/**
 * Jwt payload content
 */
export default interface JwtPayload {
  /**
   * The user id
   */
  id: number;

  /**
   * The user email
   */
  email: string;
}
