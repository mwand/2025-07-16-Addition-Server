import { Request, Response } from 'express';
import { AdderService } from './adderService';


// Initialize the service instance
const adderService = new AdderService();

/**
 * Handle GET requests to `/sum/:i/:j`. Returns the sum of two numbers.
 */
export const getSum = (request: Request<{ i: string; j: string }>, response: Response): void => {

  // Convert to inputs to numbers
  const firstNumber: number = Number(request.params.i);
  const secondNumber: number = Number(request.params.j);

  // Validate the converted inputs to ensure they are finite numbers
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {  
    response.status(400).send({ error: 'Invalid number parameters' });
    return;
  }
  
  try {
    // Use the service to perform the business logic
    const result = adderService.sum(firstNumber, secondNumber);

    // Return successful response
    response.send({
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      sum: result
    });
  } catch (error) {
    // Handle service errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    response.status(500).send({ error: errorMessage });
  }
};
