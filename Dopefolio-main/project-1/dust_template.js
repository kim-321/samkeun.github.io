window.onload = initMap;
let map;
let currentMarker = null;

let health_Code = null;
let forecast_Code = null;
let sidoName; // 선택되거나 현재 위치로 설정된 지역 이름

// =========================================================
// 1. 지도 초기화 및 기본 기능 (변경 없음)
// =========================================================

function initMap(){ 
    var mapContainer = document.getElementById('map'), 
        mapOption = {
            center: new daum.maps.LatLng(33.450701, 126.570667), 
            level: 14 
        };
    
    map = new daum.maps.Map(mapContainer, mapOption);
    map.setZoomable(false);
    initControl();
    myLocation(); 
};

function initControl(){ 
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
};

function moveTomyLocation() { 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, 
                lon = position.coords.longitude; 
            var locPosition = new daum.maps.LatLng(lat, lon), 
                message = '<div>현위치</div>';
            
            displayMarker(locPosition, message); 
            getmyLocationAddr(); 
        });
    }
}

function MoveTo(a,b) { 
    var moveLatLon = new daum.maps.LatLng(a, b);
    map.panTo(moveLatLon);
}

function myLocation(){ 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, 
                lon = position.coords.longitude; 
            var locPosition = new daum.maps.LatLng(lat, lon), 
                message = '<div>현위치</div>';
            
            displayMarker(locPosition, message);
            getmyLocationAddr(); 
        });
    } else { 
        var locPosition = new daum.maps.LatLng(33.450701, 126.570667),    
            message = 'geolocation을 사용할수 없어요..';
        displayMarker(locPosition, message);
    }
}

function displayMarker(locPosition, message) { 
    if (currentMarker) {
        currentMarker.setMap(null);
    }

    var imageSrc = 'here.png',
        imageSize = new daum.maps.Size(64, 69),
        imageOption = { offset: new daum.maps.Point(27, 69) };

    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var marker = new daum.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage
    });

    currentMarker = marker;

    marker.setMap(map);
    map.setCenter(locPosition);
}

// Geocoder 오류 수정
function getmyLocationAddr() {
    var geocoder = new daum.maps.services.Geocoder();
    var center = map.getCenter();
    
    geocoder.coord2Address(center.getLng(), center.getLat(), displayCenterInfo); 

    function displayCenterInfo(status, result) {
        if (status === daum.maps.services.Status.OK) {
            document.getElementById('myloctext').innerHTML = result[0].fullName;
            selectMYLoc(result[0].name1);
        }
    }
}

// =========================================================
// 2. 지역 선택 및 파싱 시작 (변경 없음)
// =========================================================

function selectLoc(value){ 
    var a,b;
    health_Code=null;
    forecast_Code=null;
    sidoName=value; 

    switch(value){
        case '서울특별시': health_Code=1100000000;sidoName='서울';  a=37.5636;b=126.98; break;
        case '부산광역시': health_Code=2600000000; sidoName='부산'; a=35.177;b=129.077 ; break;
        case '대구광역시': health_Code=2700000000;sidoName='대구';  a=35.8685;b=128.6036; break;
        case '인천광역시': health_Code=2800000000;sidoName='인천';  a=37.4532;b=126.7074; break;
        case '광주광역시': health_Code=2900000000; sidoName='광주'; a=35.157;b=126.8534; break;
        case '대전광역시': health_Code=3000000000;sidoName='대전';  a=36.3471;b=127.3866; break;
        case '울산광역시': health_Code=3100000000; sidoName='울산'; a=35.5354;b=129.3137; break;
        case '경기도': health_Code=4111000000;sidoName='경기';  a=37.2606;b=127.0307; break;
        case '강원도': health_Code=4211000000;sidoName='강원';  a=37.8785;b=127.7323; break;
        case '충청북도': health_Code=4311000000;sidoName='충북';  a=36.6396;b=127.4912; break;
        case '충청남도': health_Code=4413000000;sidoName='충남';  a=36.8121;b=127.1162; break;
        case '전라북도': health_Code=4511000000;sidoName='전북';  a=35.8215;b=127.15; break;
        case '전라남도': health_Code=4611000000;sidoName='전남';  a=34.8088;b=126.3944; break;
        case '경상북도': health_Code=4812100000;sidoName='경북';  a=36.016;b=129.3456; break; 
        case '경상남도': health_Code=4812000000;sidoName='경남';  a=35.2248;b=128.6841; break;
        case '제주특별자치도': health_Code=5011000000;sidoName='제주'; a=33.4963;b=126.5332; break;
        default: return; 
    }
    
    if (a && b) {
        var locPosition = new daum.maps.LatLng(a, b);
        displayMarker(locPosition, '<div>' + sidoName + '</div>');
    }

    parsing();
}

