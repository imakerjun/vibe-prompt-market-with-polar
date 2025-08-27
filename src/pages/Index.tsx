import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Star, Zap, Users, Download, Code2, Terminal, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { redirectToCheckout } from "@/lib/polar";
import productData from "@/data/products.json";
import type { ProductData } from "@/types/product";
import DeveloperBackground from "@/components/DeveloperBackground";
import "@/styles/developer-theme.css";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const data = productData as ProductData;
  
  // Filter active products based on settings
  const activeProducts = data.settings.showInactiveProducts 
    ? data.products 
    : data.products.filter(product => product.active);
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePurchase = async (polarProductId: string) => {
    setIsLoading(true);
    
    try {
      // Supabase Edge Function을 통해 안전하게 Polar Checkout 세션 생성
      await redirectToCheckout(polarProductId);
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "결제 오류",
        description: "결제 처리 중 문제가 발생했습니다. 다시 시도해 주세요.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Developer themed background */}
      <DeveloperBackground />
      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 justify-center mb-6">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Terminal className="w-3 h-3 mr-1" />
                코딩 생산성 향상
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Code2 className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white float-animation">
              바이브 코더를 위한 프롬프트
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              개발자와 크리에이터가 더 빠르게 결과물을 만들어낼 수 있도록 돕는 고품질 프롬프트
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={scrollToProducts} className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100 font-semibold hover:scale-105 transition-all">
                <Sparkles className="mr-2 h-5 w-5" />
                지금 둘러보기
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>1,000+ 개발자</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 평점</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">프리미엄 프롬프트 팩</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              전문적으로 제작된 프롬프트로 개발 워크플로우를 가속화하세요
            </p>
          </div>

          <div className={`${activeProducts.length > 1 ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl' : 'flex justify-center max-w-3xl'} mx-auto`}>
            {activeProducts.map((product) => (
              <div key={product.id} className="terminal-window hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <span className="ml-4 text-xs text-gray-400 font-mono">vibe-prompt-shop.sh</span>
                </div>
                
                <div className="p-6 bg-black/90 rounded-b-lg font-mono text-sm">
                  {/* Product Info */}
                  <div className="mb-4">
                    <span className="text-gray-500">$ </span>
                    <span className="text-cyan-400">cat</span>
                    <span className="text-white"> product.json</span>
                  </div>
                  
                  <div className="pl-4 mb-4">
                    <div className="text-purple-400">"name": <span className="text-green-400">"{product.name}"</span>,</div>
                    <div className="text-purple-400">"description": <span className="text-green-400">"{product.description}"</span>,</div>
                    <div className="text-purple-400">"price": <span className="text-yellow-400">{product.currency === 'USD' ? '$' : product.currency}{product.price.toFixed(2)}</span>,</div>
                    {product.rating && (
                      <div className="text-purple-400">"rating": <span className="text-yellow-400">{product.rating}/5.0</span>,</div>
                    )}
                    {product.badge && (
                      <div className="text-purple-400">"badge": <span className="text-cyan-400">"{product.badge}"</span>,</div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <span className="text-gray-500">$ </span>
                    <span className="text-cyan-400">ls</span>
                    <span className="text-white"> features/</span>
                  </div>
                  
                  <div className="pl-4 mb-6 space-y-1">
                    {product.features.map((feature, index) => (
                      <div key={index} className="text-green-400">
                        <span className="text-gray-500">→</span> {feature.text}
                      </div>
                    ))}
                  </div>

                  {/* Purchase Command */}
                  <div className="mb-2">
                    <span className="text-gray-500">$ </span>
                    <span className="text-cyan-400">vibe</span>
                    <span className="text-white"> purchase --product="{product.id}"</span>
                  </div>
                  
                  <Button 
                    onClick={() => handlePurchase(product.polarProductId)}
                    disabled={isLoading}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold font-mono"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-pulse">Processing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Terminal className="w-4 h-4 mr-2" />
                        [Enter] to Purchase
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/50 relative z-10">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-gray-400 font-mono">
              <span className="text-green-400">/* </span>
              <span className="text-gray-300">© 2025 Prompt Market. All rights reserved.</span>
              <span className="text-green-400"> */</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;