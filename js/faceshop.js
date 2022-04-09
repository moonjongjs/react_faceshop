const App = () => {
    return(
        <div id="wrap">
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </div>
    );
}


const HeaderComponent = () => {
    return (
        <header id="header">
            {/*
            <!-- 
                웹표준, 접근성 헤딩태그는 내용을 반드시 텍스트사용
                이미지를 사용하는경우는 반드시 alt='텍스트사용' 
            -->
            */}
        <h1><a href="./index.html"><img src="./img/logo_nc2.png" alt="Logo" /></a></h1>
        </header>
    );
};

const MainComponent = () => {
    return (
        <main id="main">
            <section id="section1">
                <div className="container">
                    <div className="title">
                       {/*  <!-- 섹션안에서는 헤딩 제목은 h2~h6 사용가능 --> */}
                        <h2><img src="./img/tit_notice.png" alt="Notice Title" /></h2>
                    </div>
                    <div className="content">
                     {/*    <!-- 전체공지 쇼핑공지 브랜드소식 --> */}
                        <div className="button-box">
                            <ul>
                                <li><a href="javascript:void(0);" className="notice-btn on"><span>전체공지</span></a></li>
                                <li><a href="javascript:void(0);" className="notice-btn"><span>쇼핑공지</span></a></li>
                                <li><a href="javascript:void(0);" className="notice-btn"><span>브랜드소식</span></a></li>
                            </ul>
                        </div>

                        <table className="notice-box">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>구분</th>
                                    <th>제목</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>

                            <tbody>
                               {/*  <!-- AJAX 바인딩 --> */}
                            </tbody>
                        </table>

                      {/*   <!-- 페이지네이션 그룹 --> */}
                        <div className="notice-page">
                            <div className="page-box">
                                <div className="button-box">
                                    <a href="#" className="first-btn both-btn"></a>
                                    <a href="#" className="prev-btn prev-next-btn"><img src="./img/btn_page_prev_on.png" alt="" /></a>
                                    <ul className="page-wrap">
                                        
                                    </ul>                           
                                    <a href="#" className="next-btn prev-next-btn"><img src="./img/btn_page_next_on.png" alt="" /></a>
                                    <a href="#" className="last-btn both-btn"></a>
                                </div>
                            </div>
                        </div> 


                    </div>
                </div>
            </section>
        </main>
    );
};

const FooterComponent = () => {
    return (
        <footer id="footer">
            <h1><img src="./img/logo_nc2.png" alt="logo" /></h1>
        </footer>
    );
};



ReactDOM.render(
    <App />,
    document.getElementById('root')
);
