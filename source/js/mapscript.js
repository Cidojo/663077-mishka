var mishka_map;
var mishka_placemark;

ymaps.ready(init);

function init() {
  mishka_map = new ymaps.Map("map", { center: [59.93863106, 30.32305450], zoom: 17
  });

  mishka_placemark = new ymaps.Placemark([59.93863106, 30.32305450], {},
  {
    iconLayout: "default#image",
    iconImageHref: "./img/icon-map-pin.svg",
    iconImageSize: [67, 100],
    iconImageOffset: [-37, -100]
  });

  mishka_map.geoObjects.add(mishka_placemark);
}
