import { checkDatesOverlapping } from '#shared/utils/dates';

describe('checkDatesOverlapping', () => {
  describe('Overlapping dates', () => {
    it('should return true when the first range starts within the second range', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-01'),
          new Date('2025-01-05'),
          new Date('2025-01-03'),
          new Date('2025-01-10'),
        ),
      ).toBe(true);
    });

    it('should return true when the first range ends within the second range', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-03'),
          new Date('2025-01-07'),
          new Date('2025-01-01'),
          new Date('2025-01-05'),
        ),
      ).toBe(true);
    });

    it('should return true when the first range completely overlaps the second range', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-01'),
          new Date('2025-01-10'),
          new Date('2025-01-03'),
          new Date('2025-01-07'),
        ),
      ).toBe(true);
    });

    it('should return true when the second range completely overlaps the first range', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-03'),
          new Date('2025-01-07'),
          new Date('2025-01-01'),
          new Date('2025-01-10'),
        ),
      ).toBe(true);
    });
  });

  describe('Non-overlapping dates', () => {
    it('should return false when the first range ends before the second range starts', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-01'),
          new Date('2025-01-02'),
          new Date('2025-01-03'),
          new Date('2025-01-10'),
        ),
      ).toBe(false);
    });

    it('should return false when the first range starts after the second range ends', () => {
      expect(
        checkDatesOverlapping(
          new Date('2025-01-11'),
          new Date('2025-01-15'),
          new Date('2025-01-01'),
          new Date('2025-01-10'),
        ),
      ).toBe(false);
    });
  });
});
