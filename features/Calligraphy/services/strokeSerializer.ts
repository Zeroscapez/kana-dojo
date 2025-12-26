/**
 * Stroke Serializer Service
 *
 * Handles serialization and deserialization of stroke data for persistence
 * and replay functionality.
 *
 * Requirements: 9.1, 9.2, 9.3
 */

import type { StrokeData, Point } from '../types';

/**
 * Validates that a value is a valid Point object.
 */
const isValidPoint = (point: unknown): point is Point => {
  if (typeof point !== 'object' || point === null) return false;
  const p = point as Record<string, unknown>;
  return (
    typeof p.x === 'number' &&
    typeof p.y === 'number' &&
    typeof p.timestamp === 'number' &&
    !Number.isNaN(p.x) &&
    !Number.isNaN(p.y) &&
    !Number.isNaN(p.timestamp)
  );
};

/**
 * Validates that a value is a valid StrokeData object.
 */
const isValidStrokeData = (stroke: unknown): stroke is StrokeData => {
  if (typeof stroke !== 'object' || stroke === null) return false;
  const s = stroke as Record<string, unknown>;

  // Required fields
  if (typeof s.id !== 'string') return false;
  if (typeof s.startTime !== 'number' || Number.isNaN(s.startTime))
    return false;
  if (typeof s.endTime !== 'number' || Number.isNaN(s.endTime)) return false;

  // Points array validation
  if (!Array.isArray(s.points)) return false;
  for (const point of s.points) {
    if (!isValidPoint(point)) return false;
  }

  // Optional pressure array validation
  if (s.pressure !== undefined) {
    if (!Array.isArray(s.pressure)) return false;
    for (const p of s.pressure) {
      if (typeof p !== 'number' || Number.isNaN(p)) return false;
    }
  }

  return true;
};

/**
 * Serializes an array of StrokeData to a JSON string.
 *
 * @param strokes - Array of stroke data to serialize
 * @returns JSON string representation of the strokes
 */
export const serialize = (strokes: StrokeData[]): string => {
  return JSON.stringify(strokes);
};

/**
 * Deserializes a JSON string back to an array of StrokeData.
 *
 * @param json - JSON string to deserialize
 * @returns Array of StrokeData objects
 * @throws Error if the JSON is invalid or doesn't match StrokeData structure
 */
export const deserialize = (json: string): StrokeData[] => {
  const parsed = JSON.parse(json);

  if (!Array.isArray(parsed)) {
    throw new Error('Invalid stroke data: expected an array');
  }

  for (let i = 0; i < parsed.length; i++) {
    if (!isValidStrokeData(parsed[i])) {
      throw new Error(`Invalid stroke data at index ${i}`);
    }
  }

  return parsed as StrokeData[];
};

/**
 * Stroke serializer service object for convenient import.
 */
export const strokeSerializer = {
  serialize,
  deserialize
};

export default strokeSerializer;
