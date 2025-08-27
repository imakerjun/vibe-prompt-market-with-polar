import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            구매가 완료되었습니다!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            이제 고객 포털에서 상품을 확인하고 다운로드할 수 있습니다.
          </p>
        </div>
        
        <Button 
          size="lg" 
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-8"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default Success;