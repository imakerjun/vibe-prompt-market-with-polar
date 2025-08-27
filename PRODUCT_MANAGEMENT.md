# 상품 관리 가이드

이 문서는 Vibe Prompt Shop에서 상품을 관리하는 방법을 설명합니다.

## 📁 상품 데이터 구조

상품 정보는 `src/data/products.json` 파일에서 관리됩니다.

### 파일 위치
```
src/
├── data/
│   └── products.json    # 상품 데이터
└── types/
    └── product.ts       # TypeScript 타입 정의
```

## 🔧 상품 설정 방법

### 1. 새 상품 추가

`src/data/products.json` 파일을 열고 `products` 배열에 새 상품을 추가합니다:

```json
{
  "id": "your-product-id",                              // 고유 ID (URL-friendly)
  "polarProductId": "polar-product-uuid-here",          // Polar에서 생성된 상품 ID
  "name": "상품명",
  "description": "상품 설명",
  "price": 10.00,                                       // 가격 (숫자)
  "currency": "USD",                                    // 통화 (USD, KRW 등)
  "badge": "베스트셀러",                                // 뱃지 텍스트 (선택사항)
  "badgeVariant": "outline",                            // 뱃지 스타일 (선택사항)
  "rating": 4.9,                                        // 평점 (선택사항)
  "features": [                                         // 기능 목록
    {
      "icon": "download",                               // 아이콘 타입
      "text": "50+ 템플릿"                              // 기능 설명
    }
  ],
  "active": true                                        // 활성화 여부
}
```

### 2. Polar Product ID 얻기

1. [Polar Dashboard](https://app.polar.sh)에 로그인
2. Products 섹션으로 이동
3. 새 제품 생성 또는 기존 제품 선택
4. 제품 상세 페이지에서 Product ID 복사
5. `polarProductId` 필드에 붙여넣기

### 3. 상품 활성화/비활성화

- `"active": true` - 상품이 표시됨
- `"active": false` - 상품이 숨겨짐

### 4. 설정 옵션

`settings` 섹션에서 전역 설정을 관리할 수 있습니다:

```json
"settings": {
  "showInactiveProducts": false,    // false: 비활성 상품 숨김
  "defaultCurrency": "USD",         // 기본 통화
  "successUrl": "/success",         // 결제 성공 페이지
  "cancelUrl": "/cancel"            // 결제 취소 페이지
}
```

## 🎨 사용 가능한 아이콘

`features` 배열에서 사용할 수 있는 아이콘:
- `"download"` - 다운로드 아이콘
- `"zap"` - 번개 아이콘
- `"users"` - 사용자 그룹 아이콘
- `"star"` - 별 아이콘

## 🏷️ 뱃지 스타일

`badgeVariant` 옵션:
- `"default"` - 기본 스타일
- `"secondary"` - 보조 스타일
- `"destructive"` - 강조 스타일
- `"outline"` - 테두리 스타일

## 💡 예시

### 단일 상품 표시 (현재 설정)

```json
{
  "products": [
    {
      "id": "vibecoder-prompt-pack",
      "polarProductId": "dd0c53a8-edab-436b-8465-97566c962790",
      "name": "VibeCoder Prompt Pack",
      "active": true
    }
  ],
  "settings": {
    "showInactiveProducts": false
  }
}
```

### 여러 상품 표시

여러 상품을 표시하려면 `active: true`로 설정하면 자동으로 그리드 레이아웃으로 변경됩니다:

```json
{
  "products": [
    {
      "id": "product-1",
      "active": true
    },
    {
      "id": "product-2",
      "active": true
    },
    {
      "id": "product-3",
      "active": true
    }
  ]
}
```

## 🔄 변경 사항 적용

1. `products.json` 파일 수정
2. 저장 (브라우저가 자동으로 새로고침됨)
3. 변경 사항 확인

## ⚠️ 주의사항

- `polarProductId`는 반드시 Polar에서 생성된 실제 상품 ID여야 합니다
- `id`는 중복되지 않는 고유한 값이어야 합니다
- 가격은 숫자 형식으로 입력해야 합니다 (문자열 X)
- JSON 형식이 올바른지 확인하세요 (쉼표, 중괄호 등)

## 🚀 프로덕션 배포

배포 전 체크리스트:
1. ✅ 모든 `polarProductId`가 실제 Polar 상품과 연결되어 있는지 확인
2. ✅ 가격과 설명이 정확한지 확인
3. ✅ 불필요한 테스트 상품은 `active: false`로 설정
4. ✅ `successUrl`과 `cancelUrl`이 올바른지 확인