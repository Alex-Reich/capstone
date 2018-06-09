<template>
    <div class="google-map" id="localTruckMap">
  
    </div>
    <!-- add this map to other components with <google-map name="Map"></google-map> -->
  </template>
  
  <script>
    export default {
      name: 'Search',
      props: ['name'],
      data() {
        return {
          mapName: this.name + '-map',
          map: {},
          boise:{
            lat: 43.6150,
            lng:-116.2023
          },
          markerCoordinates:[
            {// taco bell garden city
              latitude: 43.6491071,
              longitude: -116.2810966
            },
            {// pie hole pizza boise
              latitude: 43.616671,
              longitude: -116.2027034
            },
            {// big judds meridian 
              latitude: 43.5907617,
              longitude: -116.3565662
            },
          ]
        }
      },
      mounted() {
        const element=document.getElementById('localTruckMap')
        // console.log('Map name is: ',this.mapName)
        const options={
          zoom: 13,
          center: new google.maps.LatLng(this.boise.lat,this.boise.lng)
        }
        // console.log('the Map options: ',options)
        const map = new google.maps.Map(element,options);
        // console.log('the Map object created by Google: ',map)
        this.markerCoordinates.forEach((coord)=>{
          const position = new google.maps.LatLng(coord.latitude,coord.longitude);
          const marker = new google.maps.Marker({position,map})
        })
      },
      computed: {
        userGeoLocation() {
          return this.$store.state.userGeoLocation
        }
      },
      methods: {
        // initMap(){
        //    const element = document.getElementById('this.mapName')
        //    const options = {
        //      zoom: 12,
        //      center: new google.maps.LatLng(43.6150,-116.2023)
        //    }
        //   this.map = new google.maps.Map(element,options)
        //    let marker = new google.maps.Marker({
        //      position: boise,
        //      map: map
        //    })
        //    console.log(this.map)
        //    this.$store.commit('setMap', [])
        //  }
      }
    }
  </script>
  
  
  <style>
    .google-map {
      width: 800px;
      height: 600px;
      margin: 0 auto;
      /* background: gray; */
    }
  </style>