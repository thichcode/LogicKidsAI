import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Users, BookOpen, ArrowRight, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Thông Minh',
      description: 'Sử dụng Google Gemini AI để tạo bài tập logic đa dạng và phù hợp với từng độ tuổi'
    },
    {
      icon: Users,
      title: 'Phù hợp độ tuổi',
      description: 'Bài tập được thiết kế riêng cho trẻ từ 2-6 tuổi với độ khó tăng dần'
    },
    {
      icon: BookOpen,
      title: 'Đa dạng loại bài',
      description: '6 loại bài tập logic khác nhau: tìm quy luật, nối hình, tìm điểm khác biệt, sắp xếp, đếm, tìm hình thiếu'
    },
    {
      icon: Sparkles,
      title: 'Dễ sử dụng',
      description: 'Giao diện thân thiện, chỉ vài bước đơn giản để tạo bài tập cho trẻ'
    }
  ];

  const testimonials = [
    {
      name: 'Chị Nguyễn Thị Mai',
      role: 'Phụ huynh',
      content: 'Con tôi rất thích các bài tập từ LogicKids AI. Chúng giúp bé phát triển tư duy logic rất tốt!',
      rating: 5
    },
    {
      name: 'Cô Trần Thị Lan',
      role: 'Giáo viên mầm non',
      content: 'Tôi sử dụng LogicKids AI để tạo bài tập cho lớp. Các bài tập rất phù hợp và trẻ rất hào hứng.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-hero rounded-3xl">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-6xl mb-6 animate-float">🧠</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            LogicKids AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nền tảng tạo bài tập logic thông minh cho trẻ em, 
            giúp phát triển tư duy logic một cách vui vẻ và hiệu quả
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator" className="btn-primary text-lg px-8 py-4">
              <Sparkles className="inline-block mr-2 h-6 w-6" />
              Bắt đầu tạo bài tập
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4">
              Tìm hiểu thêm
              <ArrowRight className="inline-block ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tại sao chọn LogicKids AI?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi kết hợp công nghệ AI tiên tiến với phương pháp giáo dục sớm 
            để tạo ra trải nghiệm học tập tốt nhất cho trẻ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cách sử dụng đơn giản
          </h2>
          <p className="text-lg text-gray-600">
            Chỉ 3 bước để tạo bài tập logic cho trẻ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Chọn độ tuổi
            </h3>
            <p className="text-gray-600">
              Chọn độ tuổi phù hợp với trẻ (2-6 tuổi)
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Chọn loại bài tập
            </h3>
            <p className="text-gray-600">
              Chọn một hoặc nhiều loại bài tập logic
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Tạo và in bài tập
            </h3>
            <p className="text-gray-600">
              AI tạo bài tập và bạn có thể in ra ngay
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Phụ huynh và giáo viên nói gì?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sẵn sàng bắt đầu?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Tạo bài tập logic đầu tiên cho trẻ ngay hôm nay
        </p>
        <Link to="/generator" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center">
          <Sparkles className="mr-2 h-6 w-6" />
          Tạo bài tập miễn phí
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 