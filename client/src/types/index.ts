// Types cho API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Types cho Age Groups
export interface AgeGroup {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  description: string;
}

// Types cho Exercise Types
export interface ExerciseType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Types cho Exercise
export interface Exercise {
  id: number;
  question: string;
  type: string;
  typeName: string;
  typeIcon: string;
  sequence?: string[];
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  images?: string[];
  items?: Array<{
    id: string;
    image: string;
    matches?: string;
    size?: string;
  }>;
  image1?: string;
  image2?: string;
  differences?: string[];
  pattern?: string[];
  correctOrder?: string[];
  content?: string;
}

// Types cho Exercise Generation Request
export interface ExerciseGenerationRequest {
  ageGroupId: string;
  exerciseTypeIds: string[];
  count: number;
}

// Types cho Exercise Generation Response
export interface ExerciseGenerationResponse {
  exercises: Exercise[];
  metadata: {
    ageGroup: AgeGroup;
    exerciseTypes: Array<{ id: string; name: string }>;
    totalCount: number;
    generatedAt: string;
  };
}

// Types cho App Config
export interface AppConfig {
  appName: string;
  version: string;
  description: string;
  features: {
    maxExercisesPerRequest: number;
    supportedAgeGroups: string[];
    supportedExerciseTypes: string[];
  };
  api: {
    baseUrl: string;
    version: string;
  };
}

// Types cho Health Check
export interface HealthCheck {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  memory: {
    used: number;
    total: number;
  };
  services: {
    gemini: string;
  };
}

// Types cho UI State
export interface UIState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Types cho Exercise Form State
export interface ExerciseFormState {
  selectedAgeGroup: string | null;
  selectedExerciseTypes: string[];
  exerciseCount: number;
  isGenerating: boolean;
}

// Types cho Exercise Display State
export interface ExerciseDisplayState {
  exercises: Exercise[];
  showAnswers: boolean;
  currentExerciseIndex: number;
} 