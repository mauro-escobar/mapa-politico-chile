mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cm8tZXNjb2JhciIsImEiOiJja3A1aGxiajIwZ3lrMnRxdHN1M2NhcXpiIn0.mXzXiupFZlOThQTwmpK20Q';

var colores = {
	'azul': '#3b83bd', 
	'azul-marino': '#00008B', 
	'violeta': '#985698', 
	'marron': '#A0522D', 
	'verde-agua': '#00B771',
	'verde': '#008000', 
	'verde2': '#a9dfbf',
	'rojo': '#ff0000', 
	'rojo-oscuro': '#CC0000', 
	'amarillo': '#f9d71c', 
	'naranja': '#ffa500',
	'gris': '#797979', 
	'gris-claro': '#d3d3d3', 
	'blanco': '#ffffff', 
	'suave': '#f8ca92', 
	'negro': '#000000',
	'rosado': '#e6007e',
	'celeste': '#00aae4'
};

function capitalize(words) {
   var separateWord = words.toLowerCase().split(' ');
   for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
   }
   return separateWord.join(' ');
};

bearing = 90;
center = [-71.5,-27];
if (screen.width<=992) {
    bearing = 0;
    center = [-70.66,-33.45];
}

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mauro-escobar/ckp5cjbcc1xgf18pvbfshxrze',
    zoom: 6,
    minZoom: 6,
    center: center,
    bearing: bearing,
});

map.addControl(new mapboxgl.NavigationControl());

function addSourceComunas(map) {
	map.addSource('comunas-data',
    	{
            'type': 'vector',
            'url': 'mapbox://mauro-escobar.5q5tkfoj',
        }
    );
};

function addSourceDistritos(map) {
    map.addSource('distritos-data',
    	{
            'type': 'vector',
            'url': 'mapbox://mauro-escobar.cpb357rr',
        }
    );
};

function addSourceRegiones(map) {
    map.addSource('regiones-data',
    	{
            'type': 'vector',
            'url': 'mapbox://mauro-escobar.czjrahtc',
        }
    );
};

function addLayerNombreComunas(map,firstSymbolId) {
	map.addLayer({
    	'id': 'nombre-comunas',
    	'type': 'symbol',
    	'source': 'comunas-data',
        'source-layer': 'chile-comunas-53oe57',
    	'layout': {
    		'text-field': ['get', 'NOM_COM'],
    		'text-font': ['Open Sans Bold','Arial Unicode MS Bold'],
    		'text-size': 11,
    		'text-letter-spacing': 0.05,
    		//'text-offset': [0, 1.5]

    	},
    	'paint': {
    		'text-color': '#202',
    		'text-halo-color': '#fff',
    		'text-halo-width': 1,
    		'text-halo-blur': 1,
    		'text-opacity': 0.7,
    	},
        'minzoom': 7,
    }, firstSymbolId);
};

function addLayerNombreRegiones(map) {
    map.addLayer({
    	'id': 'nombre-regiones',
    	'type': 'symbol',
    	'source': 'regiones-data',
        'source-layer': 'chiles-regiones-bfu10d',
    	'layout': {
    		'text-field': ['get', 'REGION'],
    		'text-font': ['Open Sans Bold','Arial Unicode MS Bold'],
    		'text-size': 11,
    		'text-letter-spacing': 0.05,
    		'symbol-avoid-edges': true,

    	},
    	'paint': {
    		'text-color': '#202',
    		'text-halo-color': '#fff',
    		'text-halo-width': 1,
    		'text-halo-blur': 1,
    		'text-opacity': 0.7,
    	},
    }, 'nombre-comunas')
    map.setLayoutProperty('nombre-regiones', 'visibility', 'none');	
};

function addLayerRegionesOutline(map) {
	map.addLayer({
        'id': 'regiones-outline',
        'type': 'line',
        'source': 'regiones-data',
        'source-layer': 'chiles-regiones-bfu10d',
        'filter': ['!', ['==', ['get', 'REGION'], 'Zona sin demarcar']],
        'paint': {
            'line-color': colores['blanco'],
            'line-opacity': 1,
            'line-width': 0.8,
            //'fill-opacity': 0.5
        },
    }, 'zona-indeterminada');
    map.setLayoutProperty('regiones-outline', 'visibility', 'none');
};

