# Polar 결제 시스템 설정 가이드

## 개요
이 프로젝트는 Polar 결제 시스템과 Supabase Edge Function을 사용하여 안전한 결제 처리를 구현했습니다. 
Polar Access Token과 같은 중요한 정보는 Supabase Edge Function에서 관리되어 클라이언트에 노출되지 않습니다.

## 설정 단계

### 1. Polar 계정 설정

1. [Polar](https://app.polar.sh)에 로그인합니다
2. Organization을 생성하거나 선택합니다
3. Organization ID를 복사합니다 (설정 페이지에서 확인 가능)
4. [Settings](https://app.polar.sh/settings) 페이지에서 Access Token을 생성합니다
   - `products:read` 권한 필요
   - `checkouts:create` 권한 필요 (사용 가능한 경우)

### 2. Supabase Edge Function 환경 변수 설정

Supabase Dashboard에서 다음 환경 변수를 설정해야 합니다:

```bash
# Supabase Dashboard > Settings > Edge Functions 에서 설정
POLAR_ACCESS_TOKEN=your_polar_access_token_here
POLAR_ORGANIZATION_ID=your_organization_id_here
```

또는 Supabase CLI를 사용하여 설정:

```bash
# .env.local 파일 생성
echo "POLAR_ACCESS_TOKEN=your_token_here" >> .env.local
echo "POLAR_ORGANIZATION_ID=your_org_id_here" >> .env.local

# Supabase에 시크릿 설정
supabase secrets set --env-file .env.local
```

### 3. Edge Function 배포 (이미 완료됨)

Edge Function은 이미 `polar-checkout`이라는 이름으로 배포되었습니다.
필요시 재배포:

```bash
supabase functions deploy polar-checkout
```

### 4. 프론트엔드 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```bash
# Supabase 설정 (자동 제공됨)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

참고: Supabase URL과 Anon Key는 이미 `src/integrations/supabase/client.ts`에 하드코딩되어 있습니다.

## 동작 방식

1. **사용자가 구매 버튼 클릭**
   - 프론트엔드에서 `handlePurchase` 함수 호출

2. **Supabase Edge Function 호출**
   - `polar-checkout` Edge Function으로 productId 전송
   - Edge Function에서 Polar Access Token을 사용하여 checkout 세션 생성

3. **Checkout URL 반환**
   - Edge Function이 생성된 checkout URL 반환
   - 프론트엔드가 사용자를 checkout 페이지로 리다이렉트

4. **폴백 처리**
   - API 오류 시 직접 Polar checkout URL 생성 (public URL 방식)
   - 이 경우 Access Token 없이도 동작하지만 기능이 제한될 수 있음

## 보안 고려사항

- **Access Token 보안**: Polar Access Token은 절대 클라이언트 코드에 노출되지 않습니다
- **CORS 설정**: Edge Function에 CORS 헤더가 설정되어 있어 프론트엔드에서 호출 가능
- **에러 처리**: API 실패 시 폴백 URL로 자동 전환

## 테스트

1. 로컬 환경에서 테스트:
```bash
npm run dev
```

2. Edge Function 로그 확인:
```bash
supabase functions logs polar-checkout
```

3. Polar Dashboard에서 결제 확인:
   - https://app.polar.sh 에서 Orders 섹션 확인

## 문제 해결

### Edge Function이 호출되지 않는 경우
- Supabase URL과 Anon Key가 올바른지 확인
- Edge Function이 배포되었는지 확인: `supabase functions list`

### Polar API 오류
- Access Token이 올바른지 확인
- Organization ID가 올바른지 확인
- Token 권한이 충분한지 확인

### CORS 오류
- Edge Function의 CORS 헤더 설정 확인
- 프론트엔드 origin이 허용되는지 확인

## 추가 기능 구현 아이디어

1. **웹훅 처리**: 결제 완료 시 Polar 웹훅 수신
2. **구독 관리**: 반복 결제 상품 지원
3. **할인 코드**: 프로모션 코드 적용 기능
4. **고객 정보 저장**: Supabase DB에 구매 내역 저장