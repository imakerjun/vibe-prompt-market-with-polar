import { supabase, isSupabaseAvailable } from '@/integrations/supabase/client';

// Supabase Edge Function을 통해 안전하게 Polar Checkout 세션 생성
export async function createPolarCheckout(productId: string): Promise<string> {
  try {
    const successUrl = `${window.location.origin}/success`;
    
    // Supabase가 설정되지 않은 경우 바로 폴백 URL 반환
    if (!isSupabaseAvailable()) {
      console.log('Supabase not configured, using direct fallback URL');
      const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
      return fallbackUrl;
    }
    
    console.log('Calling Edge Function with:', { productId, successUrl });
    
    // Supabase Edge Function 호출
    const { data, error } = await supabase!.functions.invoke('polar-checkout', {
      body: {
        productId,
        successUrl
      }
    });

    console.log('Edge Function response:', { data, error });

    if (error) {
      console.error('Edge function error:', error);
      // 에러 발생 시 폴백으로 직접 URL 생성
      const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
      console.log('Using fallback URL:', fallbackUrl);
      return fallbackUrl;
    }

    if (data?.checkoutUrl) {
      console.log('Using checkout URL from Edge Function:', data.checkoutUrl);
      return data.checkoutUrl;
    }

    // 데이터가 없을 경우 폴백 URL 반환
    const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
    console.log('No checkout URL in response, using fallback:', fallbackUrl);
    return fallbackUrl;
  } catch (error) {
    console.error('Checkout creation error:', error);
    // 예외 발생 시 폴백으로 직접 URL 생성
    const successUrl = `${window.location.origin}/success`;
    const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
    console.log('Exception occurred, using fallback URL:', fallbackUrl);
    return fallbackUrl;
  }
}

// Checkout URL로 리다이렉트하는 헬퍼 함수
export async function redirectToCheckout(productId: string) {
  const checkoutUrl = await createPolarCheckout(productId);
  window.location.href = checkoutUrl;
}