function addLayerZonaIndeterminada(map) {
	map.addLayer({
    	'id': 'zona-indeterminada',
    	'type': 'fill',
    	'source': 'comunas-data',
        'source-layer': 'chile-comunas-53oe57',
        'filter': ['==', ['get', 'NOM_COM'], 'Zona sin demarcar'],
        'paint': {
        	'fill-color': colores['blanco'],
        	'fill-outline-color': '#ffffff',
        	'fill-opacity': 0.5,
        },
    }, 'nombre-regiones');
};

function addLayerComunasOutline(map) {
    map.addLayer({
        'id': 'comunas-outline',
        'type': 'line',
        'source': 'comunas-data',
        'source-layer': 'chile-comunas-53oe57',
        'filter': ['!=', ['get', 'NOM_COM'], 'Zona sin demarcar'],
        'paint': {
            'line-color': colores['blanco'],
            'line-opacity': 1,
            'line-width': 0.3,
        },
    }, 'zona-indeterminada');
    map.setLayoutProperty('comunas-outline', 'visibility', 'none');	
};

function addLayerComunasOutlineZoom(map) {
	map.addLayer({
        'id': 'comunas-outline-zoom',
        'type': 'line',
        'source': 'comunas-data',
        'source-layer': 'chile-comunas-53oe57',
        'filter': ['!=', ['get', 'NOM_COM'], 'Zona sin demarcar'],
        'paint': {
            'line-color': colores['blanco'],
            'line-opacity': 1,
            'line-width': 0.2,
        },
        'minzoom': 6.2
    }, 'zona-indeterminada');
    map.setLayoutProperty('comunas-outline-zoom', 'visibility', 'none');
};

function addLayerDistritosOutline(map) {
    map.addLayer({
        'id': 'distritos-outline',
        'type': 'line',
        'source': 'distritos-data',
        'source-layer': 'chile-distritos-9h2qej',
        'filter': ['has', 'DISTRITO'],
        'paint': {
            'line-color': '#ffffff',
            'line-width': 0.5
        }
    }, 'zona-indeterminada');
};

function addLayerDistritosFill(map) {
    map.addLayer({
        'id': 'distritos',
        'type': 'fill',
        'source': 'distritos-data',
        'source-layer': 'chile-distritos-9h2qej',
        'filter': ['has', 'DISTRITO'],
        'paint': {
            'fill-color': [
                'match', ['get', 'DISTRITO'],
                '1', '#4e79a7',
                '2', '#e15759',
                '3', '#59a14f',
                '4', '#f28e2b',
                '5', '#76b7b2',
                '6', '#edc948',
                '7', '#b07aa1',
                '8', '#4e79a7',
                '9', '#e15759',
                '10', '#59a14f',
                '11', '#f28e2b',
                '12', '#b07aa1',
                '13', '#edc948',
                '14', '#76b7b2',
                '15', '#4e79a7',
                '16', '#e15759',
                '17', '#59a14f',
                '18', '#f28e2b',
                '19', '#76b7b2',
                '20', '#edc948',
                '21', '#b07aa1',
                '22', '#4e79a7',
                '23', '#e15759',
                '24', '#59a14f',
                '25', '#f28e2b',
                '26', '#76b7b2',
                '27', '#edc948',
                '28', '#b07aa1',
                '#ffffff'
            ],
        },
    }, 'distritos-outline');
};

function mostrarDistritos() {
	clean()
	map.setLayoutProperty('distritos', 'visibility', 'visible');
	map.setLayoutProperty('distritos-outline', 'visibility', 'visible');
	document.getElementById('a-distritos').style.color = 'black';
	legend.style.display = 'none';
	legend2.style.display = 'none';
};

