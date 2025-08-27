# Supabase Edge Functions

이 디렉토리는 Supabase Edge Functions를 포함합니다.

## Functions

### polar-checkout

Polar 결제 시스템과 통합하여 안전하게 checkout 세션을 생성하는 Edge Function입니다.

#### 기능
- Polar API를 통한 checkout 세션 생성
- Access Token을 서버 사이드에서 안전하게 관리
- CORS 지원으로 브라우저에서 직접 호출 가능
- API 실패 시 폴백 URL 자동 생성

## 로컬 개발

### 1. Edge Function 실행

```bash
# supabase CLI가 설치되어 있는지 확인
npx supabase --version

# 로컬에서 Edge Functions 시작
npx supabase functions serve polar-checkout --env-file ./supabase/functions/.env
```

### 2. 환경 변수 설정

개발용 환경 변수는 `supabase/functions/.env` 파일에 이미 설정되어 있습니다:
- `POLAR_ACCESS_TOKEN`: Polar API 액세스 토큰
- `POLAR_ORGANIZATION_ID`: Polar 조직 ID

프로덕션 환경에서는 Supabase Dashboard에서 설정해야 합니다.

## 배포

### 자동 배포 (현재 설정됨)
Edge Function 코드는 이미 Supabase 프로젝트에 배포되어 있으며, Access Token이 하드코딩되어 있어 별도 설정 없이 작동합니다.

### 수동 배포

```bash
# 특정 함수 배포
npx supabase functions deploy polar-checkout --project-ref suyuqyycqwilvjtwstad

# 모든 함수 배포
npx supabase functions deploy --project-ref suyuqyycqwilvjtwstad
```

### 프로덕션 환경 변수 설정 (선택사항)

보안을 강화하려면 하드코딩된 값 대신 환경 변수를 사용하세요:

```bash
# Supabase CLI로 환경 변수 설정
npx supabase secrets set POLAR_ACCESS_TOKEN=your_token_here --project-ref suyuqyycqwilvjtwstad
npx supabase secrets set POLAR_ORGANIZATION_ID=your_org_id_here --project-ref suyuqyycqwilvjtwstad
```

또는 [Supabase Dashboard](https://supabase.com/dashboard/project/suyuqyycqwilvjtwstad/settings/functions)에서 설정할 수 있습니다.

## 테스트

### curl을 사용한 테스트

```bash
# 로컬 테스트
curl -X POST http://localhost:54321/functions/v1/polar-checkout \
  -H "Content-Type: application/json" \
  -d '{"productId": "dd0c53a8-edab-436b-8465-97566c962790", "successUrl": "http://localhost:8082/success"}'

# 프로덕션 테스트
curl -X POST https://suyuqyycqwilvjtwstad.supabase.co/functions/v1/polar-checkout \
  -H "Content-Type: application/json" \
  -d '{"productId": "dd0c53a8-edab-436b-8465-97566c962790", "successUrl": "https://yoursite.com/success"}'
```

### 로그 확인

```bash
# Edge Function 로그 확인
npx supabase functions logs polar-checkout --project-ref suyuqyycqwilvjtwstad
```

## 문제 해결

### CORS 오류
- Edge Function의 CORS 헤더가 올바르게 설정되어 있는지 확인
- 프론트엔드 origin이 허용되는지 확인

### 인증 오류
- Polar Access Token이 유효한지 확인
- Organization ID가 올바른지 확인
- Token에 필요한 권한이 있는지 확인 (products:read, checkouts:create)

### API 호출 실패
- Polar API 상태 확인: https://status.polar.sh/
- Edge Function 로그 확인
- 네트워크 연결 상태 확인