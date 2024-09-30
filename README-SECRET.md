아 어드민페이지 가 react + vite npm기반으로 동작해서
개발서버로 테스트해보실땐 
모든 요청 url을 dev.genti.kr~~ 로 변경해서 
npm run dev 하시고 테스트해보시면되고
배포과정은요 
운영서버에는 react local run(npm run dev)환경에서 테스트는 안되고, 
모든 요청 url을 api.genti.kr~~로 변경해서
npm run build 하시고
dist 디렉터리에있는 결과물 s3 어드민페이지에 업로드
cloudfront에서 무효화(캐시 무효화) <- 최근 캐시 무효화 기록 중 1개 클릭해서 오른쪽 위 '신규로 복사' 버튼 클릭

그러면 코드베이스 수정해야하는 부분(react쪽은 정확하지않습니다) 설명드릴게요
adminpage lary/deploy-test 브랜치 보시면
src/types 디렉터리에 엔티티 처럼 데이터 정의되어있고요, 
src/api/types 디렉터리에 dto 처럼 정의되어있고요
src/pages 디렉터리에 실제 뷰에서 어떻게 렌더링하는지 나와있습니다
src/pages/AdminOrderPage.ts 보시면 prompt를 신기하게(도메인 로직에 안맞게) 정의해놔서 저런 내용이 보이고있는데요
사실 어드민페이지 개발자 잘못은 아니고
알고보니까 저희가 PGREQAdminMatchedDetailFindByAdminResponseDto,
PGREQCreatorSubmittedDetailFindByAdminResponseDto
두 개의 responseDto에 PictureRatio(사용자가 완성된 사진의 비율로써 받고싶은) 를 추가안했더라고요 찬찬히 읽어보시고 작업 부탁드립니다


개발서버랑 연결하실때 마르 카톡계정으로 로그인하시고 genti 스키마에서 마르 계정 ADMIN으로 변경하고하시거나 우기한테 카톡계덩 무러보세요~~~
변경될게 총 3가지 같습니더
1.src/types 에서 adminresponse에 requestPictureRatio 추가 
미리 정의된 PICTURE RATIO 터입 인터페이스 "세로3 : 가로2" 꼴로 수정
2.src/pages 에서 prompt 반환로직 수정
3.젠티서버수정