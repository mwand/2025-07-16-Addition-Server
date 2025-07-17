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
   * @throws Error if either parameter is not a finite number
   */
  public sum(firstNumber: number, secondNumber: number): number {
    // coPilot suggested input validation, but it's commented out for now
    // // Validate inputs to ensure they are finite numbers
    // if (!Number.isFinite(firstNumber)) {
    //   throw new Error('First parameter must be a finite number');
    // }
    
    // if (!Number.isFinite(secondNumber)) {
    //   throw new Error('Second parameter must be a finite number');
    // }
    
    return firstNumber + secondNumber;
  }
}