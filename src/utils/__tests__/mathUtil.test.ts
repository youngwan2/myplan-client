import { calculateDegree, angleToRadians } from '../mathUtil';

describe('calculateDegree', () => {
  describe('24-hour format', () => {
    it('should calculate degrees correctly for midnight', () => {
      expect(calculateDegree(0, 0, '24')).toBe(0);
    });

    it('should calculate degrees correctly for noon', () => {
      expect(calculateDegree(12, 0, '24')).toBe(180);
    });

    it('should calculate degrees correctly for arbitrary time', () => {
      // 6:30 = (6 * 60 + 30) * 0.25 = 97.5 degrees
      expect(calculateDegree(6, 30, '24')).toBe(97.5);
    });
  });

  describe('12-hour format', () => {
    it('should calculate degrees correctly for start of hour', () => {
      expect(calculateDegree(0, 0, '12')).toBe(0);
    });

    it('should calculate degrees correctly for middle of clock', () => {
      expect(calculateDegree(6, 0, '12')).toBe(180);
    });

    it('should handle hours greater than 12 correctly', () => {
      expect(calculateDegree(15, 0, '12')).toBe(90); // 3:00 position
    });
  });
});

describe('angleToRadians', () => {
  it('should convert 0 degrees to 0 radians', () => {
    expect(angleToRadians(0)).toBe(0);
  });

  it('should convert 180 degrees to PI radians', () => {
    expect(angleToRadians(180)).toBe(Math.PI);
  });

  it('should convert 90 degrees to PI/2 radians', () => {
    expect(angleToRadians(90)).toBe(Math.PI / 2);
  });

  it('should handle string input', () => {
    expect(angleToRadians('45')).toBe(Math.PI / 4);
  });

  it('should handle undefined input', () => {
    expect(angleToRadians()).toBe(0);
  });
});
