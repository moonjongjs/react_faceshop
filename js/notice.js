(function($){
    
    let notice = [];
    let arr = [];
    let shop = [];
    let brand = [];    
    let txt = '';
    let img = '';

    // Pagenation - Record : 목록
    let list = 5; //한페이지에 나오는 목록갯수
    let total = 200; //총 레코드 갯수
    let startRecord = 0*list;
    let endRecord = startRecord + list; //i=0; i<10' i++

    // Pagenation - Page : 페이지번호
    let startPage = 1; //1 2 ... 10
    let endPage = Math.ceil(total/list); //자리올림 20페이지

    //그룹 : 페이지그룹    
    let group = 5;
    let groupCount = Math.ceil((total/list)/group);
    let cnt = 0; //다음 그룹 카운트 번호

    $.ajax({
        url:'./data/notice.json',
        dataType:'JSON',
        success: function(result){
            //1. 배열처리 반복처리
            $.each(result.공지사항, function(idx, item){
                notice[idx] = []; //2차원 배열 선언

                // 구분 : 이미지 아이콘 3항 연산자
                img = item.구분=='쇼핑'?'<img src="./img/icon_notice1.gif" alt="">':'<img src="./img/icon_notice2.gif" alt="">';

                notice[idx][0] = idx+1; //번호
                notice[idx][1] = img; //구분
                notice[idx][2] = item.제목; //번호
                notice[idx][3] = item.날짜; //번호
            });

            total = notice.length; //총 레코드 수

            //번호를 역순으로 저장
            let num = total; //203
            let i=0;
            for(i=0; i<total; i++){
                notice[i][0] = num; //번호 역순 저장
                num--;
            }
            // 로딩시 초기값 모두 완료
            /////////////////////////////////////////////////////////////////////////////////



            //필터링
            //0 전체공지 notice | 1 쇼핑공지 shop  | 2 브랜드소식 brand
            //출력배열 result  

            // 필터버튼 클릭 이벤트 3개
            $('.notice-btn').each(function(index){
                $(this).on({
                    click: function(){
                        $('.notice-btn').removeClass('on');
                        $(this).addClass('on');
                        filter(index);
                    }
                });
            });


            filter(0); //로드시 필터링하면 전체공지 버튼 번호 0


            function filter(pa){

                //초기화
                cnt = 0; //다음화살, 이전화살
                $('.next-btn').stop().fadeIn(0); //다음화살 기본

                if(pa==0){
                    arr = [];
                    for(i=0; i<notice.length; i++){   
                        arr[i] = []; //2차원 배열 
        
                        arr[i][0] = notice[i][0];
                        arr[i][1] = notice[i][1];
                        arr[i][2] = notice[i][2];
                        arr[i][3] = notice[i][3];
                    }
                }
                else if(pa==1){ //쇼핑공지
                    let s=0;
                    for(i=0; i<notice.length; i++){
                        if( notice[i][1].indexOf('1') != -1 ){
                            s++;
                            shop[s-1] = [];
                            shop[s-1][0] = notice[i][0];
                            shop[s-1][1] = notice[i][1];
                            shop[s-1][2] = notice[i][2];
                            shop[s-1][3] = notice[i][3];                            
                        }
                    }
                    //번호 역순 저장
                    for(i=0; i<shop.length; i++){
                        shop[i][0] = s;
                        s--;
                    }

                    //쇼핑 필터링 출력 배열에 저장하기
                    arr = []; //초기화
                    for(i=0; i<shop.length; i++){
                        arr[i] = [];
                        arr[i][0] = shop[i][0];
                        arr[i][1] = shop[i][1];
                        arr[i][2] = shop[i][2];
                        arr[i][3] = shop[i][3];
                    }
                }
                else if(pa==2){ //블랜드공지
                    let b=0;
                    for(i=0; i<notice.length; i++){
                        if( notice[i][1].indexOf('2') != -1 ){
                            b++;
                            brand[b-1] = [];
                            brand[b-1][0] = notice[i][0];
                            brand[b-1][1] = notice[i][1];
                            brand[b-1][2] = notice[i][2];
                            brand[b-1][3] = notice[i][3];                            
                        }
                    }
                    //번호 역순 저장
                    for(i=0; i<brand.length; i++){
                        brand[i][0] = b;
                        b--;
                    }
                    //브랜드 필터링 출력 배열에 저장하기
                    arr = []; //초기화
                    for(i=0; i<brand.length; i++){
                        arr[i] = [];
                        arr[i][0] = brand[i][0];
                        arr[i][1] = brand[i][1];
                        arr[i][2] = brand[i][2];
                        arr[i][3] = brand[i][3];
                    }
                }

                //목록 list 초기화
                startRecord = 0;  
                endRecord = startRecord + list; 
                startPage = 0; //0 ~ 10 / 10 ~ 20 / 20 ~ 30 / 30~40
                endPage = startPage + group;
                
                total = arr.length; //필터링 전체 레코드수 변환 
                listOutput(); //목록 출력
                pageGroup();  //페이지 번호(그룹)
            }
        




            //출력  = 시작번호 ~ 끝번호(10단위)
            //startRecord=0;endRecord=10; 1Page
            //startRecord=10;endRecord=20; 2Page

            function listOutput(){
                txt = '';
                for(let i=startRecord; i<endRecord; i++){
                    txt += "<tr>";
                    txt += "<td>" + arr[i][0] + "</td>";
                    txt += "<td>" + arr[i][1] + "</td>";
                    txt += "<td><a href='#'>" + arr[i][2] + "</a></td>";
                    txt += "<td>" + arr[i][3] + "</td>";
                    txt += "</tr>";
                }
    
                $('.notice-box tbody').html( txt );
            }
            listOutput();
           

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            

            $('.next-btn').on({
                click: function(e){                    
                    e.preventDefault();
                    cnt++; //다음버튼 1씩증가  
                    cnt>groupCount ? cnt=groupCount : cnt;
                    if(cnt==1){
                        $('.prev-btn').stop().fadeIn(0);
                        $('.first-btn').stop().fadeIn(0);
                    }
                    if( (cnt+1)==groupCount ){
                        $('.next-btn').stop().fadeOut(0);
                        $('.last-btn').stop().fadeOut(0);
                    } 
                    pageGroup();
                    return cnt;
                }
            });

            $('.prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    cnt--; //이전버튼 1씩감소  
                    cnt<0 ? cnt=0 : cnt;  
                    if( (cnt+2) == groupCount){
                        $('.next-btn').stop().fadeIn(0);
                        $('.last-btn').stop().fadeIn(0);
                    }
                    if(cnt==0){
                        $('.prev-btn').stop().fadeOut(0);
                        $('.first-btn').stop().fadeOut(0);
                    }
                    pageGroup();
                    return cnt;                    
                }
            });

            //처음으로
            $('.first-btn').on({
                click: function(){
                    cnt=0;
                    //목록 list 초기화                    
                    startRecord = 0;  
                    endRecord = startRecord + list; 
                    startPage = 0; //0 ~ 10 / 10 ~ 20 / 20 ~ 30 / 30~40
                    endPage = startPage + group;
                    listOutput();

                    $('.first-btn').stop().fadeOut(0);
                    $('.prev-btn').stop().fadeOut(0);
                    $('.next-btn').stop().fadeIn(0);
                    $('.last-btn').stop().fadeIn(0);
                    pageGroup();
                    return cnt;
                }
            });


            //마지막으로
            $('.last-btn').on({
                click: function(){
 
                // startRecord(마지막페이지시작레코드번호) = (자리올림(총레코드수/목록수)-1)*목록수
                  startRecord = (Math.ceil(total/list)-1)*list;
                  endRecord = total;
                  $('.first-btn').stop().fadeIn(0);
                  $('.prev-btn').stop().fadeIn(0);
                  $('.next-btn').stop().fadeOut(0);
                  $('.last-btn').stop().fadeOut(0);
                  cnt=groupCount;

                  listOutput();
                  pageGroup();
                  return cnt;
                }
            });






            function pageGroup(){  
 
                if(cnt==0){
                    $('.prev-btn').stop().fadeOut(0);
                }

                // 그룹페이지
                // 페이지 나누기
                // 페이지 번호 
                // 그룹단위 페이지 번호 묶음  
                // 1(1~10)  
                // 2(11~20)  
                // 3(21~30)  
                // 4(31~40)
                /////////////////////////////////////////////////////////
                // 여기서부터 알고리즘 구현 문제 해결
                groupCount = Math.ceil((total/list)/group); // 전체그룹 갯수

                startPage = cnt * group; //0 ~ 10 / 10 ~ 20 / 20 ~ 30 / 30~40
                endPage = startPage + group;
                if( endPage > Math.ceil(total/list) ){
                    endPage = Math.ceil(total/list);
                }

                



                // 여기까지 프로그래밍
                ////////////////////////////////////////////////////////
                txt='';
                for(let i=startPage; i<endPage; i++){  //1~10 / 11~20 / 20
                    txt += '<li><a href="javascript:void(0);" class="page-btn"><i>' + (i+1) + '</i></a></li>';
                }
                $('.page-wrap').html( txt );
            }
            pageGroup();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            
            
            //객체(태그요소) 배열 처리 .each() 메서드
        // 폴리필 DOM
        $(document).on('mouseenter', '.page-btn', function(){
            $('.page-btn').each(function(idx){ //0 1 ... 19
                // console.log( idx ); //버튼 번호: 인덱스번호
                $(this).on({
                    click: function(){                        
                        startRecord = (idx+(cnt*group)) * list; //0*10  1*10  ...  19*10=190
                        endRecord = startRecord + list; //0+10=10  10+10=20  ...  190+10 =200
                        //조건문으로 마지막 레코드 번호를 지정해야 버그가 없다.
                        //마지막 번호가 전체레코드 갯수보다 크면
                        //끝번호에 총갯수를 넣어준다.
                        if( endRecord > total ) { //0 ~ 199
                            endRecord = total
                        }                      
                        listOutput();

                        $('.page-btn').removeClass('on');
                        $(this).addClass('on');

                    }
                });
            });
        });


            /////////////////////////////////////////////////////////////
            // list 그룹단위 10개씩
            // 페이지번호 출력 자동화
            // 페이지번호 클릭시 해당 페이지 리스트 출력

            
            // 페이지번호 나머지 산출 디거깅
            // 다음페이지 화살버튼 UI 디자인
            // 다음페이지 화살버튼 클릭 이벤트 UX 디자인
            // 필터링 : 전체공지, 쇼핑, 브랜드
            // 페이지번호 그룹 : 한화면 페이지가 5개씩 노출


        },
        error: function(err){
            console.log('AJAX 실패! ', err ); 
        }
    });


})(jQuery);