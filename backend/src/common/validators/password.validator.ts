export class PasswordValidatorUtil {
  static isValidPassword(password: string): boolean {
    if (!password) return false;
    return /^([A-ZÀ-Üa-zà-ü0-9!@#$%&*])*(?<! )$/.test(password);
  }
}