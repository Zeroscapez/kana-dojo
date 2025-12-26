// Calligraphy Feature - Barrel Export
// This file exports the public API for the Calligraphy feature

// Types
export * from './types';

// Components (to be added)
// export { default as CalligraphyCanvas } from './components/CalligraphyCanvas';
// export { default as CalligraphyMenu } from './components/CalligraphyMenu';
// export { default as CalligraphyPractice } from './components/CalligraphyPractice';
// export { default as StrokeGuide } from './components/StrokeGuide';
// export { default as FeedbackDisplay } from './components/FeedbackDisplay';
// export { default as CharacterSelector } from './components/CharacterSelector';
// export { default as CalligraphySettings } from './components/CalligraphySettings';

// Stores (to be added)
// export { default as useCalligraphyStore } from './store/useCalligraphyStore';
// export { default as useCalligraphySettingsStore } from './store/useCalligraphySettingsStore';

// Services
// export { strokeValidator } from './services/strokeValidator';
export {
  strokeSerializer,
  serialize,
  deserialize
} from './services/strokeSerializer';
// export { strokeDataService } from './services/strokeDataService';
