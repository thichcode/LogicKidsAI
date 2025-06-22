import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { AgeGroup, ExerciseType, ExerciseGenerationRequest } from '../types';

const ExerciseGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Form state
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [selectedExerciseTypes, setSelectedExerciseTypes] = useState<string[]>([]);
  const [exerciseCount, setExerciseCount] = useState(5);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [ageGroupsData, exerciseTypesData] = await Promise.all([
          apiService.getAgeGroups(),
          apiService.getExerciseTypes()
        ]);
        
        setAgeGroups(ageGroupsData);
        setExerciseTypes(exerciseTypesData);
        
        // Set default selections
        if (ageGroupsData.length > 0) {
          setSelectedAgeGroup(ageGroupsData[0].id);
        }
        if (exerciseTypesData.length > 0) {
          setSelectedExerciseTypes([exerciseTypesData[0].id]);
        }
        
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        toast.error('Không thể tải dữ liệu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAgeGroupSelect = (ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId);
  };

  const handleExerciseTypeToggle = (typeId: string) => {
    setSelectedExerciseTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleGenerateExercises = async () => {
    if (!selectedAgeGroup || selectedExerciseTypes.length === 0) {
      toast.error('Vui lòng chọn độ tuổi và ít nhất một loại bài tập');
      return;
    }

    try {
      setGenerating(true);
      
      const request: ExerciseGenerationRequest = {
        ageGroupId: selectedAgeGroup,
        exerciseTypeIds: selectedExerciseTypes,
        count: exerciseCount
      };

      const response = await apiService.generateExercises(request);
      
      // Navigate to viewer with exercises data
      navigate('/viewer', { 
        state: { 
          exercises: response.exercises,
          metadata: response.metadata
        } 
      });
      
      toast.success(`Đã tạo thành công ${response.exercises.length} bài tập!`);
      
    } catch (error) {
      console.error('Lỗi khi tạo bài tập:', error);
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo bài tập');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Tạo Bài Tập Logic
        </h1>
        <p className="text-lg text-gray-600">
          Chọn cấu hình để AI tạo bài tập phù hợp cho trẻ
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Chọn độ tuổi */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            1. Chọn độ tuổi của trẻ
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ageGroups.map((ageGroup) => (
              <div
                key={ageGroup.id}
                className={`age-group-card ${selectedAgeGroup === ageGroup.id ? 'selected' : ''}`}
                onClick={() => handleAgeGroupSelect(ageGroup.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👶</div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {ageGroup.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {ageGroup.description}
                  </p>
                  {selectedAgeGroup === ageGroup.id && (
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Chọn loại bài tập */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            2. Chọn loại bài tập
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exerciseTypes.map((exerciseType) => (
              <div
                key={exerciseType.id}
                className={`exercise-type-card ${selectedExerciseTypes.includes(exerciseType.id) ? 'selected' : ''}`}
                onClick={() => handleExerciseTypeToggle(exerciseType.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{exerciseType.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {exerciseType.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {exerciseType.description}
                  </p>
                  {selectedExerciseTypes.includes(exerciseType.id) && (
                    <CheckCircle className="h-5 w-5 text-secondary-600 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Chọn số lượng */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            3. Chọn số lượng bài tập
          </h2>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <label className="text-gray-700 font-medium">
                Số lượng bài tập:
              </label>
              <span className="text-2xl font-bold text-primary-600">
                {exerciseCount}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={exerciseCount}
              onChange={(e) => setExerciseCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1 bài</span>
              <span>10 bài</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerateExercises}
            disabled={generating || !selectedAgeGroup || selectedExerciseTypes.length === 0}
            className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <Loader2 className="inline-block mr-2 h-6 w-6 animate-spin" />
                Đang tạo bài tập...
              </>
            ) : (
              <>
                <Sparkles className="inline-block mr-2 h-6 w-6" />
                Tạo Bài Tập
              </>
            )}
          </button>
          
          {generating && (
            <p className="text-gray-600 mt-4">
              AI đang tạo bài tập phù hợp với cấu hình của bạn...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseGenerator; 