<template>
  <div class="container-fluid">
    <div class="google-map" id="localTruckMap"></div>
    <button @click="getGeoLocation">Use my location</button>
    <div>{{foodTrucks[0]}}</div>
    <!-- {{foodTrucks}} -->
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
  function createMarkers(arr){

    return
  }
  export default {
    name: 'Search',
    props: ['name'],
    data() {
      return {
        mapName: 'localtruck-map',
        map: {},
        boise: {
          lat: 43.6150,
          lng: -116.2023
        },
        markerCoordinates: [
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
          }
        ],
        foodtrucks:[]
      }
    },
    mounted() {
      this.$store.dispatch("getAllTrucks")
    },
    computed: {
      userGeoLocation() {
        return this.$store.state.userGeoLocation
      },
      foodTrucks() {
        return this.foodtrucks = this.$store.state.foodtrucks
      }
    },
    watch:{
      foodtrucks: function(foodtrucks){
        if(foodtrucks){
          console.log(foodtrucks)
        }
        const element = document.getElementById('localTruckMap')
        const options = {
          zoom: 12,
          center: new google.maps.LatLng(this.boise.lat, this.boise.lng)
        }
        const map = new google.maps.Map(element, options);
        foodtrucks.forEach(truck => {
          var marker = new google.maps.Marker({
            position: {lat: truck.location[0].location.lat, lng: truck.location[0].location.lng},
            map: map,
            title: 'Work damn you'
          })
          marker.setMap(map);
        })
      }
    },
    methods: {
      // getAllTrucks() {
      //   this.$store.dispatch('getAllTrucks')
      // },
      getGeoLocation() {
        this.$store.dispatch('getGeoLocation')
      }
    }
  
}
</script>


<style>
  .google-map {
    width:100%;
    height: 600px;
    margin: 0 auto;
    /* background: gray; */
  }
</style>