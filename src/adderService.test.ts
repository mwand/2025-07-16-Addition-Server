import { describe, it, expect, beforeEach } from 'vitest';
import { AdderService } from './adderService';

describe('AdderService', () => {
  let adderService: AdderService;

  beforeEach(() => {
    adderService = new AdderService();
  });

  describe('sum method', () => {
    it('should correctly add two positive numbers', () => {
      const result = adderService.sum(5, 3);
      expect(result).toBe(8);
    });

    it('should correctly add two negative numbers', () => {
      const result = adderService.sum(-5, -3);
      expect(result).toBe(-8);
    });

    it('should correctly add a positive and negative number', () => {
      const result = adderService.sum(10, -3);
      expect(result).toBe(7);
    });

    it('should correctly add zero to a number', () => {
      const result = adderService.sum(0, 5);
      expect(result).toBe(5);
    });

    it('should correctly add two zeros', () => {
      const result = adderService.sum(0, 0);
      expect(result).toBe(0);
    });

    it('should correctly add decimal numbers', () => {
      const result = adderService.sum(2.5, 3.7);
      expect(result).toBeCloseTo(6.2);
    });

    it('should handle very large numbers', () => {
      const result = adderService.sum(Number.MAX_SAFE_INTEGER, 0);
      expect(result).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle very small numbers', () => {
      const result = adderService.sum(Number.MIN_SAFE_INTEGER, 0);
      expect(result).toBe(Number.MIN_SAFE_INTEGER);
    });

    // coPilot inserted NaN and infinity tests, but I commented those out in the service file
    // it('should throw error for first parameter being NaN', () => {
    //   expect(() => adderService.sum(NaN, 5))
    //     .toThrow('First parameter must be a finite number');
    // });

    // it('should throw error for second parameter being NaN', () => {
    //   expect(() => adderService.sum(5, NaN))
    //     .toThrow('Second parameter must be a finite number');
    // });

    // it('should throw error for first parameter being Infinity', () => {
    //   expect(() => adderService.sum(Infinity, 5))
    //     .toThrow('First parameter must be a finite number');
    // });

    // it('should throw error for second parameter being Infinity', () => {
    //   expect(() => adderService.sum(5, Infinity))
    //     .toThrow('Second parameter must be a finite number');
    // });

    // it('should throw error for first parameter being negative Infinity', () => {
    //   expect(() => adderService.sum(-Infinity, 5))
    //     .toThrow('First parameter must be a finite number');
    // });

    // it('should throw error for second parameter being negative Infinity', () => {
    //   expect(() => adderService.sum(5, -Infinity))
    //     .toThrow('Second parameter must be a finite number');
    // });

    // it('should throw error for both parameters being invalid', () => {
    //   expect(() => adderService.sum(NaN, Infinity))
    //     .toThrow('First parameter must be a finite number');
    // });
  });

  describe('class instantiation', () => {
    it('should create a new instance', () => {
      const service = new AdderService();
      expect(service).toBeInstanceOf(AdderService);
    });

    it('should have sum method', () => {
      expect(typeof adderService.sum).toBe('function');
    });
  });
});
