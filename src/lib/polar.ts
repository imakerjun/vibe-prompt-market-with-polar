import { supabase, isSupabaseAvailable } from '@/integrations/supabase/client';

// Supabase Edge Function을 통해 안전하게 Polar Checkout 세션 생성
export async function createPolarCheckout(productId: string): Promise<string> {
  const successUrl = `${window.location.origin}/success`;
  
  // Supabase가 설정되지 않은 경우 직접 URL 사용
  if (!isSupabaseAvailable() || !supabase) {
    const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
    console.log('Supabase not configured, using direct URL:', fallbackUrl);
    return fallbackUrl;
  }

  try {
    console.log('Calling Edge Function with:', { productId, successUrl });
    
    // Supabase Edge Function 호출
    const { data, error } = await supabase.functions.invoke('polar-checkout', {
      body: {
        productId,
        successUrl
      }
    });

    console.log('Edge Function response:', { data, error });

    if (error) {
      console.error('Edge function error:', error);
      const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
      return fallbackUrl;
    }

    if (data?.checkoutUrl) {
      return data.checkoutUrl;
    }

    const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
    return fallbackUrl;
  } catch (error) {
    console.error('Checkout creation error:', error);
    const fallbackUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl)}`;
    return fallbackUrl;
  }
}

// Checkout URL로 리다이렉트하는 헬퍼 함수
export async function redirectToCheckout(productId: string) {
  const checkoutUrl = await createPolarCheckout(productId);
  window.location.href = checkoutUrl;
}