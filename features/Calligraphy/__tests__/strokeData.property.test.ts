import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { StrokeData, Point } from '../types';
import { serialize, deserialize } from '../services/strokeSerializer';

/**
 * **Feature: calligraphy, Property 19: Stroke data round-trip serialization**
 * For any valid StrokeData array, serializing to JSON and deserializing back
 * SHALL produce an equivalent StrokeData array.
 * **Validates: Requirements 9.1, 9.2, 9.3**
 */

// Arbitrary generators for stroke data types
const arbitraryPoint = (): fc.Arbitrary<Point> =>
  fc.record({
    x: fc.float({ min: 0, max: 1000, noNaN: true }),
    y: fc.float({ min: 0, max: 1000, noNaN: true }),
    timestamp: fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER })
  });

const arbitraryStrokeData = (): fc.Arbitrary<StrokeData> =>
  fc.record({
    id: fc.uuid(),
    points: fc.array(arbitraryPoint(), { minLength: 1, maxLength: 100 }),
    startTime: fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
    endTime: fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
    pressure: fc.option(
      fc.array(fc.float({ min: 0, max: 1, noNaN: true }), {
        minLength: 1,
        maxLength: 100
      }),
      { nil: undefined }
    )
  });

// Helper to compare two StrokeData arrays for equivalence
const strokeDataArraysEqual = (a: StrokeData[], b: StrokeData[]): boolean => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    const strokeA = a[i];
    const strokeB = b[i];

    if (strokeA.id !== strokeB.id) return false;
    if (strokeA.startTime !== strokeB.startTime) return false;
    if (strokeA.endTime !== strokeB.endTime) return false;
    if (strokeA.points.length !== strokeB.points.length) return false;

    // Compare points
    for (let j = 0; j < strokeA.points.length; j++) {
      const pointA = strokeA.points[j];
      const pointB = strokeB.points[j];
      if (pointA.x !== pointB.x) return false;
      if (pointA.y !== pointB.y) return false;
      if (pointA.timestamp !== pointB.timestamp) return false;
    }

    // Compare pressure arrays if present
    if (strokeA.pressure !== strokeB.pressure) {
      if (!strokeA.pressure || !strokeB.pressure) return false;
      if (strokeA.pressure.length !== strokeB.pressure.length) return false;
      for (let k = 0; k < strokeA.pressure.length; k++) {
        if (strokeA.pressure[k] !== strokeB.pressure[k]) return false;
      }
    }
  }

  return true;
};

describe('Property 19: Stroke data round-trip serialization', () => {
  it('serializing and deserializing StrokeData[] produces equivalent data', () => {
    // **Feature: calligraphy, Property 19: Stroke data round-trip serialization**
    fc.assert(
      fc.property(
        fc.array(arbitraryStrokeData(), { minLength: 0, maxLength: 20 }),
        (strokes: StrokeData[]) => {
          const serialized = serialize(strokes);
          const deserialized = deserialize(serialized);

          expect(strokeDataArraysEqual(strokes, deserialized)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('empty stroke array round-trips correctly', () => {
    // **Feature: calligraphy, Property 19: Stroke data round-trip serialization**
    const emptyStrokes: StrokeData[] = [];
    const serialized = serialize(emptyStrokes);
    const deserialized = deserialize(serialized);

    expect(deserialized).toEqual([]);
  });

  it('single stroke round-trips correctly', () => {
    // **Feature: calligraphy, Property 19: Stroke data round-trip serialization**
    fc.assert(
      fc.property(arbitraryStrokeData(), (stroke: StrokeData) => {
        const strokes = [stroke];
        const serialized = serialize(strokes);
        const deserialized = deserialize(serialized);

        expect(strokeDataArraysEqual(strokes, deserialized)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('serialized output is valid JSON string', () => {
    // **Feature: calligraphy, Property 19: Stroke data round-trip serialization**
    fc.assert(
      fc.property(
        fc.array(arbitraryStrokeData(), { minLength: 0, maxLength: 10 }),
        (strokes: StrokeData[]) => {
          const serialized = serialize(strokes);

          // Should be a non-empty string
          expect(typeof serialized).toBe('string');
          expect(serialized.length).toBeGreaterThan(0);

          // Should be valid JSON (no throw)
          expect(() => JSON.parse(serialized)).not.toThrow();
        }
      ),
      { numRuns: 100 }
    );
  });
});
