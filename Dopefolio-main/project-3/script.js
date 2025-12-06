window.onload = find;
var map;
var gus = "";
var mapContainer;
var marker; 
var lat, lng; 

function handleRefresh() {
    getData();
    addBound(3000);
}

const apiKey = "4259796a4a72616c3837437a4c6274";
const baseUrl = "http://openapi.seoul.go.kr:8088/";
const url = `${baseUrl}${apiKey}/json/SeoulPublicLibraryInfo/`; 

async function getData() {
    // 16번 호출 i=1 j=1000, i=1001 j=2000, i=2001 j=3000, ... , i=15001 j=16000 까지
    for (var i=1; i<16000; i=i+1000 ) {
        var j = i + 999;
        await fetch(url + i + "/" + j)
        .then(response => response.json())
        .then(data => updateLibrary(data));
    }
}

function updateLibrary(libraries) {//16번 호출
    var libraries = libraries. SeoulPublicLibraryInfo.row;
    console.log(libraries);
}

function find(){ // find 버튼을 눌렀을 때(onClick)
	mapContainer = document.getElementById('map'), // 지도를 표시할 div 설정
	mapOption = {
		center: new daum.maps.LatLng(37.56544,126.977119,17), // 지도 중심좌표 시청으로 임의 지정.
		level: 13 // 지도의 확대 레벨
		};
	
	var gu = document.getElementById("gu"); //html의 gu를 가져온다.
	gus = gu.options[gu.selectedIndex].value; //gus는 gu의 값을 가지고 있다.(ex: 강북구, 강동구..)
	
	/*
	0 : 강남구 -37.4968488,127.0679394,	1 : 강동구 -37.5492994,127.1464275
	2 : 강북구 -37.6482131,127.0164069,	3 : 강서구 -37.552593,126.85051
	4 : 관악구 -37.4654529,126.9442478,	5 : 광진구 -37.5388,127.083445
	6 : 구로구 -37.495765,126.8578697,	7 : 금천구 -37.4599896,126.9012665
	8 : 노원구 -37.6541956,127.0769692,	9 : 도봉구 -37.6662325,127.0298724
	10 : 동대문구 -37.5835755,127.0505528,	11 : 동작구 -37.4971121,126.944378
	12 : 마포구 -37.5615964,126.9086431,	13 : 서대문구 -37.583312,126.9356601
	14 : 서초구 -37.483574,127.032661,	15 : 성동구 -37.5508768,127.0408952
	16 : 성북구 - 37.6023295,127.025236,	17 : 송파구 -37.504741,127.1144649
	18 : 양천구 -37.527432,126.8558783,	19 : 영등포구 -37.525423,126.896395
	20 : 용산구 -37.5305208,126.9809672,	21 : 은평구 -37.6175107,126.9249166
	22 : 종로구 -37.6009106,126.9835817,	23 : 중구 -37.5576747,126.9941653
	24 : 중랑구 -37.5950497,127.0957062	 */

	switch(gu.selectedIndex){//선택된 인덱스 번호
	case 0: // 강남구
		mapOption = {
			center: new daum.maps.LatLng(37.4968488,127.0679394),//강남구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 1: //강동구
		mapOption = {
			center: new daum.maps.LatLng(37.5492994,127.1464275),//강동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 2: //강북구 
		mapOption = {
			center: new daum.maps.LatLng(37.6482131,127.0164069),//강북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 3: //강서구 
		mapOption = {
			center: new daum.maps.LatLng(37.552593,126.85051),//강서구 좌표 지정
			level:7 // 지도의 확대 레벨
			};
		break;
	case 4: //관악구 
		mapOption = {
			center: new daum.maps.LatLng(37.4654529,126.9442478),//관악구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 5: //광진구 
		mapOption = {
			center: new daum.maps.LatLng(37.5388,127.083445),//광진구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 6: //구로구   
		mapOption = {
			center: new daum.maps.LatLng(37.495765,126.8578697),//구로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 7: //금천구  
		mapOption = {
			center: new daum.maps.LatLng(37.4599896,126.9012665),//금천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 8: //노원구  
		mapOption = {
			center: new daum.maps.LatLng(37.6541956,127.0769692),//노원구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 9: //도봉구  
		mapOption = {
			center: new daum.maps.LatLng(37.6662325,127.0298724),//도봉구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 10: //동대문구  
		mapOption = {
			center: new daum.maps.LatLng(37.5835755,127.0505528),//동대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 11: //동작구  
		mapOption = {
			center: new daum.maps.LatLng(37.4971121,126.944378),//동작구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 12: //마포구  
		mapOption = {
			center: new daum.maps.LatLng(37.5615964,126.9086431),//마포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 13: //서대문구  
		mapOption = {
			center: new daum.maps.LatLng(37.583312,126.9356601),//서대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 14: //서초구  
		mapOption = {
			center: new daum.maps.LatLng(37.483574,127.032661),//서초구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 15: //성동구  
		mapOption = {
			center: new daum.maps.LatLng(37.5508768,127.0408952),//성동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 16: //성북구  
		mapOption = {
			center: new daum.maps.LatLng(37.6023295,127.025236),//성북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 17: //송파구 
		mapOption = {
			center: new daum.maps.LatLng(37.504741,127.1144649),//송파구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 18: //양천구 
		mapOption = {
			center: new daum.maps.LatLng(37.527432,126.8558783),//양천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 19: //영등포구 
		mapOption = {
			center: new daum.maps.LatLng(37.525423,126.896395),//영등포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 20: //용산구 
		mapOption = {
			center: new daum.maps.LatLng(37.5305208,126.9809672),//용산구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 21: //은평구 
		mapOption = {
			center: new daum.maps.LatLng(37.6175107,126.9249166),//은평구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 22: //종로구 
		mapOption = {
			center: new daum.maps.LatLng(37.6009106,126.9835817),//종로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 23: //중구 
		mapOption = {
			center: new daum.maps.LatLng(37.5576747,126.9941653),//중구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 24: //중랑구 
		mapOption = {
			center: new daum.maps.LatLng(37.5950497,127.0957062),//중랑구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
		
	}//switch
	
	//지도를 표시할 div와 지도 옵션으로 지도 생성
	map = new daum.maps.Map(mapContainer, mapOption);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
	
	daum.maps.event.addListener(map, 'dragend', function() {
		handleRefresh(); //지도의 중심이 이동될때도 마커 다시 표시
	});
	
	handleRefresh(); //검색버튼을 클릭할 때 마커 표시
} //find

function addBound(radius){
    // 지도에 표시할 원 생성
    var bound = new daum.maps.Circle({
        center : map.getCenter(), // 원의 중심좌표
        radius: radius, // 미터 단위의 원의 반지름
        strokeWeight: 5, // 선의 두께
        strokeColor: '#F7D358', // 선의 색깔
        strokeOpacity: 0.5, // 선의 불투명도
        strokeStyle: 'solid', // 선의 스타일
        fillColor: '#F7FE2E', // 채우기 색깔
        fillopacity: 0.3, // 채우기 불투명도
        zIndex: 1
    });

    // 지도에 원 표시
    bound.setMap(map);

    // 지도가 이동될 때도 원이 다시 그려짐
    daum.maps.event.addListener(map, 'dragstart', function() {
        bound.setMap(null);
    });
}


function updateLibrary(libraries) {//16
    var libraries = libraries.SeoulPublicLibraryInfo.row;
    var addr = "";
    var center = map.getCenter(); // 중심 가져오기
    var position = {
        latitude : center.getLat(),
        longitude: center.getLng()
    };

    for (var i = 0; i < libraries.length; i++) {
        var lib = libraries[i];
        var imageSrc = "images/marker1.png",
            imageSize = new daum.maps.Size(27, 40), // 74°| 971
            imageOption = {offset: new daum.maps.Point(14, 28)}; // 포인터 객체 생성
        var loc = {//open API의 값들 위도와 경도
                latitude : lib.XCNTS,
                longitude: lib.YDNTS
        };
        var km = computeDistance (position, loc); // 거리 계산, position 지도의 중심좌표이고 loc는 각 도서관 좌표
        if(addr != lib.ADRES && km <= 3){ // 주소가 중복되지 않고, 거리가 3km이내의 것들을 가져온다.
            addr = lib.ADRES;
            addMarker(imageSrc, imageSize, imageOption, lib.XCNTS, lib. YDNTS, lib. LBRRY_NAME, lib.ADRES, lib.TEL_NO, lib.FDRM_CLOSE_DATE);
        }
        if(libraries.length > 0){
            lastReportTime = libraries[libraries.length-1].time;
        }
    }
} //updateLibrary


function addMarker(imageSrc, imageSize, imageOption, latitude, longitude, name, address, tel, closeday) {
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var markerPosition = new daum.maps.LatLng(latitude, longitude);
    var marker = new daum.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true,
        zIndex: 7
    });
    marker.setMap(map);
    daum.maps.event.addListener(map, 'dragstart', function() {
        marker.seMap(null);
    }); 
    var content = "<div style='width:100%; height: 100%; padding: 5px; font-size:0.8rem;'>"+
    "도서관: "+'<b>'+ name +'</b>'+'<br>'+"주소: " +address+'<br>'+"전화번호: "+tel+'<br>'+
    "휴관일: " +'<font color="red" >'+closeday+'</font>'+ "</div>";

    var iwContent = content,
        iwPosition = markerPosition,
        iwRemoveable = true;

    var infowindow = new daum.maps.InfoWindow({
        position : iwPosition,
        content : iwContent,
        removable : iwRemoveable,
        zIndex : 10
    });

    daum.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    });
} //addMarker

function computeDistance (startCoords, destCoords){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads =degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads ) +
                             Math.cos(startLatRads) * Math.cos(destLatRads ) *
                             Math.cos(startLongRads -destLongRads )) * Radius;
    return distance ;
} //computeDistance

function degreesToRadians(degrees){
    var radians = (degrees * Math.PI)/180;
    return radians;
} //degreesToRadians

/*
var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
var markerImageSize = new daum.maps.Size(30, 40); // 마커 이미지 크기
var markerImageOption = {offset: new daum.maps.Point(15, 40)};

// 기존 마커들을 담아둘 배열 (마커 삭제/갱신에 사용)
var markers = []; 

// handleRefresh 함수 (중복 제거 후 최종 정의)
function handleRefresh() {
    removeMarkers(); // 맵 이동 또는 검색 시 기존 마커 삭제
    getData();
    addBound(3000);
}

// 지도 위의 마커를 제거하는 함수
function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = []; // 배열 비우기
}

async function getData() {
    // API 호출 범위를 1000개씩 나눠서 호출합니다.
    for (var i = 1; i < 16000; i = i + 1000) {
        var j = i + 999;
        const fullUrl = `${url}${i}/${j}/`; // 최종 URL 구성

        await fetch(fullUrl)
        // 1. 응답을 순수한 텍스트로 읽어옵니다. (XML 처리)
        .then(response => response.text()) 
        // 2. 텍스트를 XML DOM 객체로 파싱하고 처리합니다.
        .then(xmlText => parseXmlAndHandleData(xmlText))
        .catch(error => console.error("데이터 가져오기/파싱 오류:", error));
    }
}



function parseXmlAndHandleData(xmlText) {
    // DOMParser를 사용하여 XML 텍스트를 DOM 객체로 변환합니다.
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // 서울시 API의 에러 메시지/결과 코드 확인 로직
    const resultCode = xmlDoc.getElementsByTagName("CODE")[0];
    
    if (resultCode && resultCode.textContent === "INFO-200") {
        console.log("검색 결과 없음:", xmlDoc.getElementsByTagName("MESSAGE")[0].textContent);
        return;
    }
    
    // 정상적인 데이터가 있을 경우, 'row' 태그들을 찾습니다.
    const libraries = xmlDoc.getElementsByTagName("row");
    
    updateLibrary(libraries); 
}

/*
function updateLibrary(libraryRows) {
    for (let i = 0; i < libraryRows.length; i++) {
        const row = libraryRows[i];
        
        const LBRRY_NAME = row.getElementsByTagName("LBRRY_NAME")[0]?.textContent;
        const XCNTS = row.getElementsByTagName("XCNTS")[0]?.textContent; // 경도 (Longitude)
        const YDNTS = row.getElementsByTagName("YDNTS")[0]?.textContent; // 위도 (Latitude)
        const ADRES = row.getElementsByTagName("ADRES")[0]?.textContent;
        const TEL_NO = row.getElementsByTagName("TEL_NO")[0]?.textContent;
        const FDRM_CLOSE_DATE = row.getElementsByTagName("FDRM_CLOSE_DATE")[0]?.textContent;

        if (LBRRY_NAME && XCNTS && YDNTS) {
            addMarker(
                markerImageSrc,
                markerImageSize,
                markerImageOption,
                // Kakao Map LatLng 생성자는 (위도, 경도) 순서이므로 YDNTS, XCNTS 순으로 넣습니다.
                parseFloat(YDNTS), 
                parseFloat(XCNTS),
                LBRRY_NAME, 
                ADRES,
                TEL_NO, 
                FDRM_CLOSE_DATE
            );
        }
    }
}
*/

/*
function updateLibrary(libraries) {//16
    var libraries = libraries.SeoulPublicLibraryInfo.row;
    var addr = "";
    var center = map.getCenter(); // 중심 가져오기
    var position = {
        latitude : center.getLat(),
        longitude: center.getLng()
    };

    for (var i = 0; i < libraries.length; i++) {
        var lib = libraries[i];
        var imageSrc = "images/marker1.png",
            imageSize = new daum.maps.Size(27, 40), // 74°| 971
            imageOption = {offset: new daum.maps.Point(14, 28)}; // 포인터 객체 생성
        var loc = {//open API의 값들 위도와 경도
                latitude : lib.XCNTS,
                longitude: lib.YDNTS
        };
        var km = computeDistance (position, loc); // 거리 계산, position 지도의 중심좌표이고 loc는 각 도서관 좌표
        if(addr != lib.ADRES && km <= 3){ // 주소가 중복되지 않고, 거리가 3km이내의 것들을 가져온다.
            addr = lib.ADRES;
            addMarker(imageSrc, imageSize, imageOption, lib.XCNTS, lib. YDNTS, lib. LBRRY_NAME, lib.ADRES, lib.TEL_NO, lib.FDRM_CLOSE_DATE);
        }
        if(libraries.length > 0){
            lastReportTime = libraries[libraries.length-1].time;
        }
    }
} //updateLibrary

function find(){ // find 버튼을 눌렀을 때(onClick)
    // 1. 카카오 지도 로딩 여부 확인
    if (typeof daum === 'undefined' || typeof daum.maps === 'undefined' || typeof daum.maps.Map === 'undefined') {
        // API가 로드되지 않았다면, 브라우저 캐시를 무시하고 API 로딩을 재시도합니다.
        // 다만 사용자 경험을 위해 alert만 남깁니다.
        alert("지도 라이브러리가 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.");
        return; 
    }

    // 2. 지도 컨테이너 설정 및 구역 선택
    mapContainer = document.getElementById('map'); 
    var gu = document.getElementById("gu");
    gus = gu.options[gu.selectedIndex].value; 
    
    // 3. 맵 옵션 설정
    mapOption = {
        center: new daum.maps.LatLng(37.566826, 126.9786567), // 서울 시청 기본 좌표
        level: 13 
    };
    
    switch(gu.selectedIndex){
    case 0: // 강남구
        mapOption = { center: new daum.maps.LatLng(37.4968488,127.0679394), level: 7 }; break;
    case 1: //강동구
        mapOption = { center: new daum.maps.LatLng(37.5492994,127.1464275), level: 7 }; break;
    case 2: //강북구 
        mapOption = { center: new daum.maps.LatLng(37.6482131,127.0164069), level: 7 }; break;
    case 3: //강서구 
        mapOption = { center: new daum.maps.LatLng(37.552593,126.85051), level:7 }; break;
    case 4: //관악구 
        mapOption = { center: new daum.maps.LatLng(37.4654529,126.9442478), level: 7 }; break;
    case 5: //광진구 
        mapOption = { center: new daum.maps.LatLng(37.5388,127.083445), level: 7 }; break;
    case 6: //구로구   
        mapOption = { center: new daum.maps.LatLng(37.495765,126.8578697), level: 7 }; break;
    case 7: //금천구  
        mapOption = { center: new daum.maps.LatLng(37.4599896,126.9012665), level: 7 }; break;
    case 8: //노원구  
        mapOption = { center: new daum.maps.LatLng(37.6541956,127.0769692), level: 7 }; break;
    case 9: //도봉구  
        mapOption = { center: new daum.maps.LatLng(37.6662325,127.0298724), level: 7 }; break;
    case 10: //동대문구  
        mapOption = { center: new daum.maps.LatLng(37.5835755,127.0505528), level: 7 }; break;
    case 11: //동작구  
        mapOption = { center: new daum.maps.LatLng(37.4971121,126.944378), level: 7 }; break;
    case 12: //마포구  
        mapOption = { center: new daum.maps.LatLng(37.5615964,126.9086431), level: 7 }; break;
    case 13: //서대문구  
        mapOption = { center: new daum.maps.LatLng(37.583312,126.9356601), level: 7 }; break;
    case 14: //서초구  
        mapOption = { center: new daum.maps.LatLng(37.483574,127.032661), level: 7 }; break;
    case 15: //성동구  
        mapOption = { center: new daum.maps.LatLng(37.5508768,127.0408952), level: 7 }; break;
    case 16: //성북구  
        mapOption = { center: new daum.maps.LatLng(37.6023295,127.025236), level: 7 }; break;
    case 17: //송파구 
        mapOption = { center: new daum.maps.LatLng(37.504741,127.1144649), level: 7 }; break;
    case 18: //양천구 
        mapOption = { center: new daum.maps.LatLng(37.527432,126.8558783), level: 7 }; break;
    case 19: //영등포구 
        mapOption = { center: new daum.maps.LatLng(37.525423,126.896395), level: 7 }; break;
    case 20: //용산구 
        mapOption = { center: new daum.maps.LatLng(37.5305208,126.9809672), level: 7 }; break;
    case 21: //은평구 
        mapOption = { center: new daum.maps.LatLng(37.6175107,126.9249166), level: 7 }; break;
    case 22: //종로구 
        mapOption = { center: new daum.maps.LatLng(37.6009106,126.9835817), level: 7 }; break;
    case 23: //중구 
        mapOption = { center: new daum.maps.LatLng(37.5576747,126.9941653), level: 7 }; break;
    case 24: //중랑구 
        mapOption = { center: new daum.maps.LatLng(37.5950497,127.0957062), level: 7 }; break;
    }
    
    // 4. 지도 생성 (⭐가장 먼저 이루어져야 map 변수에 객체가 할당됨)
    map = new daum.maps.Map(mapContainer, mapOption);

    // 4-2. 지도 컨트롤 추가
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

    // 4-3. 이벤트 리스너 추가
    daum.maps.event.addListener(map, 'dragend', function() {
        handleRefresh();
    });
    
    // 5. 데이터 로딩 시작
    handleRefresh();
} //find

function addBound(radius) {
    // map이 생성되지 않은 경우를 대비한 방어 코드
    if (!map) return; 
    
    var bound = new daum.maps.Circle({
        center : map.getCenter(),
        radius: radius,
        strokeWeight: 5,
        strokeColor: '#F7D3e8',
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        fillColor: '#F7FE2E',
        fillOpacity: 0.3,
        zIndex: 1
    });

    bound.setMap(map);

    daum.maps.event.addListener(map, 'dragstart', function() { 
        bound.setMap(null);
    });
}


function addMarker(imageSrc, imageSize, imageOption, latitude, longitude, name, address, tel, closeday) {
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var markerPosition = new daum.maps.LatLng(latitude, longitude);
    var marker = new daum.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true,
        zIndex: 7
    });
    marker.setMap(map);
    daum.maps.event.addListener(map, 'dragstart', function() {
        marker.seMap(null);
    }); 
    var content = "<div style='width:100%; height: 100%; padding: 5px; font-size:0.8rem;'>"+
    "도서관: "+'<b>'+ name +'</b>'+'<br>'+"주소: " +address+'<br>'+"전화번호: "+tel+'<br>'+
    "휴관일: " +'<font color="red" >'+closeday+'</font>'+ "</div>";

    var iwContent = content,
        iwPosition = markerPosition,
        iwRemoveable = true;

    var infowindow = new daum.maps.infowindow({
        position : iwPosition,
        content : iwContent,
        removable : iwRemoveable,
        zIndex : 10
    });

    daum.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    });
} //addMarker

function computeDistance (startCoords, destCoords){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads =degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads ) +
                             Math.cos(startLatRads) * Math.cos(destLatRads ) *
                             Math.cos(startLongRads -destLongRads )) * Radius;
    return distance ;
} //computeDistance

function degreesToRadians(degrees){
    var radians = (degrees * Math.PI)/180;
    return radians;
} //degreesToRadians

*/