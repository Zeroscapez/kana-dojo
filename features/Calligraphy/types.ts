/**
 * Calligraphy Feature Type Definitions
 *
 * These types define the data structures used throughout the Calligraphy feature
 * for stroke capture, validation, progress tracking, and settings.
 */

/**
 * Represents a single point on the canvas with coordinates and timestamp.
 */
export interface Point {
  x: number;
  y: number;
  timestamp: number;
}

/**
 * Represents a single user-drawn stroke from pen-down to pen-up.
 * Contains all coordinate points and timing information.
 */
export interface StrokeData {
  id: string;
  points: Point[];
  startTime: number;
  endTime: number;
  pressure?: number[]; // Optional pressure data for supported devices
}

/**
 * Direction of a reference stroke for guidance display.
 */
export type StrokeDirection =
  | 'left-right'
  | 'right-left'
  | 'top-bottom'
  | 'bottom-top'
  | 'diagonal';

/**
 * Represents a single reference stroke in the correct stroke order.
 */
export interface ReferenceStroke {
  index: number;
  path: Point[];
  direction: StrokeDirection;
  startPoint: Point;
  endPoint: Point;
}

/**
 * Character type for calligraphy practice.
 */
export type CharacterType = 'hiragana' | 'katakana' | 'kanji';

/**
 * JLPT level for kanji organization.
 */
export type JLPTLevel = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

/**
 * Reference stroke order data for a character.
 */
export interface StrokeOrderData {
  character: string;
  type: CharacterType;
  strokeCount: number;
  strokes: ReferenceStroke[];
}

/**
 * Extended character information for calligraphy practice.
 */
export interface CharacterData {
  character: string;
  romanji: string;
  type: CharacterType;
  groupName?: string;
  // Kanji-specific fields
  onyomi?: string[];
  kunyomi?: string[];
  meanings?: string[];
  jlptLevel?: JLPTLevel;
}

/**
 * Practice mode for calligraphy sessions.
 */
export type PracticeMode = 'practice' | 'free';

/**
 * Result of a character practice session.
 */
export interface PracticeResult {
  character: string;
  score: number;
  strokeCount: number;
  expectedStrokeCount: number;
  timestamp: number;
  mode: PracticeMode;
  strokes: StrokeData[];
}

/**
 * Area that needs improvement based on stroke comparison.
 */
export interface ImprovementArea {
  strokeIndex: number;
  description: string;
  severity: 'minor' | 'moderate' | 'major';
}

/**
 * Result of comparing user strokes against reference strokes.
 */
export interface SimilarityResult {
  score: number; // 0-100
  strokeScores: number[];
  improvementAreas: ImprovementArea[];
}

/**
 * Result of comparing stroke counts.
 */
export interface StrokeCountComparison {
  match: boolean;
  userCount: number;
  expectedCount: number;
  difference: number;
}

/**
 * Persisted progress data for calligraphy practice.
 */
export interface CalligraphyProgress {
  characterHistory: Record<string, PracticeResult[]>;
  totalPracticed: number;
  averageScore: number;
  personalBests: Record<string, number>;
  lastPracticed: number;
}

/**
 * Stroke width options for user customization.
 */
export type StrokeWidth = 'thin' | 'medium' | 'thick';

/**
 * User preferences for calligraphy practice.
 */
export interface CalligraphySettings {
  strokeWidth: StrokeWidth;
  smoothingEnabled: boolean;
  showStrokeNumbers: boolean;
  showDirectionHints: boolean;
  defaultMode: PracticeMode;
}