function popDistritos(map) {
	map.on('mousemove', 'distritos', function (e) {
	   map.getCanvas().style.cursor = 'pointer';
		var distrito = e.features[0].properties.DISTRITO;
		var region = e.features[0].properties.REGION;
		popup.setLngLat(e.lngLat)
			.setHTML(
				'<h4><span style="font-weight:bold">Distrito: '+distrito+'</span></h4>'+
				'<p>Región: '+region+'</p>'
				)
			.addTo(map);
	});
	map.on('mouseleave', 'distritos', function () {
	    map.getCanvas().style.cursor = '';
	    popup.remove();
	});
};

var selectedGroup = false;
var groupSelected = "";

function touchParliamentSeat(evt) {
    var svgobj=evt.target; 
    if (!selectedGroup) {
        var indep = ['Fuera-de-Pacto','Candidaturas-Independientes'];
        if (svgobj.dataset.hasOwnProperty("party") && !indep.includes(svgobj.dataset.party)) {
            var party = svgobj.dataset.party;   
            var els = document.getElementsByClassName(party);
            var count = els.length;
            for (var i = 0; i < els.length; i++) {
                if (els[i].dataset.hasOwnProperty("dotted")) count--;
            }
            if (count==1) var escanos = count + " escaño";
            else var escanos = count + " escaños";
            var span = document.getElementById('lista-seat');
            if (span) span.innerHTML = '<span style="font-weight:bold">'+party.replace(/-/g," ")+":</span> "+escanos+'<br>';

            var els = document.getElementsByClassName("parliament-seat");
            for (var i = 0; i < els.length; i++) {
                if (!els[i].classList.contains(party)) els[i].style.opacity=0.2;
            }
        } else {
            var els = document.getElementsByClassName("parliament-seat");
            for (var i =0; i < els.length; i++) els[i].style.opacity = 0.2;
            svgobj.style.opacity = 1;   
        }
    }   
    var span = document.getElementById('nombre-seat');
    if (span) span.innerHTML = '<span>'+svgobj.dataset.name+'</span>';
}
function unTouchParliamentSeat(evt) {
    if (!selectedGroup) {
        var els = document.getElementsByClassName("parliament-seat");
        for (var i =0; i < els.length; i++) els[i].style.opacity = 1;
        var span = document.getElementById('lista-seat');
        if (span) span.innerHTML = '<br>';
    }
    var span = document.getElementById('nombre-seat');
    if (span) {
        if (!selectedGroup) span.innerHTML = 'Muévete sobre los puntos...';
        else span.innerHTML = '<br>';
    }
}

function clickGroup(evt) {
    var obj = evt.target;
    var cl = obj.innerHTML.replace(/ /g,"-");
    if (!selectedGroup || groupSelected!=cl) {
        selectedGroup = true;
        groupSelected = cl;
        var span = document.getElementById('nombre-seat');
        if (span) span.innerHTML = '<br>';
    } else {
        selectedGroup = false;
        groupSelected = "";
        var span = document.getElementById('nombre-seat');
        if (span) span.innerHTML = 'Muévete sobre los puntos...';
    }
    if (selectedGroup) {
        var els = document.getElementsByClassName("grupo");
        for (var i = 0; i < els.length; i++) els[i].style.opacity = 0.2;
        obj.style.opacity = 1;
        var els = document.getElementsByClassName("parliament-seat");
        var count = 0;
        for (var i = 0; i < els.length; i++) {
            if (els[i].classList.contains(cl)) els[i].style.opacity=1;
            if (!els[i].classList.contains(cl)) els[i].style.opacity=0.2;
            else if (!els[i].dataset.hasOwnProperty("dotted")) count++;
        }
        var span = document.getElementById('lista-seat');
        if (span) span.innerHTML = '<span style="font-weight:bold">'+cl.replace(/-/g," ")+":</span> "+count+' escaños<br>';
    } else {
        var els = document.getElementsByClassName("grupo");
        for (var i = 0; i < els.length; i++) els[i].style.opacity = 1;
        var els = document.getElementsByClassName("parliament-seat");
        for (var i = 0; i < els.length; i++) els[i].style.opacity=1;
        var span = document.getElementById('lista-seat');
        if (span) span.innerHTML = '<br>';
    }
}