function selectMYLoc(value){ 
    health_Code=null;
    forecast_Code=null;
    sidoName=value; 
    
    switch(value){
        case '서울특별시': sidoName='서울'; break;
        case '부산광역시': sidoName='부산'; break;
        case '대구광역시': sidoName='대구'; break;
        case '인천광역시': sidoName='인천'; break;
        case '광주광역시': sidoName='광주'; break;
        case '대전광역시': sidoName='대전'; break;
        case '울산광역시': sidoName='울산'; break;
        case '경기도': sidoName='경기'; break;
        case '강원도': sidoName='강원'; break;
        case '충청북도': sidoName='충북'; break;
        case '충청남도': sidoName='충남'; break;
        case '전라북도': sidoName='전북'; break;
        case '전라남도': sidoName='전남'; break;
        case '경상북도': sidoName='경북'; break; 
        case '경상남도': sidoName='경남'; break;
        case '제주특별자치도': sidoName='제주'; break;
        default: return; 
    }
    parsing();
}

// =========================================================
// 3. API 상수 및 헬퍼 함수
// =========================================================

// ⭐ 1. 이 부분을 실제 발급받은 '일반 인증키'로 교체해야 합니다!
const apiKey = "d8b0866e887b97404bd05913878184808f900ce39f2b29a4b0348df1ff29cbce"; 
const baseUrl = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";
const ctprvnUrl = `${baseUrl}/getCtprvnRltmMesureDnsty?pageNo=1&numOfRows=100&returnType=xml&ver=1.0&sidoName=`;
const forecastUrl = `${baseUrl}/getMinuDustWeekFrcstDspth?returnType=xml&numOfRows=100&pageNo=1&searchDate=`;


