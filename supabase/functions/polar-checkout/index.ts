import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// 직접 하드코딩된 값 (프로덕션에서는 환경 변수 사용 권장)
// Access Token은 이미 특정 organization에 연결되어 있음
const POLAR_ACCESS_TOKEN = Deno.env.get('POLAR_ACCESS_TOKEN');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    // Parse request body
    const { productId, successUrl } = await req.json();

    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'Product ID is required' }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Using Polar credentials:', {
      hasToken: !!POLAR_ACCESS_TOKEN,
      tokenPrefix: POLAR_ACCESS_TOKEN?.substring(0, 10) + '...'
    });

    // Create checkout session using Polar API
    // 정확한 엔드포인트: /v1/checkouts/ (custom이 아님)
    const checkoutResponse = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [productId], // products는 배열이어야 함
        success_url: successUrl || `${req.headers.get('origin')}/success`,
        metadata: {
          source: 'vibe-prompt-shop',
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error('Polar API error:', errorText);

      // If the custom checkout endpoint doesn't exist, fall back to direct URL
      const checkoutUrl = `https://buy.polar.sh/${productId}?success_url=${encodeURIComponent(successUrl || `${req.headers.get('origin')}/success`)}`;

      return new Response(
        JSON.stringify({
          checkoutUrl,
          method: 'direct',
          note: 'Using direct URL method'
        }),
        {
          status: 200,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        }
      );
    }

    const checkoutData = await checkoutResponse.json();
    console.log('Checkout created successfully:', checkoutData);

    return new Response(
      JSON.stringify({
        checkoutUrl: checkoutData.url || checkoutData.checkout_url,
        checkoutId: checkoutData.id,
        method: 'api'
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error creating checkout:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session', details: error.message }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );
  }
});