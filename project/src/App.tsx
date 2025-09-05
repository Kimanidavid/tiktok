import React, { useState } from 'react';
import { Play, Sparkles, Crown, Download, Edit3, Users, TrendingUp, Check, X } from 'lucide-react';

interface Script {
  id: string;
  title: string;
  content: string;
  hook: string;
  hashtags: string[];
  createdAt: string;
}

interface User {
  plan: 'free' | 'weekly' | 'monthly';
  scriptsGenerated: number;
  videosEdited: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'generator' | 'editor' | 'pricing'>('home');
  const [user, setUser] = useState<User>({ plan: 'free', scriptsGenerated: 3, videosEdited: 0 });
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptTopic, setScriptTopic] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const generateScript = async () => {
    if (!scriptTopic.trim()) return;
    
    // Check limits based on plan
    const limits = {
      free: 5,
      weekly: 50,
      monthly: 999
    };
    
    if (user.scriptsGenerated >= limits[user.plan]) {
      alert('Script limit reached! Upgrade your plan to generate more scripts.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const hooks = [
        "You won't believe what happened when...",
        "This changed everything for me...",
        "Wait until you see this trick...",
        "POV: You discover the secret to...",
        "Day 1 vs Day 30 of..."
      ];
      
      const newScript: Script = {
        id: Date.now().toString(),
        title: `${scriptTopic} Script`,
        content: `[HOOK] ${hooks[Math.floor(Math.random() * hooks.length)]} ${scriptTopic}!

[MAIN CONTENT]
Let me break this down for you in the simplest way possible. First, you need to understand that ${scriptTopic} is something everyone should know about. 

Here are the 3 key points:
1. Start with the basics and build your foundation
2. Practice consistently - even 5 minutes daily makes a difference  
3. Don't be afraid to experiment and find your unique approach

The biggest mistake people make is overthinking it. Just start, learn as you go, and adjust based on what works.

[CALL TO ACTION]
Try this today and let me know in the comments how it goes! Follow for more tips like this.`,
        hook: hooks[Math.floor(Math.random() * hooks.length)],
        hashtags: ['#fyp', '#viral', '#trending', `#${scriptTopic.replace(/\s+/g, '').toLowerCase()}`],
        createdAt: new Date().toLocaleDateString()
      };
      
      setScripts([newScript, ...scripts]);
      setUser(prev => ({ ...prev, scriptsGenerated: prev.scriptsGenerated + 1 }));
      setScriptTopic('');
      setIsGenerating(false);
    }, 2000);
  };

  const PricingCard = ({ plan, price, period, features, popular = false, planKey }: any) => (
    <div className={`relative bg-white rounded-2xl p-8 shadow-lg ${popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Crown size={16} />
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan}</h3>
        <div className="text-4xl font-bold text-purple-600 mb-1">${price}</div>
        <div className="text-gray-500">per {period}</div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature: any, index: number) => (
          <li key={index} className="flex items-center gap-3">
            {feature.included ? (
              <Check className="text-green-500 flex-shrink-0" size={20} />
            ) : (
              <X className="text-gray-400 flex-shrink-0" size={20} />
            )}
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => setUser(prev => ({ ...prev, plan: planKey }))}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
          popular 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {user.plan === planKey ? 'Current Plan' : 'Choose Plan'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Play className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ScriptGenius
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'home' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('generator')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'generator' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Generator
              </button>
              <button
                onClick={() => setCurrentPage('editor')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'editor' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Video Editor
              </button>
              <button
                onClick={() => setCurrentPage('pricing')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'pricing' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Pricing
              </button>
              
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                <Crown className="text-purple-600" size={16} />
                <span className="text-sm font-medium text-purple-700 capitalize">{user.plan}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div>
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>
                  <br />
                  TikTok Scripts
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Generate viral TikTok scripts in seconds with AI. Create engaging content that captures attention and drives results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentPage('generator')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 justify-center"
                  >
                    <Sparkles size={20} />
                    Start Creating
                  </button>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="bg-white text-gray-700 px-8 py-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    View Pricing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                <p className="text-xl text-gray-600">Powerful features to create viral TikTok content</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">AI Script Generation</h3>
                  <p className="text-gray-600">Generate engaging scripts with hooks, main content, and calls-to-action tailored for TikTok's algorithm.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                    <Edit3 className="text-pink-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Video Caption Editor</h3>
                  <p className="text-gray-600">Add professional captions to your videos without watermarks. Perfect timing and styling included.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Trending Analytics</h3>
                  <p className="text-gray-600">Stay ahead with trending topics, optimal posting times, and hashtag recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Script Generator */}
      {currentPage === 'generator' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Script Generator</h1>
            <p className="text-xl text-gray-600">Generate viral TikTok scripts with AI</p>
            <div className="mt-4 text-sm text-gray-500">
              Scripts used: {user.scriptsGenerated}/{user.plan === 'free' ? '5' : user.plan === 'weekly' ? '50' : '∞'}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Script</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your video about?
                  </label>
                  <input
                    type="text"
                    value={scriptTopic}
                    onChange={(e) => setScriptTopic(e.target.value)}
                    placeholder="e.g., productivity tips, cooking hack, fitness routine"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <button
                  onClick={generateScript}
                  disabled={isGenerating || !scriptTopic.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Script
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Generated Scripts */}
            <div className="space-y-6">
              {scripts.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No scripts yet</h3>
                  <p className="text-gray-500">Generate your first script to get started</p>
                </div>
              ) : (
                scripts.map((script) => (
                  <div key={script.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{script.title}</h3>
                        <p className="text-sm text-gray-500">{script.createdAt}</p>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Download size={20} />
                      </button>
                    </div>
                    
                    <div className="prose prose-sm max-w-none mb-4">
                      <pre className="whitespace-pre-wrap text-gray-700 font-sans">{script.content}</pre>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {script.hashtags.map((tag, index) => (
                        <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Editor */}
      {currentPage === 'editor' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Caption Editor</h1>
            <p className="text-xl text-gray-600">Add professional captions to your videos</p>
          </div>
          
          {user.plan === 'free' ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Feature</h2>
              <p className="text-gray-600 mb-6">Video editing with caption overlay is available for premium subscribers only.</p>
              <button
                onClick={() => setCurrentPage('pricing')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Upgrade Now
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setSelectedVideo(e.target.files?.[0] || null)}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Video</h3>
                  <p className="text-gray-500 mb-4">Choose a video file to add captions</p>
                  <div className="bg-purple-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-purple-700 transition-colors">
                    Choose File
                  </div>
                </label>
              </div>
              
              {selectedVideo && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Video:</h4>
                  <p className="text-gray-600 mb-4">{selectedVideo.name}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Caption Text</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        rows={3}
                        placeholder="Enter your caption text here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                          <option>Bottom</option>
                          <option>Center</option>
                          <option>Top</option>
                        </select>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 justify-center">
                      <Edit3 size={20} />
                      Add Captions & Export
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pricing Page */}
      {currentPage === 'pricing' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600">Unlock the full power of AI-generated TikTok scripts</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              plan="Free"
              price="0"
              period="forever"
              planKey="free"
              features={[
                { text: "5 scripts per month", included: true },
                { text: "Basic script templates", included: true },
                { text: "Community support", included: true },
                { text: "Video caption editor", included: false },
                { text: "High-quality downloads", included: false },
                { text: "No watermarks", included: false },
                { text: "Priority support", included: false }
              ]}
            />
            
            <PricingCard
              plan="Weekly"
              price="2"
              period="week"
              planKey="weekly"
              features={[
                { text: "50 scripts per week", included: true },
                { text: "Advanced script templates", included: true },
                { text: "Email support", included: true },
                { text: "Basic video editor", included: true },
                { text: "High-quality downloads", included: true },
                { text: "Small watermark", included: true },
                { text: "Priority support", included: false }
              ]}
            />
            
            <PricingCard
              plan="Monthly Pro"
              price="4.99"
              period="month"
              planKey="monthly"
              popular={true}
              features={[
                { text: "Unlimited scripts", included: true },
                { text: "All script templates", included: true },
                { text: "Priority support", included: true },
                { text: "Full video editor", included: true },
                { text: "4K downloads", included: true },
                { text: "No watermarks", included: true },
                { text: "Advanced analytics", included: true }
              ]}
            />
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include a 7-day money-back guarantee</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                Secure payments
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                24/7 support
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;