function getCurrentDate() { 
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseXml(xmlString) {
    return new DOMParser().parseFromString(xmlString, "text/xml");
}

function setElementContentById(elementId, content) {
    const element = document.getElementById(elementId);
    if(element) {
        element.textContent = content;
    }
}

function setTotalContent(text){ 
    var result='';
    switch(text) {
        case '0':
        case '1': result = '좋음'; break;
        case '2': result = '보통'; break;
        case '3': result = '나쁨'; break;
        case '4': result = '매우나쁨'; break;
        default : result='정보없음'; break;
    }
    return result;
}

function setContentforDust(text) { 
    var result = '';
    switch (text) {
        case '0':
        case '1': result = '좋음'; break;
        case '2': result = '보통'; break;
        case '3': result = '나쁨'; break;
        case '4': result = '매우나쁨'; break;
        default: result = '정보없음'; break;
    }
    return result;
}

async function fetchData(url) { 
    try {
        let finalUrl;
        
        if (url === ctprvnUrl) {
            finalUrl = url + sidoName + `&serviceKey=${apiKey}`;
        } else if (url === forecastUrl) {
            const searchDate = getCurrentDate(); 
            finalUrl = url + searchDate + `&serviceKey=${apiKey}`;
        } else {
            return null; 
        }

        const response = await fetch(finalUrl);
        if (!response.ok) {
            throw new Error(`API 호출 실패, Status: ${response.status} (URL: ${finalUrl})`);
        }
        return await response.text(); 
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        return null; 
    }
}

// =========================================================
// 4. 파싱 함수 (데이터 null 접근 오류 해결)
// =========================================================

async function parsing() {
    // 1. 실시간 측정정보 파싱 (d_1 ~ d_6)
    const ctprvnData = await fetchData(ctprvnUrl);
    
    // API 호출 실패 시 초기화
    const defaultCtprvnContent = ctprvnData ? '데이터 없음' : 'API 호출 실패';
    setElementContentById('d_1', defaultCtprvnContent);
    setElementContentById('d_2', defaultCtprvnContent);
    document.getElementById('d_3').innerHTML = setTotalContent(defaultCtprvnContent);
    document.getElementById('d_4').innerHTML = setContentforDust(defaultCtprvnContent);
    document.getElementById('d_5').innerHTML = setContentforDust(defaultCtprvnContent);
    document.getElementById('d_6').innerHTML = setContentforDust(defaultCtprvnContent);


    if (ctprvnData) {
        const ctprvnXml = parseXml(ctprvnData);
        const ctprvnItems = ctprvnXml.querySelectorAll('item');
        
        if (ctprvnItems.length > 0) {
            const item = ctprvnItems[0];
            
            // 💡 FIX: querySelector로 요소를 찾은 후, null 체크를 하고 textContent를 읽습니다.
            const safeText = (selector) => {
                const element = item.querySelector(selector);
                return element ? element.textContent : '정보없음';
            };

            setElementContentById('d_1', safeText('dataTime'));
            setElementContentById('d_2', safeText('stationName'));
            
            // 등급은 setContent 함수를 사용하므로 해당 함수에 안전한 텍스트 전달
            document.getElementById('d_3').innerHTML = setTotalContent(safeText('khaiGrade'));
            document.getElementById('d_4').innerHTML = setContentforDust(safeText('pm10Grade'));
            document.getElementById('d_5').innerHTML = setContentforDust(safeText('o3Grade'));
            document.getElementById('d_6').innerHTML = setContentforDust(safeText('coGrade'));
        } 
    }
    
    // 2. 대기질 예보통보 조회 API 호출 (f_1, f_2, f_3)
// 2. 대기질 예보통보 조회 API 호출 (f_1, f_2, f_3)
    const defaultForecastContent = '데이터 확인 중...';
    setElementContentById('f_1', defaultForecastContent); 
    setElementContentById('f_2', defaultForecastContent);
    setElementContentById('f_3', defaultForecastContent);

    const forecastData = await fetchData(forecastUrl);
    
    if (forecastData) {
        const forecastXml = parseXml(forecastData);
        const forecastItems = forecastXml.querySelectorAll('item');
        
        if (forecastItems.length > 0) {
            const item = forecastItems[0]; 
            
            // 💡 FIX: 예보 통보 데이터 접근에 맞게 태그 이름 변경 및 안전 로직 적용
            const safeText = (selector) => {
                const element = item.querySelector(selector);
                // element가 없으면 '정보없음' 반환
                return element ? element.textContent.trim() : '정보없음';
            };
            
            // 통보시간: informData 태그를 사용해야 함
            const informDataText = safeText('frcstThreeDt');
            
            // 예보등급: informGrade 태그를 사용해야 함 (지역별 등급 포함)
            const informGradeText = safeText('frcstTwoCn');
            
            // 발생원인: informCause 태그를 사용해야 함
            const informCauseText = safeText('gwthcnd');


            // 1. 통보시간 설정 (f_1)
            // '2025-12-02 11시 발표' 같은 문자열이 informData에 들어있음
            setElementContentById('f_1', informDataText); 

            // 2. 예보등급 설정 (f_2)
            setElementContentById('f_2', informGradeText); 

            // 3. 발생원인 설정 (f_3)
            setElementContentById('f_3', informCauseText);

            // ⭐ console.log를 추가하여 실제로 읽은 데이터를 확인하세요!
            console.log("예보 통보시간:", informDataText);
            console.log("예보 등급:", informGradeText);
            console.log("예보 원인:", informCauseText);


        } else {
            // API 호출 성공, 데이터 없음
            setElementContentById('f_1', '❌ 예보 데이터 없음');
            setElementContentById('f_2', '❌ 예보 데이터 없음');
            setElementContentById('f_3', '❌ 예보 데이터 없음');
        }
    } else {
        // API 호출 실패
        setElementContentById('f_1', '❗ API 호출 실패'); 
        setElementContentById('f_2', '❗ API 호출 실패');
        setElementContentById('f_3', '❗ API 호출 실패');
    }
}
