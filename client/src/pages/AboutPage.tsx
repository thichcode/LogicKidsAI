import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Users, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Thông Minh',
      description: 'Sử dụng Google Gemini AI để tạo nội dung bài tập đa dạng và phù hợp'
    },
    {
      icon: Users,
      title: 'Phù hợp độ tuổi',
      description: 'Bài tập được thiết kế riêng cho từng độ tuổi từ 2-6 tuổi'
    },
    {
      icon: BookOpen,
      title: 'Đa dạng loại bài',
      description: '6 loại bài tập logic khác nhau giúp phát triển toàn diện'
    },
    {
      icon: Sparkles,
      title: 'Dễ sử dụng',
      description: 'Giao diện thân thiện, chỉ vài bước để tạo bài tập'
    }
  ];

  const team = [
    {
      name: 'LogicKids AI Team',
      role: 'Development Team',
      description: 'Đội ngũ phát triển tâm huyết với giáo dục sớm'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="text-6xl mb-6">🧠</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
          Về LogicKids AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Chúng tôi tin rằng mỗi đứa trẻ đều có tiềm năng phát triển tư duy logic tuyệt vời. 
          LogicKids AI được tạo ra để hỗ trợ phụ huynh và giáo viên trong việc giáo dục sớm.
        </p>
      </section>

      {/* Mission */}
      <section className="card">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            LogicKids AI được thành lập với sứ mệnh mang đến những công cụ giáo dục hiện đại, 
            sử dụng công nghệ AI để tạo ra các bài tập logic chất lượng cao, phù hợp với từng 
            độ tuổi của trẻ. Chúng tôi tin rằng việc phát triển tư duy logic từ sớm sẽ giúp 
            trẻ có nền tảng vững chắc cho tương lai.
          </p>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Tính năng nổi bật
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology */}
      <section className="card">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Công nghệ sử dụng
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Google Gemini AI
            </h3>
            <p className="text-gray-600">
              Công nghệ AI tiên tiến để tạo nội dung bài tập thông minh
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚛️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              React & TypeScript
            </h3>
            <p className="text-gray-600">
              Frontend hiện đại với giao diện người dùng thân thiện
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Node.js & Express
            </h3>
            <p className="text-gray-600">
              Backend mạnh mẽ và API RESTful hiệu quả
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Đội ngũ phát triển
        </h2>
        <div className="grid md:grid-cols-1 gap-8">
          {team.map((member, index) => (
            <div key={index} className="card text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-primary-600 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="card text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Liên hệ với chúng tôi
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Bạn có câu hỏi hoặc góp ý? Chúng tôi rất mong nhận được phản hồi từ bạn!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/generator" className="btn-primary">
            <Sparkles className="inline-block mr-2 h-5 w-5" />
            Thử ngay
          </Link>
          <a 
            href="mailto:contact@logickids.ai" 
            className="btn-secondary"
          >
            Gửi email
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <section className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">
          © 2024 LogicKids AI. Được tạo ra với ❤️ cho trẻ em Việt Nam.
        </p>
      </section>
    </div>
  );
};

export default AboutPage; 