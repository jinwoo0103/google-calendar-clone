/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'www.gstatic.com'],
  },
  // option 타입스크립트 strict mode
  // option 정리해서 문서로 공유드리기
  // 절대경로
  // 폴더구조 재정리
  // 타입 generic 사용해보기
  // useState 타입 추가
};

module.exports = nextConfig;
