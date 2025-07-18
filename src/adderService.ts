/**
 * Service class responsible for addition operations.
 * Implements business logic for mathematical addition.
 */
export class AdderService {
  /**
   * Calculates the sum of two numbers.
   * @param firstNumber - The first number to add
   * @param secondNumber - The second number to add
   * @returns The sum of the two input numbers
   * @assumes both parameters are finite numbers
   * @unchecked - input validation is handled in the controller
   */
  public sum(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
  }
}