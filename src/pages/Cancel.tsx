import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/', { replace: true });
    // 페이지 로드 후 products 섹션으로 스크롤
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      productsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <XCircle className="w-24 h-24 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            결제가 완료되지 않았습니다.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            다시 시도하거나 다른 결제 수단을 사용해 보세요.
          </p>
        </div>
        
        <Button 
          size="lg" 
          onClick={handleRetry}
          className="w-full sm:w-auto px-8"
        >
          다시 시도하기
        </Button>
      </div>
    </div>
  );
};

export default Cancel;