<template>
  <div class="container-fluid">
    <div class="google-map" id="localTruckMap"></div>
    <button v-if="!user" @click="getGeoLocation">Use my location</button>
    <div>{{foodTrucks[0]}}</div>
    <!-- {{foodTrucks}} -->
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
  export default {
    name: 'Search',
    props: ['name'],
    data() {
      return {
        mapName: 'localtruck-map',
        map: {},
        center: {
          lat: 43.6150,
          lng: -116.2023
        },
        foodtrucks:[],
        user: false      }
    },
    mounted() {
      this.$store.dispatch("getAllTrucks")
    },
    computed: {
      userGeoLocation() {
        this.user=true
        console.log(this.$store.state.userGeoLocation)
        return this.$store.state.userGeoLocation
      },
      foodTrucks() {
        return this.foodtrucks = this.$store.state.foodtrucks
      }
    },
    watch:{
      foodtrucks: function(foodtrucks){
        const element = document.getElementById('localTruckMap')
        const options = {
          zoom: 12,
          center: new google.maps.LatLng(this.center.lat, this.center.lng)
        }
        const map = new google.maps.Map(element, options);
        foodtrucks.forEach(truck => {
          var marker = new google.maps.Marker({
            position: {lat: truck.location[0].location.lat, lng: truck.location[0].location.lng},
            map: map,
            title: truck.businessName
          })
          marker.setMap(map);
        })
      }
    },
    methods: {
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
    touch-action: auto;
  }
</style>