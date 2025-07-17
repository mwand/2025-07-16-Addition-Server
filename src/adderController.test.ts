import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { Request, Response } from 'express';
import { getSum } from './adderController';

// Mock the AdderService
vi.mock('./adderService', () => ({
  AdderService: vi.fn().mockImplementation(() => ({
    sum: vi.fn((a: number, b: number) => a + b)
  }))
}));

describe('AdderController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockSend: Mock;
  let mockStatus: Mock;

  beforeEach(() => {
    mockSend = vi.fn();
    mockStatus = vi.fn();
    
    // Create a mock response that returns itself for chaining
    mockResponse = {
      send: mockSend,
      status: mockStatus
    };
    
    // Configure the mocks to return the response object for method chaining
    mockSend.mockReturnValue(mockResponse);
    mockStatus.mockReturnValue(mockResponse);
    
    mockRequest = {};
  });

  describe('getSum', () => {
    it('should return sum of two valid numbers', () => {
      mockRequest.params = { i: '5', j: '3' };

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockSend).toHaveBeenCalledWith({
        firstNumber: 5,
        secondNumber: 3,
        sum: 8
      });
    });

    it('should handle negative numbers', () => {
      mockRequest.params = { i: '-2', j: '3' };

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockSend).toHaveBeenCalledWith({
        firstNumber: -2,
        secondNumber: 3,
        sum: 1
      });
    });

    it('should handle decimal numbers', () => {
      mockRequest.params = { i: '2.5', j: '1.5' };

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockSend).toHaveBeenCalledWith({
        firstNumber: 2.5,
        secondNumber: 1.5,
        sum: 4
      });
    });

    it('should return 400 for invalid first parameter', () => {
      mockRequest.params = { i: 'abc', j: '3' };

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid number parameters' });
    });

    it('should return 400 for invalid second parameter', () => {
      mockRequest.params = { i: '5', j: 'xyz' };

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid number parameters' });
    });

    it('should return 400 for missing parameters', () => {
      mockRequest.params = {};

      getSum(mockRequest as Request<{ i: string; j: string }>, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid number parameters' });
    });
  });
});
