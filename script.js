function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 13.7563, lng: 100.5018 }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var currentLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var currentLocationMarker = new google.maps.Marker({
                position: currentLatLng,
                map: map,
                title: "ตำแหน่งปัจจุบันของคุณ"
            });

            map.setCenter(currentLatLng);

            // เรียกใช้ API ของ aqicn เพื่อค้นหาค่าฝุ่น
            var aqiApiUrl = 'https://api.waqi.info/feed/geo:' + currentLatLng.lat + ';' + currentLatLng.lng + '/?token=e145a6ec3489ea1b580a4ef2aeaa399476cbd809';
            
            fetch(aqiApiUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    var aqiValue = data.data.aqi; // ค่าฝุ่นที่ได้จาก API
                    var infoWindow = new google.maps.InfoWindow({
                        content: 'ค่าฝุ่น: ' + aqiValue
                    });

                    // แสดงข้อมูลค่าฝุ่นใน info window
                    infoWindow.open(map, currentLocationMarker);
                })
                .catch(function(error) {
                    console.error('Error fetching AQI data:', error);
                });
        }, function() {
            alert("ไม่สามารถเข้าถึงตำแหน่งปัจจุบันได้");
        });
    } else {
        alert("บราวเซอร์ของคุณไม่รองรับ Geolocation");
    }
}
